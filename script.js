// ===================================
// Scripts de Interactividad para CER
// ===================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
    initNewsletterForm();
});

// ===================================
// Navegación
// ===================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle menú móvil
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Efectos de Scroll
// ===================================
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.about-card, .service-card, .project-card, .sustainability-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contador animado para estadísticas
    const stats = document.querySelectorAll('.impact-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element) {
    const target = element.textContent;
    const isNumber = /^\d+$/.test(target);
    
    if (!isNumber) return;

    const duration = 2000;
    const steps = 60;
    const increment = parseInt(target) / steps;
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= parseInt(target)) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString();
        }
    }, duration / steps);
}

// ===================================
// Formulario de Contacto
// ===================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Validar formulario
            if (!validateContactForm(formData)) {
                showNotification('Por favor, completa todos los campos correctamente.', 'error');
                return;
            }

            // Deshabilitar botón durante el envío
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            // Simular envío (aquí integrarías con tu backend)
            try {
                await simulateFormSubmission(formData);
                
                showNotification('¡Mensaje enviado exitosamente! Nos contactaremos contigo pronto.', 'success');
                contactForm.reset();
                
                // Remover las clases de los labels flotantes
                const labels = contactForm.querySelectorAll('label');
                labels.forEach(label => {
                    label.style.top = '12px';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-light)';
                });
                
            } catch (error) {
                showNotification('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
}

function validateContactForm(data) {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    // Validar teléfono (formato básico)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.length < 8) {
        return false;
    }

    // Validar campos requeridos
    if (!data.name || !data.service || !data.message) {
        return false;
    }

    return true;
}

async function simulateFormSubmission(data) {
    // Simular delay de red
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Formulario enviado:', data);
            
            // Aquí integrarías con tu backend real
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
            */
            
            resolve({ success: true });
        }, 1500);
    });
}

// ===================================
// Newsletter Form
// ===================================
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (!validateEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }

            const button = newsletterForm.querySelector('button');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

            try {
                await simulateNewsletterSubmission(email);
                showNotification('¡Gracias por suscribirte a nuestro newsletter!', 'success');
                emailInput.value = '';
            } catch (error) {
                showNotification('Error al suscribirte. Intenta nuevamente.', 'error');
            } finally {
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-paper-plane"></i>';
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function simulateNewsletterSubmission(email) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Newsletter suscrito:', email);
            resolve({ success: true });
        }, 1000);
    });
}

// ===================================
// Sistema de Notificaciones
// ===================================
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Icono según el tipo
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Estilos inline (también puedes agregarlos al CSS)
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Color según tipo
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.querySelector('i').style.color = colors[type];
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        color: #7f8c8d;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Agregar animaciones para las notificaciones (inline)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Animaciones y Efectos Adicionales
// ===================================
function initAnimations() {
    // Efecto parallax en el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Resaltar sección activa en el menú
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Efecto hover en las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===================================
// Utilidades
// ===================================

// Detectar si el usuario está en un dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Detectar el navegador
function getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
    if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
    if (userAgent.indexOf('Safari') > -1) return 'Safari';
    if (userAgent.indexOf('Edge') > -1) return 'Edge';
    return 'Unknown';
}

// Log de información del usuario (para debugging)
console.log('🌿 CER - Compañía de Energías Renovables');
console.log('Dispositivo:', isMobile() ? 'Móvil' : 'Escritorio');
console.log('Navegador:', getBrowser());
console.log('Resolución:', `${window.innerWidth}x${window.innerHeight}`);

// ===================================
// Manejo de errores global
// ===================================
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.message);
    // Aquí podrías enviar el error a un servicio de logging
});

// ===================================
// Service Worker (opcional, para PWA)
// ===================================
if ('serviceWorker' in navigator) {
    // Descomenta esto si creas un service worker
    /*
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('SW registrado:', registration))
            .catch(error => console.log('SW error:', error));
    });
    */
}

// ===================================
// Exportar funciones para testing
// ===================================
window.CERUtils = {
    validateEmail,
    isMobile,
    getBrowser,
    showNotification
};
