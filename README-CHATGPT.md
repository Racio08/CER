# 🚀 Guía Rápida de Inicio - CER CRM + ChatGPT

## ⚡ Instalación Express (5 minutos)

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar OpenAI
```bash
cp .env.example .env
nano .env
```

Pega tu API Key:
```env
OPENAI_API_KEY=sk-proj-tu_key_aqui
```

### 3. Iniciar Servidor
```bash
npm start
```

### 4. Abrir Aplicación
- **Sitio web**: http://localhost:3000
- **Panel CRM**: http://localhost:3000/crm-admin.html

---

## 🎯 Características Principales

### ✅ Chatbot con ChatGPT (GPT-4)
- Respuestas inteligentes y contextuales
- Conocimiento completo sobre CER y servicios
- Captura automática de datos de contacto
- Historial de conversación persistente

### ✅ Sistema CRM Completo
- Registro automático de leads
- Base de datos SQLite local
- Panel administrativo profesional
- Estadísticas en tiempo real
- Historial completo de conversaciones

### ✅ Funcionalidades Avanzadas
- Detección automática de tipo de consulta
- Clasificación de leads
- Búsqueda y filtrado
- Estados de seguimiento
- Sistema de encuestas de satisfacción

---

## 📊 Panel CRM

Accede a: `http://localhost:3000/crm-admin.html`

**Dashboard incluye**:
- Total de leads
- Leads del día
- Leads de la semana
- Calificación promedio

**Gestión de Leads**:
- Ver todos los clientes
- Filtrar por estado
- Buscar por nombre/email/teléfono
- Ver conversaciones completas

---

## 🔑 Obtener API Key de OpenAI

1. Ve a https://platform.openai.com/
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys"
4. Click en "Create new secret key"
5. Copia la key y pégala en `.env`

**Modelos recomendados**:
- `gpt-4o-mini` - Económico y rápido (desarrollo)
- `gpt-4o` - Más potente (producción)

---

## 💡 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start

# Modo desarrollo (auto-reload)
npm run dev

# Ver logs
npm start | grep "Lead"

# Reiniciar base de datos
rm cer_crm.db && npm start
```

---

## 🐛 Problemas Comunes

### "Cannot find module"
```bash
npm install
```

### "Missing API Key"
Verifica que `.env` existe y tiene tu API Key.

### "Port already in use"
```bash
# Cambiar puerto en .env
PORT=3001
```

### Ver más detalles
Consulta `INSTALACION.md` para troubleshooting completo.

---

## 📁 Archivos Importantes

```
├── server.js              # Backend con Express y OpenAI
├── chatbot-openai.js      # Chatbot frontend integrado
├── crm-admin.html         # Panel administrativo CRM
├── .env                   # Variables de entorno (crear este)
├── .env.example           # Ejemplo de configuración
└── cer_crm.db            # Base de datos (se crea automáticamente)
```

---

## 🎨 Personalización

### Modificar Prompt del Bot

Edita `server.js` línea ~94:

```javascript
const SYSTEM_PROMPT = `
  Eres un asistente de CER...
  [Personaliza aquí]
`;
```

### Cambiar Modelo de OpenAI

En `.env`:
```env
OPENAI_MODEL=gpt-4o-mini  # Cambia aquí
```

---

## 📊 Estructura de Base de Datos

### Tabla `leads`
- ID, nombre, teléfono, email
- Consulta, tipo de consulta
- Estado, fecha de creación, notas

### Tabla `conversaciones`
- Lead ID, mensaje, rol (user/assistant)
- Fecha y hora

### Tabla `encuestas`
- Lead ID, calificación (1-5)
- Comentario, fecha

---

## 🔒 Seguridad

⚠️ **IMPORTANTE**:
- Nunca compartas tu archivo `.env`
- No subas `.env` a Git (ya está en `.gitignore`)
- Limita el uso de la API en OpenAI
- Implementa autenticación para el panel CRM en producción

---

## 💰 Costos Estimados

Con **gpt-4o-mini**:
- 1000 conversaciones: ~$0.40 USD
- Muy económico para empezar

Con **gpt-4o**:
- 1000 conversaciones: ~$5-10 USD
- Mejor calidad de respuestas

---

## 🚀 Próximos Pasos

1. ✅ Instala las dependencias
2. ✅ Configura tu API Key
3. ✅ Inicia el servidor
4. ✅ Prueba el chatbot
5. ✅ Revisa el panel CRM
6. 🎯 Personaliza según tus necesidades

---

## 📚 Documentación Completa

Ver `INSTALACION.md` para:
- Guía detallada paso a paso
- API endpoints completos
- Despliegue en producción
- Troubleshooting avanzado

---

## ✨ Demo Rápida

1. Abre: http://localhost:3000
2. Click en el botón del chatbot
3. Escribe: "Hola, quiero información sobre paneles solares"
4. El bot responderá con información de CER
5. Proporciona tu nombre y datos
6. Ve al panel CRM para ver tu registro

---

**¿Necesitas ayuda?** Consulta `INSTALACION.md` o revisa los logs del servidor.

**¡Listo para empezar! 🎉**
