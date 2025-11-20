# 🌿 CER - Compañía de Energías Renovables

![Estado del Proyecto](https://img.shields.io/badge/Estado-Activo-success)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green)

**Sitio web corporativo con chatbot inteligente para CER**, empresa líder en soluciones de energía solar en la Patagonia Argentina.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Demostración](#-demostración)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)
- [Personalización](#-personalización)
- [Chatbot](#-chatbot)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características

### 🎨 Diseño Moderno y Responsive
- Diseño mobile-first que se adapta a todos los dispositivos
- Animaciones suaves y efectos de scroll
- Paleta de colores verde corporativo
- Experiencia de usuario intuitiva

### 🤖 Chatbot Inteligente Mejorado
- ✅ Responde preguntas frecuentes automáticamente
- ✅ Captura completa: **nombre, teléfono, email y consulta**
- ✅ **Respuestas automáticas** personalizadas según el tipo de consulta
- ✅ **Encuesta de satisfacción** al finalizar la interacción
- ✅ **Base de datos** integrada (LocalStorage + Backend ready)
- ✅ **Panel administrativo** para ver consultas y encuestas
- ✅ Historial de conversación completo
- ✅ Validación de datos en tiempo real

### 📱 Secciones Completas
1. **Inicio**: Hero section impactante con call-to-action
2. **Nosotros**: Misión, visión y valores corporativos
3. **Servicios**: Montaje, reparación y consultoría
4. **Proyectos**: Showcase de proyectos en la Patagonia
5. **Sostenibilidad**: Impacto ambiental, social y económico
6. **Contacto**: Formulario + información de contacto

### 🚀 Rendimiento Optimizado
- Carga rápida con CSS y JS optimizado
- Imágenes y recursos optimizados
- Código limpio y bien documentado
- SEO-friendly

---

## 🎥 Demostración

### Vista Desktop
![Vista Desktop](https://via.placeholder.com/800x400/2ecc71/ffffff?text=Vista+Desktop+CER)

### Vista Mobile
![Vista Mobile](https://via.placeholder.com/400x800/27ae60/ffffff?text=Vista+Mobile+CER)

### Chatbot en Acción
![Chatbot](https://via.placeholder.com/400x600/3498db/ffffff?text=Chatbot+CER)

---

## 🛠️ Tecnologías

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsive con Flexbox y Grid
- **JavaScript (Vanilla)**: Sin dependencias externas
- **Font Awesome 6**: Iconografía moderna

### Características Técnicas
- CSS Custom Properties (Variables CSS)
- IntersectionObserver API para animaciones
- LocalStorage para persistencia (chatbot)
- Formularios validados con JavaScript nativo
- Arquitectura modular y escalable

---

## 📥 Instalación

### Opción 1: Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/Racio08/CER.git

# Navegar al directorio
cd CER

# Abrir con tu navegador favorito
# En Linux/Mac:
open index.html
# En Windows:
start index.html

# O con un servidor local (recomendado)
python -m http.server 8000
# Luego abrir: http://localhost:8000
```

### Opción 2: Descarga Directa

1. Descarga el proyecto como ZIP
2. Extrae los archivos
3. Abre `index.html` en tu navegador

### Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para cargar Font Awesome CDN)
- Servidor web local (opcional pero recomendado)

---

## 📁 Estructura del Proyecto

```
CER/
│
├── index.html          # Página principal HTML
├── styles.css          # Estilos CSS
├── script.js           # Scripts de interactividad
├── chatbot.js          # Lógica del chatbot mejorado
├── admin.html          # Panel administrativo
├── README.md           # Documentación
├── DATABASE_INTEGRATION.md  # Guía de integración con backend
│
├── assets/             # (Opcional) Recursos adicionales
│   ├── images/         # Imágenes del proyecto
│   ├── icons/          # Iconos personalizados
│   └── fonts/          # Fuentes locales
│
└── docs/               # (Opcional) Documentación adicional
    ├── api.md          # Documentación API
    └── deployment.md   # Guía de despliegue
```

---

## 🚀 Despliegue

### GitHub Pages

1. **Sube tu código a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Racio08/CER.git
   git push -u origin main
   ```

2. **Configurar GitHub Pages**:
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → /root
   - Save

3. **Tu sitio estará disponible en**:
   ```
   https://racio08.github.io/CER/
   ```

### Netlify

1. **Conectar con Git**:
   - Crea una cuenta en [Netlify](https://netlify.com)
   - Click en "New site from Git"
   - Conecta tu repositorio de GitHub

2. **Configuración de Build**:
   - Build command: (dejar vacío)
   - Publish directory: `/`

3. **Deploy**: Click en "Deploy site"

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd CER
vercel

# Seguir las instrucciones en pantalla
```

### Hosting Tradicional

1. Sube todos los archivos vía FTP
2. Asegúrate de que `index.html` esté en la raíz
3. Verifica que todas las rutas sean correctas

---

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2ecc71;      /* Verde principal */
    --primary-dark: #27ae60;       /* Verde oscuro */
    --secondary-color: #3498db;    /* Azul secundario */
    /* Modifica según tu marca */
}
```

### Modificar Contenido

#### Información de la Empresa
Edita `index.html` en las secciones correspondientes:
- Línea 50-70: Hero section
- Línea 75-120: Sección Nosotros
- Línea 125-200: Servicios
- etc.

#### Datos de Contacto
Busca y reemplaza en `index.html`:
```html
<!-- Teléfono -->
+54 2966 123-456

<!-- Email -->
info@cer-energia.com

<!-- Dirección -->
Av. San Martín 1234, Río Gallegos
```

### Personalizar el Chatbot

Edita `chatbot.js` para:

1. **Agregar nuevas respuestas**:
```javascript
if (this.matchKeywords(lowerMessage, ['nueva', 'pregunta'])) {
    return {
        text: 'Tu respuesta personalizada aquí',
        options: ['Opción 1', 'Opción 2']
    };
}
```

2. **Cambiar el mensaje de bienvenida**:
```javascript
// En index.html, línea ~380
<div class="message bot-message">
    <div class="message-content">
        ¡Tu mensaje personalizado!
    </div>
</div>
```

3. **Conectar con Backend**:
```javascript
// En chatbot.js, método submitLead()
fetch('TU_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.context)
})
```

---

## 🤖 Chatbot Mejorado

### Funcionalidades Completas

El chatbot incluye:

✅ **FAQ Inteligente**: Responde preguntas sobre servicios, precios, ubicación  
✅ **Captura de Datos Completa**: 
   - Nombre completo
   - Número de teléfono
   - Correo electrónico  
   - Consulta detallada del cliente

✅ **Respuestas Automáticas Inteligentes**: 
   - Analiza la consulta del cliente
   - Genera respuesta personalizada automática
   - Diferencia entre presupuestos, instalaciones, reparaciones, etc.

✅ **Encuesta de Satisfacción**: 
   - Calificación de 1 a 5 estrellas
   - Comentarios opcionales del cliente
   - Se activa automáticamente al finalizar la consulta

✅ **Base de Datos Integrada**:
   - Guarda todas las consultas
   - Guarda todas las encuestas
   - LocalStorage (demo) + Backend ready
   - Historial completo de conversaciones

✅ **Panel Administrativo**: 
   - Ver todas las consultas en `admin.html`
   - Estadísticas en tiempo real
   - Calificación promedio de satisfacción
   - Exportable a backend real

### Preguntas que Responde

- Información sobre servicios
- Precios y presupuestos
- Beneficios de la energía solar
- Ubicación y cobertura
- Tiempos de instalación
- Garantías y financiamiento
- Contacto directo

### Integración con Backend

Para conectar el chatbot con tu servidor:

```javascript
// En chatbot.js, método submitLead()
async submitLead() {
    try {
        const response = await fetch('https://tu-api.com/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TU_TOKEN'
            },
            body: JSON.stringify(this.context)
        });
        
        const data = await response.json();
        console.log('Lead guardado:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### Servicios Recomendados para Integración

- **EmailJS**: Envío de emails sin backend
- **Formspree**: Formularios simples
- **Zapier**: Automatización y CRM
- **Airtable**: Base de datos simple
- **Google Sheets**: Almacenamiento gratuito

---

## 📊 Analytics y SEO

### Google Analytics

Agrega antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU_ID');
</script>
```

### Meta Tags para SEO

Ya incluidos en `index.html`:

```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
```

---

## 🔒 Seguridad

### Recomendaciones

1. **Validar datos del lado del servidor** (siempre)
2. **Usar HTTPS** en producción
3. **Sanitizar inputs** antes de procesar
4. **Implementar rate limiting** para formularios
5. **No exponer APIs keys** en el código frontend

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

---

## 📝 Próximas Mejoras

- [ ] Sistema de blog para noticias
- [ ] Calculadora de ahorro energético
- [ ] Galería de proyectos con lightbox
- [ ] Integración con Google Maps
- [ ] Sistema de citas online
- [ ] Panel de administración
- [ ] Multiidioma (inglés/español)
- [ ] PWA (Progressive Web App)

---

## 📧 Contacto

**CER - Compañía de Energías Renovables**

- 🌐 Web: [www.cer-energia.com](https://racio08.github.io/CER/)
- 📧 Email: info@cer-energia.com
- 📱 WhatsApp: +54 9 2966 123-456
- 📍 Dirección: Av. San Martín 1234, Río Gallegos, Santa Cruz

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

- [Font Awesome](https://fontawesome.com) por los iconos
- [Unsplash](https://unsplash.com) por las imágenes de referencia
- La comunidad de desarrolladores por la inspiración

---

## 📚 Recursos Adicionales

### Tutoriales
- [Guía de HTML5](https://developer.mozilla.org/es/docs/Web/HTML)
- [Guía de CSS3](https://developer.mozilla.org/es/docs/Web/CSS)
- [JavaScript Moderno](https://javascript.info)

### Herramientas Útiles
- [Can I Use](https://caniuse.com) - Compatibilidad de navegadores
- [PageSpeed Insights](https://pagespeed.web.dev) - Optimización
- [Wave](https://wave.webaim.org) - Accesibilidad

---

<div align="center">

**Desarrollado con 💚 por CER**

⭐ Si te gusta este proyecto, dale una estrella en GitHub

[⬆ Volver arriba](#-cer---compañía-de-energías-renovables)

</div>
