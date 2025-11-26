// ============================================
// CHATBOT CER CON OPENAI + CRM
// ============================================

class CERChatbot {
    constructor() {
        this.container = document.getElementById('chatbotContainer');
        this.messages = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendButton = document.getElementById('chatbotSend');
        this.toggleButton = document.getElementById('chatbotToggle');
        this.closeButton = document.getElementById('chatbotClose');
        this.quickReplies = document.getElementById('quickReplies');
        
        this.conversationHistory = [];
        this.leadId = null;
        this.leadData = {
            nombre: null,
            telefono: null,
            email: null,
            consulta: null
        };
        
        this.apiUrl = 'http://localhost:3000/api';
        this.isWaitingForResponse = false;
        
        this.init();
    }

    init() {
        // Event listeners
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
        this.toggleButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.toggleChat());
        
        // Quick replies
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', (e) => {
                const message = e.currentTarget.dataset.message;
                this.handleUserMessage(message);
            });
        });

        // Cargar conversación previa si existe
        this.loadPreviousConversation();
    }

    toggleChat() {
        this.container.classList.toggle('active');
        if (this.container.classList.contains('active')) {
            this.input.focus();
        }
    }

    async handleSend() {
        const message = this.input.value.trim();
        if (!message || this.isWaitingForResponse) return;
        
        this.input.value = '';
        await this.handleUserMessage(message);
    }

    async handleUserMessage(message) {
        if (this.isWaitingForResponse) return;
        
        // Mostrar mensaje del usuario
        this.addMessage(message, 'user');
        
        // Ocultar quick replies después del primer mensaje
        if (this.quickReplies) {
            this.quickReplies.style.display = 'none';
        }
        
        // Agregar al historial
        this.conversationHistory.push({
            role: 'user',
            content: message
        });
        
        // Guardar conversación en BD si hay leadId
        if (this.leadId) {
            await this.saveConversation(message, 'user');
        }
        
        // Mostrar indicador de escritura
        this.showTypingIndicator();
        this.isWaitingForResponse = true;
        
        try {
            // Llamar a la API de ChatGPT
            const response = await fetch(`${this.apiUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: this.conversationHistory
                })
            });
            
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            
            const data = await response.json();
            const botMessage = data.message;
            
            // Remover indicador de escritura
            this.removeTypingIndicator();
            
            // Mostrar respuesta del bot
            this.addMessage(botMessage, 'bot');
            
            // Agregar al historial
            this.conversationHistory.push({
                role: 'assistant',
                content: botMessage
            });
            
            // Guardar conversación en BD si hay leadId
            if (this.leadId) {
                await this.saveConversation(botMessage, 'assistant');
            }
            
            // Detectar si el bot está solicitando información del cliente
            await this.detectAndCaptureLeadData(message, botMessage);
            
            // Guardar conversación en localStorage
            this.saveToLocalStorage();
            
        } catch (error) {
            console.error('Error al comunicarse con el chatbot:', error);
            this.removeTypingIndicator();
            this.addMessage('Lo siento, hubo un error al procesar tu mensaje. ¿Podrías intentarlo de nuevo? 🙏', 'bot');
        } finally {
            this.isWaitingForResponse = false;
        }
    }

    async detectAndCaptureLeadData(userMessage, botMessage) {
        // Detectar si el usuario proporcionó información de contacto
        const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const phoneRegex = /(\+?\d{1,3}[\s-]?)?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{3,4}/;
        
        // Capturar email
        if (emailRegex.test(userMessage) && !this.leadData.email) {
            this.leadData.email = userMessage.match(emailRegex)[0];
        }
        
        // Capturar teléfono
        if (phoneRegex.test(userMessage) && !this.leadData.telefono) {
            const phone = userMessage.match(phoneRegex)[0];
            this.leadData.telefono = phone.replace(/\s/g, '');
        }
        
        // Capturar nombre (si el bot preguntó por el nombre)
        if (botMessage.toLowerCase().includes('nombre') && !this.leadData.nombre && userMessage.split(' ').length <= 4) {
            this.leadData.nombre = userMessage;
        }
        
        // Si tenemos suficiente información, guardar el lead
        if (this.leadData.nombre && !this.leadId) {
            await this.saveLead();
        }
    }

    async saveLead() {
        try {
            // Determinar tipo de consulta basado en la conversación
            const conversationText = this.conversationHistory
                .map(m => m.content)
                .join(' ')
                .toLowerCase();
            
            let tipoConsulta = 'informacion';
            if (conversationText.includes('presupuesto') || conversationText.includes('precio') || conversationText.includes('costo')) {
                tipoConsulta = 'presupuesto';
            } else if (conversationText.includes('instalacion') || conversationText.includes('instalar')) {
                tipoConsulta = 'instalacion';
            } else if (conversationText.includes('reparacion') || conversationText.includes('reparar') || conversationText.includes('mantenimiento')) {
                tipoConsulta = 'reparacion';
            }
            
            const response = await fetch(`${this.apiUrl}/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: this.leadData.nombre,
                    telefono: this.leadData.telefono,
                    email: this.leadData.email,
                    consulta: this.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n'),
                    tipo_consulta: tipoConsulta
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                this.leadId = data.leadId;
                console.log('✅ Lead guardado con ID:', this.leadId);
                
                // Guardar el leadId en localStorage
                this.saveToLocalStorage();
            }
        } catch (error) {
            console.error('Error al guardar lead:', error);
        }
    }

    async saveConversation(mensaje, rol) {
        if (!this.leadId) return;
        
        try {
            await fetch(`${this.apiUrl}/conversaciones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lead_id: this.leadId,
                    mensaje: mensaje,
                    rol: rol
                })
            });
        } catch (error) {
            console.error('Error al guardar conversación:', error);
        }
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        // Convertir saltos de línea a <br>
        const formattedText = text.replace(/\n/g, '<br>');
        contentDiv.innerHTML = formattedText;
        
        messageDiv.appendChild(contentDiv);
        this.messages.appendChild(messageDiv);
        
        this.scrollToBottom();
        
        // Animación de entrada
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
    }

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    saveToLocalStorage() {
        const data = {
            conversationHistory: this.conversationHistory,
            leadId: this.leadId,
            leadData: this.leadData,
            timestamp: Date.now()
        };
        localStorage.setItem('cer_chatbot', JSON.stringify(data));
    }

    loadPreviousConversation() {
        const saved = localStorage.getItem('cer_chatbot');
        if (!saved) return;
        
        const data = JSON.parse(saved);
        
        // Cargar solo si fue en las últimas 24 horas
        const dayInMs = 24 * 60 * 60 * 1000;
        if (Date.now() - data.timestamp > dayInMs) {
            localStorage.removeItem('cer_chatbot');
            return;
        }
        
        this.conversationHistory = data.conversationHistory || [];
        this.leadId = data.leadId;
        this.leadData = data.leadData || {
            nombre: null,
            telefono: null,
            email: null,
            consulta: null
        };
        
        // Mostrar mensajes previos
        this.conversationHistory.forEach(msg => {
            const sender = msg.role === 'user' ? 'user' : 'bot';
            this.addMessage(msg.content, sender);
        });
        
        // Ocultar quick replies si ya hay conversación
        if (this.conversationHistory.length > 0 && this.quickReplies) {
            this.quickReplies.style.display = 'none';
        }
    }

    clearConversation() {
        this.conversationHistory = [];
        this.leadId = null;
        this.leadData = {
            nombre: null,
            telefono: null,
            email: null,
            consulta: null
        };
        localStorage.removeItem('cer_chatbot');
        
        // Limpiar mensajes visuales (excepto el mensaje de bienvenida)
        const messages = this.messages.querySelectorAll('.message');
        messages.forEach((msg, index) => {
            if (index > 0) { // Mantener el primer mensaje de bienvenida
                msg.remove();
            }
        });
        
        // Mostrar quick replies nuevamente
        if (this.quickReplies) {
            this.quickReplies.style.display = 'flex';
        }
    }
}

// Inicializar chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.cerChatbot = new CERChatbot();
});
