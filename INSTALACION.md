# 🤖 Guía de Instalación: ChatGPT + CRM para CER

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Configuración de OpenAI](#configuración-de-openai)
4. [Ejecución del Sistema](#ejecución-del-sistema)
5. [Uso del Panel CRM](#uso-del-panel-crm)
6. [API Endpoints](#api-endpoints)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- Una cuenta en **OpenAI** - [Registrarse aquí](https://platform.openai.com/)
- Editor de código (VS Code recomendado)

---

## 📦 Instalación

### Paso 1: Instalar Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará:
- `express` - Framework web
- `cors` - Para permitir peticiones cross-origin
- `dotenv` - Para variables de entorno
- `openai` - Cliente oficial de OpenAI
- `sqlite3` - Base de datos local

### Paso 2: Verificar Instalación

```bash
npm list
```

Deberías ver una lista de dependencias instaladas correctamente.

---

## 🔑 Configuración de OpenAI

### Paso 1: Obtener API Key

1. Ve a [platform.openai.com](https://platform.openai.com/)
2. Inicia sesión o crea una cuenta
3. Ve a **API Keys** en el menú lateral
4. Haz clic en **Create new secret key**
5. Copia la API key (¡guárdala en un lugar seguro!)

### Paso 2: Configurar Variables de Entorno

1. **Copia el archivo de ejemplo**:
   ```bash
   cp .env.example .env
   ```

2. **Edita el archivo `.env`**:
   ```bash
   # En Linux/Mac
   nano .env
   
   # O abre con tu editor favorito
   code .env
   ```

3. **Pega tu API Key**:
   ```env
   PORT=3000
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxx
   OPENAI_MODEL=gpt-4o-mini
   ```

   **Modelos disponibles**:
   - `gpt-4o` - Más potente, más costoso (recomendado para producción)
   - `gpt-4o-mini` - Equilibrado, económico (recomendado para desarrollo)
   - `gpt-3.5-turbo` - Más rápido, más barato

4. **Guarda el archivo** (Ctrl+O, Enter, Ctrl+X en nano)

### Paso 3: Verificar Configuración

El archivo `.env` debe verse así:

```env
PORT=3000
OPENAI_API_KEY=sk-proj-ABC123XYZ789...
OPENAI_MODEL=gpt-4o-mini
```

⚠️ **IMPORTANTE**: 
- Nunca compartas tu `.env` con nadie
- El archivo ya está en `.gitignore` para protegerlo

---

## 🚀 Ejecución del Sistema

### Iniciar el Servidor Backend

**Opción 1: Modo Normal**
```bash
npm start
```

**Opción 2: Modo Desarrollo (auto-reload)**
```bash
npm run dev
```

Deberías ver:
```
╔═══════════════════════════════════════════╗
║  🌿 CER - SERVIDOR BACKEND ACTIVO         ║
╠═══════════════════════════════════════════╣
║  🚀 Puerto: 3000                          ║
║  🤖 OpenAI: ✅ Configurado                ║
║  💾 Base de datos: SQLite                 ║
╚═══════════════════════════════════════════╝
📱 Accede en: http://localhost:3000
```

### Abrir la Aplicación

Abre tu navegador en:

1. **Sitio web principal**: http://localhost:3000
2. **Panel CRM**: http://localhost:3000/crm-admin.html

---

## 💼 Uso del Panel CRM

### Acceder al Panel

1. Abre: http://localhost:3000/crm-admin.html
2. Verás el dashboard con estadísticas

### Funcionalidades del Panel

#### 📊 Dashboard
- **Total de Leads**: Todos los registros
- **Leads Hoy**: Contactos del día
- **Esta Semana**: Últimos 7 días
- **Satisfacción**: Promedio de encuestas

#### 📋 Tabla de Leads
- Ver todos los leads registrados
- Filtrar por estado (Nuevo, Contactado, Cerrado)
- Buscar por nombre, email o teléfono
- Hacer clic en una fila para ver detalles

#### 👤 Detalle de Lead
- Información completa del cliente
- Historial de conversación con el chatbot
- Tipo de consulta
- Estado actual

#### 🔍 Búsqueda
- Busca por nombre, email o teléfono
- Resultados en tiempo real

---

## 🔌 API Endpoints

El backend expone estos endpoints:

### Chat con OpenAI
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Hola, quiero información sobre paneles solares",
  "conversationHistory": []
}
```

### Guardar Lead
```http
POST /api/leads
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "telefono": "+54 9 11 1234-5678",
  "email": "juan@example.com",
  "consulta": "Quiero instalar paneles solares",
  "tipo_consulta": "presupuesto"
}
```

### Obtener Todos los Leads
```http
GET /api/leads
```

### Obtener Lead por ID
```http
GET /api/leads/1
```

### Actualizar Lead
```http
PUT /api/leads/1
Content-Type: application/json

{
  "estado": "contactado",
  "notas": "Cliente llamado, espera presupuesto"
}
```

### Guardar Conversación
```http
POST /api/conversaciones
Content-Type: application/json

{
  "lead_id": 1,
  "mensaje": "Hola, necesito información",
  "rol": "user"
}
```

### Obtener Conversaciones de un Lead
```http
GET /api/conversaciones/1
```

### Guardar Encuesta
```http
POST /api/encuestas
Content-Type: application/json

{
  "lead_id": 1,
  "calificacion": 5,
  "comentario": "Excelente atención"
}
```

### Estadísticas
```http
GET /api/estadisticas
```

### Health Check
```http
GET /api/health
```

---

## 🎯 Flujo de Uso Completo

### 1. Cliente Interactúa con el Chatbot

1. Cliente abre el sitio web
2. Hace clic en el botón del chatbot
3. Hace una pregunta (ej: "¿Cuánto cuesta instalar paneles solares?")
4. ChatGPT (GPT-4) responde con información personalizada
5. El bot solicita datos de contacto
6. Cliente proporciona: nombre, teléfono, email

### 2. Sistema Guarda la Información

1. El chatbot detecta automáticamente los datos
2. Crea un registro en la base de datos
3. Guarda toda la conversación
4. Clasifica el tipo de consulta

### 3. Equipo Revisa en el CRM

1. Abres el panel CRM
2. Ves el nuevo lead con badge "nuevo"
3. Haces clic para ver el detalle
4. Revisas la conversación completa
5. Contactas al cliente
6. Actualizas el estado a "contactado"

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'openai'"

**Solución**:
```bash
npm install openai
```

### Error: "Missing API Key"

**Solución**:
1. Verifica que el archivo `.env` existe
2. Verifica que tiene la API Key correcta
3. Reinicia el servidor

### Error: "Port 3000 already in use"

**Solución 1**: Cambiar el puerto en `.env`:
```env
PORT=3001
```

**Solución 2**: Matar el proceso:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: "Failed to fetch"

**Solución**:
1. Verifica que el servidor está corriendo
2. Revisa la consola del navegador (F12)
3. Verifica que la URL de la API es correcta

### Base de Datos Corrupta

**Solución**:
```bash
# Eliminar la base de datos
rm cer_crm.db

# Reiniciar el servidor (creará una nueva BD)
npm start
```

### ChatGPT no responde correctamente

**Solución**:
1. Verifica tu saldo en OpenAI
2. Prueba con un modelo más simple (gpt-3.5-turbo)
3. Revisa los logs del servidor

---

## 💰 Costos de OpenAI

### Pricing (Mayo 2024)

| Modelo | Input (1M tokens) | Output (1M tokens) |
|--------|-------------------|-------------------|
| gpt-4o | $5.00 | $15.00 |
| gpt-4o-mini | $0.15 | $0.60 |
| gpt-3.5-turbo | $0.50 | $1.50 |

### Estimación de Uso

- Una conversación promedio: ~500-1000 tokens
- Con gpt-4o-mini: ~$0.0004 por conversación
- 1000 conversaciones: ~$0.40

**Recomendación**: Empieza con `gpt-4o-mini` para desarrollo.

---

## 🔒 Seguridad

### Mejores Prácticas

1. **Nunca expongas tu API Key**
   - No la incluyas en el código
   - Usa siempre `.env`
   - No la subas a Git

2. **Limita el uso**
   - Implementa rate limiting
   - Configura límites en OpenAI

3. **Valida entradas**
   - Sanitiza datos del usuario
   - Valida en el backend

4. **Monitorea el uso**
   - Revisa tu dashboard de OpenAI
   - Configura alertas de presupuesto

---

## 📊 Base de Datos

El sistema usa SQLite con 3 tablas:

### Tabla: `leads`
```sql
- id (INTEGER PRIMARY KEY)
- nombre (TEXT)
- telefono (TEXT)
- email (TEXT)
- consulta (TEXT)
- tipo_consulta (TEXT)
- fecha_creacion (DATETIME)
- estado (TEXT)
- notas (TEXT)
```

### Tabla: `conversaciones`
```sql
- id (INTEGER PRIMARY KEY)
- lead_id (INTEGER)
- mensaje (TEXT)
- rol (TEXT)
- fecha (DATETIME)
```

### Tabla: `encuestas`
```sql
- id (INTEGER PRIMARY KEY)
- lead_id (INTEGER)
- calificacion (INTEGER)
- comentario (TEXT)
- fecha (DATETIME)
```

---

## 🚀 Despliegue en Producción

### Opciones de Hosting

1. **Heroku**
   ```bash
   heroku create cer-backend
   heroku config:set OPENAI_API_KEY=tu_key
   git push heroku main
   ```

2. **Railway**
   - Conecta tu repositorio
   - Agrega variables de entorno
   - Deploy automático

3. **DigitalOcean**
   - Droplet con Node.js
   - Configurar PM2
   - Nginx como reverse proxy

4. **VPS Propio**
   ```bash
   npm install -g pm2
   pm2 start server.js --name cer-backend
   pm2 startup
   pm2 save
   ```

### Variables de Entorno en Producción

```env
PORT=3000
OPENAI_API_KEY=sk-prod-xxxxx
OPENAI_MODEL=gpt-4o-mini
NODE_ENV=production
```

---

## 🎓 Recursos Adicionales

- [Documentación de OpenAI](https://platform.openai.com/docs)
- [Express.js Docs](https://expressjs.com/)
- [SQLite Docs](https://www.sqlite.org/docs.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 📞 Soporte

Si tienes problemas:

1. Revisa esta documentación
2. Consulta los logs del servidor
3. Revisa la consola del navegador (F12)
4. Busca el error en Google

---

## ✅ Checklist de Instalación

- [ ] Node.js instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Cuenta de OpenAI creada
- [ ] API Key obtenida
- [ ] Archivo `.env` configurado
- [ ] Servidor iniciado sin errores
- [ ] Sitio web accesible
- [ ] Panel CRM accesible
- [ ] Chatbot responde correctamente
- [ ] Leads se guardan en la BD

---

## 🎉 ¡Listo!

Tu sistema de chatbot con ChatGPT y CRM está completamente configurado. 

**Próximos pasos**:
1. Prueba el chatbot en el sitio web
2. Haz algunas preguntas de prueba
3. Revisa el panel CRM
4. Personaliza el prompt de ChatGPT según tus necesidades

**¡Buena suerte! 🚀**
