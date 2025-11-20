// ===================================
// Chatbot para CER - Compañía de Energías Renovables
// ===================================

class CERChatbot {
    constructor() {
        this.container = document.getElementById('chatbotContainer');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendButton = document.getElementById('chatbotSend');
        this.toggleButton = document.getElementById('chatbotToggle');
        this.closeButton = document.getElementById('chatbotClose');
        this.quickRepliesContainer = document.getElementById('quickReplies');
        
        this.context = {
            sessionId: this.generateSessionId(),
            timestamp: new Date().toISOString(),
            name: null,
            email: null,
            phone: null,
            consultation: null,
            satisfaction: null,
            comments: null,
            conversationHistory: []
        };

        this.conversationState = 'greeting';
        this.awaitingFeedback = false;
        
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    init() {
        // Event Listeners
        this.toggleButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.closeChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick replies
        const quickReplyButtons = document.querySelectorAll('.quick-reply');
        quickReplyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const message = button.getAttribute('data-message');
                this.handleUserMessage(message);
            });
        });
    }

    toggleChat() {
        this.container.classList.toggle('active');
        if (this.container.classList.contains('active')) {
            this.input.focus();
        }
    }

    closeChat() {
        this.container.classList.remove('active');
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (message) {
            this.handleUserMessage(message);
            this.input.value = '';
        }
    }

    handleUserMessage(message) {
        this.addMessage(message, 'user');
        
        // Guardar en historial
        this.context.conversationHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date().toISOString()
        });
        
        // Simular tiempo de respuesta del bot
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response.text, 'bot');
            
            // Guardar respuesta del bot en historial
            this.context.conversationHistory.push({
                type: 'bot',
                message: response.text,
                timestamp: new Date().toISOString()
            });
            
            if (response.options) {
                this.showOptions(response.options);
            }
        }, 800);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Detectar intención de contacto inmediato
        if (this.matchKeywords(lowerMessage, ['llamen', 'llamar', 'contactar', 'urgente', 'ahora', 'ya', 'asesor', 'hablar'])) {
            return this.startLeadCapture();
        }

        // FAQ - Preguntas frecuentes
        if (this.matchKeywords(lowerMessage, ['servicio', 'servicios', 'qué hacen', 'ofrecen', 'que hacen'])) {
            return {
                text: '🔧 Ofrecemos:\n\n• Montaje de Sistemas Solares\n• Reparación y Mantenimiento\n• Consultoría Energética\n\n¿Quieres que un asesor te contacte para más información?',
                options: ['Sí, que me llamen', 'Necesito presupuesto', 'Solo información']
            };
        }

        if (this.matchKeywords(lowerMessage, ['montaje', 'instalación', 'instalar', 'paneles', 'instalacion'])) {
            return {
                text: '☀️ Instalación completa de paneles solares:\n\n✅ Diseño personalizado\n✅ Instalación certificada\n✅ Garantía 5 años\n\nTiempo: 2-4 días\nAhorro: hasta 80%\n\n¿Quieres que te contactemos?',
                options: ['Sí, que me llamen', 'Ver precios', 'Más detalles']
            };
        }

        if (this.matchKeywords(lowerMessage, ['reparación', 'reparacion', 'mantenimiento', 'arreglo', 'falla', 'problema'])) {
            return {
                text: '🔧 Reparación urgente disponible.\n\nDiagnóstico: 24-48hs\nTécnicos certificados\nGarantía incluida\n\n¿Es urgente?',
                options: ['Sí, es urgente', 'Agendar visita', 'Consultar precio']
            };
        }

        if (this.matchKeywords(lowerMessage, ['consultoría', 'consultoria', 'asesoría', 'asesoramiento', 'consulta'])) {
            return {
                text: '💡 Te ayudamos a:\n\n• Calcular tu ahorro\n• Elegir el mejor sistema\n• Financiamiento disponible\n\n¿Hablamos?',
                options: ['Sí, contactenme', 'Ver opciones']
            };
        }

        if (this.matchKeywords(lowerMessage, ['precio', 'costo', 'cuánto', 'cuanto', 'valor', 'presupuesto'])) {
            return {
                text: '💰 El costo depende de tu consumo y tamaño del sistema.\n\nPromedio residencial: $2M - $5M\nRetorno: 5-7 años\nAhorro: 60-80%\n\nPara presupuesto exacto necesito tus datos.',
                options: ['Quiero presupuesto', 'Ver financiamiento']
            };
        }

        if (this.matchKeywords(lowerMessage, ['ahorro', 'ahorrar', 'beneficio', 'ventaja', 'conviene'])) {
            return {
                text: '💚 Con energía solar:\n\n✅ Ahorro 60-80% en luz\n✅ Recuperas inversión en 5-7 años\n✅ Valor de tu propiedad aumenta\n✅ Subsidios disponibles\n\n¿Calculamos tu ahorro?',
                options: ['Sí, calcular ahorro', 'Necesito asesoría']
            };
        }

        if (this.matchKeywords(lowerMessage, ['tiempo', 'demora', 'plazo', 'cuánto tarda', 'cuando', 'cuanto tarda'])) {
            return {
                text: '⏰ Instalación en 2-4 días.\n\nVisita + Evaluación: 1-2 días\nInstalación: 2-4 días\n¡Total: menos de 1 semana!\n\n¿Agendamos?',
                options: ['Sí, agendar', 'Más info']
            };
        }

        if (this.matchKeywords(lowerMessage, ['patagonia', 'ubicación', 'donde', 'dónde', 'zona', 'ubicacion'])) {
            return {
                text: '📍 Trabajamos en:\n\nRío Gallegos • Ushuaia\nEl Calafate • Toda la Patagonia\n\n¿En qué ciudad estás?',
                options: ['Río Gallegos', 'Ushuaia', 'Otra ciudad']
            };
        }

        if (this.matchKeywords(lowerMessage, ['garantía', 'garantia', 'respaldo', 'seguro'])) {
            return {
                text: '✅ Garantías:\n\nPaneles: 25 años\nInstalación: 5 años\nServicio técnico de por vida\n\n¿Quieres más detalles?',
                options: ['Sí, explicar más', 'Solicitar asesoría']
            };
        }

        if (this.matchKeywords(lowerMessage, ['financiamiento', 'financiación', 'pago', 'cuotas', 'crédito', 'financiar'])) {
            return {
                text: '💳 Financiamiento disponible:\n\n• Hasta 36 cuotas\n• Créditos verdes\n• Subsidios del gobierno\n\nHablemos de tu caso.',
                options: ['Quiero financiar', 'Ver opciones']
            };
        }

        if (this.matchKeywords(lowerMessage, ['presupuesto', 'cotización', 'cotizacion', 'solicitar', 'cotizar'])) {
            return this.startLeadCapture();
        }

        if (this.matchKeywords(lowerMessage, ['gracias', 'perfecto', 'ok', 'bien', 'excelente', 'dale', 'si'])) {
            return {
                text: '😊 ¿En qué más te ayudo?',
                options: ['Solicitar presupuesto', 'Hablar con asesor', 'Ver servicios']
            };
        }

        if (this.matchKeywords(lowerMessage, ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenos días'])) {
            return {
                text: '👋 ¡Hola! Soy el asistente de CER.\n\n¿Qué necesitas?',
                options: ['Ver servicios', 'Pedir presupuesto', 'Hablar con asesor']
            };
        }

        // Respuesta por defecto - MÁS DIRECTA
        return {
            text: '¿Qué necesitas?\n\n• Presupuesto\n• Info de servicios\n• Hablar con asesor',
            options: ['Presupuesto', 'Servicios', 'Que me llamen']
        };
    }

    startLeadCapture() {
        if (!this.context.name) {
            this.conversationState = 'ask_name';
            return {
                text: '¡Perfecto! ¿Tu nombre?'
            };
        } else if (!this.context.phone) {
            this.conversationState = 'ask_phone';
            return {
                text: `Gracias ${this.context.name}. ¿Tu teléfono?`
            };
        } else if (!this.context.email) {
            this.conversationState = 'ask_email';
            return {
                text: '¿Tu email?'
            };
        } else if (!this.context.consultation) {
            this.conversationState = 'ask_consultation';
            return {
                text: '¿Qué necesitas? (Ej: presupuesto para casa, reparación urgente, etc.)'
            };
        } else {
            this.conversationState = 'processing';
            return this.processConsultation();
        }
    }

    processConsultation() {
        // Guardar datos en la base de datos
        this.submitToDatabase();
        
        // Generar respuesta automática basada en la consulta
        const autoResponse = this.generateAutoResponse();
        
        // Iniciar encuesta de satisfacción después de la respuesta
        setTimeout(() => {
            this.startSatisfactionSurvey();
        }, 2000);
        
        return {
            text: autoResponse
        };
    }

    generateAutoResponse() {
        const consultation = this.context.consultation.toLowerCase();
        
        let response = `✅ ¡Listo, ${this.context.name}!\n\n`;
        
        if (consultation.includes('presupuesto') || consultation.includes('precio') || consultation.includes('costo')) {
            response += `💰 Te llamaremos en 24hs para darte un presupuesto personalizado.\n\n📊 Promedio: $2M-$5M\n💵 Ahorro: 60-80%\n⏱️ Retorno: 5-7 años`;
        } else if (consultation.includes('instalación') || consultation.includes('instalacion') || consultation.includes('montaje') || consultation.includes('instalar')) {
            response += `🔧 Un técnico te llamará para agendar:\n\n✅ Visita técnica GRATIS\n✅ Instalación en 2-4 días\n✅ Garantía 5 años`;
        } else if (consultation.includes('reparación') || consultation.includes('reparacion') || consultation.includes('mantenimiento') || consultation.includes('falla') || consultation.includes('urgente')) {
            response += `🚨 Solicitud URGENTE registrada.\n\nTe llamaremos en las próximas 2-4 horas.`;
        } else {
            response += `Un asesor te contactará en las próximas 24 horas para resolver tu consulta.`;
        }
        
        response += `\n\n📞 Te llamaremos a: ${this.context.phone}\n📧 También a: ${this.context.email}`;
        
        return response;
    }

    startSatisfactionSurvey() {
        this.awaitingFeedback = true;
        this.conversationState = 'survey_satisfaction';
        
        const surveyMessage = `\n\n📊 Encuesta de Satisfacción\n\n¿Cómo calificarías tu experiencia con nuestro asistente virtual?\n\nPor favor, elige una opción:`;
        
        this.addMessage(surveyMessage, 'bot');
        
        this.showOptions([
            '⭐ Excelente (5)',
            '⭐ Muy bueno (4)',
            '⭐ Bueno (3)',
            '⭐ Regular (2)',
            '⭐ Malo (1)'
        ]);
    }

    matchKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // Capturar información del usuario
        if (sender === 'user' && this.conversationState !== 'greeting') {
            this.captureUserData(text);
        }
    }

    captureUserData(text) {
        switch (this.conversationState) {
            case 'ask_name':
                this.context.name = text;
                setTimeout(() => {
                    const response = this.startLeadCapture();
                    this.addMessage(response.text, 'bot');
                    if (response.options) {
                        this.showOptions(response.options);
                    }
                }, 800);
                break;
                
            case 'ask_phone':
                if (this.validatePhone(text)) {
                    this.context.phone = text;
                    setTimeout(() => {
                        const response = this.startLeadCapture();
                        this.addMessage(response.text, 'bot');
                        if (response.options) {
                            this.showOptions(response.options);
                        }
                    }, 800);
                } else {
                    setTimeout(() => {
                        this.addMessage('Por favor, ingresa un número de teléfono válido (ej: +54 9 2966 123456 o 2966123456).', 'bot');
                    }, 500);
                }
                break;
                
            case 'ask_email':
                if (this.validateEmail(text)) {
                    this.context.email = text;
                    setTimeout(() => {
                        const response = this.startLeadCapture();
                        this.addMessage(response.text, 'bot');
                        if (response.options) {
                            this.showOptions(response.options);
                        }
                    }, 800);
                } else {
                    setTimeout(() => {
                        this.addMessage('Por favor, ingresa un correo electrónico válido.', 'bot');
                    }, 500);
                }
                break;
                
            case 'ask_consultation':
                if (text.length < 10) {
                    setTimeout(() => {
                        this.addMessage('Por favor, describe tu consulta con más detalle (mínimo 10 caracteres).', 'bot');
                    }, 500);
                } else {
                    this.context.consultation = text;
                    setTimeout(() => {
                        const response = this.startLeadCapture();
                        this.addMessage(response.text, 'bot');
                        if (response.options) {
                            this.showOptions(response.options);
                        }
                    }, 800);
                }
                break;
                
            case 'survey_satisfaction':
                this.handleSatisfactionResponse(text);
                break;
                
            case 'survey_comments':
                this.context.comments = text;
                this.finalizeSurvey();
                break;
        }
    }

    handleSatisfactionResponse(text) {
        // Extraer calificación del texto
        let rating = 0;
        if (text.includes('(5)') || text.toLowerCase().includes('excelente')) {
            rating = 5;
        } else if (text.includes('(4)') || text.toLowerCase().includes('muy bueno')) {
            rating = 4;
        } else if (text.includes('(3)') || text.toLowerCase().includes('bueno')) {
            rating = 3;
        } else if (text.includes('(2)') || text.toLowerCase().includes('regular')) {
            rating = 2;
        } else if (text.includes('(1)') || text.toLowerCase().includes('malo')) {
            rating = 1;
        }
        
        this.context.satisfaction = rating;
        
        setTimeout(() => {
            this.conversationState = 'survey_comments';
            const message = rating >= 4 
                ? '¡Gracias por tu calificación! 😊\n\n¿Te gustaría dejarnos algún comentario adicional? (Escribe "no" si prefieres omitir este paso)'
                : 'Gracias por tu honestidad. 😊\n\n¿Podrías contarnos qué podemos mejorar? Tu opinión es muy valiosa para nosotros. (Escribe "no" si prefieres omitir este paso)';
            
            this.addMessage(message, 'bot');
        }, 800);
    }

    finalizeSurvey() {
        if (this.context.comments.toLowerCase() === 'no') {
            this.context.comments = null;
        }
        
        // Guardar encuesta en base de datos
        this.submitSurveyToDatabase();
        
        setTimeout(() => {
            const stars = '⭐'.repeat(this.context.satisfaction);
            let finalMessage = `¡Muchas gracias por completar la encuesta, ${this.context.name}! ${stars}\n\n`;
            
            if (this.context.satisfaction >= 4) {
                finalMessage += '¡Nos alegra que hayas tenido una buena experiencia! ';
            } else {
                finalMessage += 'Agradecemos tu retroalimentación y trabajaremos para mejorar. ';
            }
            
            finalMessage += '\n\nRecuerda que nuestro equipo se comunicará contigo pronto para atender tu consulta.\n\n¿Hay algo más en lo que pueda ayudarte?';
            
            this.addMessage(finalMessage, 'bot');
            this.showOptions(['Ver servicios', 'Nueva consulta', 'Finalizar']);
            
            this.conversationState = 'greeting';
            this.awaitingFeedback = false;
        }, 1000);
    }

    validatePhone(phone) {
        // Aceptar diferentes formatos de teléfono
        const phoneRegex = /^[\d\s\-\+\(\)]{8,20}$/;
        return phoneRegex.test(phone);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showOptions(options) {
        // Limpiar opciones anteriores
        this.quickRepliesContainer.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quick-reply';
            button.textContent = option;
            button.addEventListener('click', () => {
                this.handleUserMessage(option);
            });
            this.quickRepliesContainer.appendChild(button);
        });
    }

    submitToDatabase() {
        const dataToSave = {
            ...this.context,
            type: 'consultation',
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        console.log('💾 Guardando consulta en base de datos:', dataToSave);
        
        // Guardar en localStorage como simulación de base de datos
        this.saveToLocalStorage('consultation', dataToSave);
        
        // Aquí integrarías con tu backend real
        /*
        fetch('/api/consultations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSave)
        })
        .then(response => response.json())
        .then(data => {
            console.log('✅ Consulta guardada en servidor:', data);
        })
        .catch(error => {
            console.error('❌ Error al guardar:', error);
        });
        */
    }

    submitSurveyToDatabase() {
        const surveyData = {
            sessionId: this.context.sessionId,
            name: this.context.name,
            email: this.context.email,
            phone: this.context.phone,
            satisfaction: this.context.satisfaction,
            comments: this.context.comments,
            timestamp: new Date().toISOString(),
            type: 'survey'
        };
        
        console.log('📊 Guardando encuesta en base de datos:', surveyData);
        
        // Guardar en localStorage
        this.saveToLocalStorage('survey', surveyData);
        
        // Aquí integrarías con tu backend real
        /*
        fetch('/api/surveys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('✅ Encuesta guardada en servidor:', data);
        })
        .catch(error => {
            console.error('❌ Error al guardar encuesta:', error);
        });
        */
    }

    saveToLocalStorage(type, data) {
        try {
            // Obtener datos existentes
            const existingData = JSON.parse(localStorage.getItem(`cer_${type}s`) || '[]');
            
            // Agregar nuevo registro
            existingData.push(data);
            
            // Guardar actualizado
            localStorage.setItem(`cer_${type}s`, JSON.stringify(existingData));
            
            console.log(`✅ ${type} guardado en localStorage`);
            
            // Mostrar estadísticas
            this.showStorageStats();
        } catch (error) {
            console.error(`❌ Error al guardar en localStorage:`, error);
        }
    }

    showStorageStats() {
        const consultations = JSON.parse(localStorage.getItem('cer_consultations') || '[]');
        const surveys = JSON.parse(localStorage.getItem('cer_surveys') || '[]');
        
        console.log(`\n📊 Estadísticas de Base de Datos Local:\n` +
                    `   • Consultas registradas: ${consultations.length}\n` +
                    `   • Encuestas completadas: ${surveys.length}\n`);
    }
}

// Inicializar el chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new CERChatbot();
});
