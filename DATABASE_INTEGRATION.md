# 🗄️ Integración con Base de Datos - CER Chatbot

## Opciones de Integración

### 1. LocalStorage (Actual - Demo)
✅ **Actualmente implementado**
- Almacenamiento en el navegador del cliente
- Perfecto para pruebas y desarrollo
- Los datos persisten hasta que se limpie el navegador
- Ver datos en: `admin.html`

---

### 2. Backend con Node.js + Express + MongoDB

#### Estructura del Backend

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/cer_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modelos
const consultationSchema = new mongoose.Schema({
    sessionId: String,
    timestamp: Date,
    name: String,
    email: String,
    phone: String,
    consultation: String,
    status: { type: String, default: 'pending' },
    conversationHistory: Array
});

const surveySchema = new mongoose.Schema({
    sessionId: String,
    timestamp: Date,
    name: String,
    email: String,
    phone: String,
    satisfaction: Number,
    comments: String
});

const Consultation = mongoose.model('Consultation', consultationSchema);
const Survey = mongoose.model('Survey', surveySchema);

// Rutas API
app.post('/api/consultations', async (req, res) => {
    try {
        const consultation = new Consultation(req.body);
        await consultation.save();
        res.json({ success: true, data: consultation });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/surveys', async (req, res) => {
    try {
        const survey = new Survey(req.body);
        await survey.save();
        res.json({ success: true, data: survey });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/consultations', async (req, res) => {
    try {
        const consultations = await Consultation.find().sort({ timestamp: -1 });
        res.json({ success: true, data: consultations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/surveys', async (req, res) => {
    try {
        const surveys = await Survey.find().sort({ timestamp: -1 });
        res.json({ success: true, data: surveys });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
});
```

#### Instalación:
```bash
npm init -y
npm install express mongoose cors
node server.js
```

---

### 3. Firebase (Google) - Fácil y Sin Servidor

#### Configuración en `chatbot.js`:

```javascript
// Importar Firebase (agregar en index.html)
// <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Guardar consulta
submitToDatabase() {
    db.collection('consultations').add({
        ...this.context,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log('✅ Consulta guardada con ID:', docRef.id);
    })
    .catch((error) => {
        console.error('❌ Error:', error);
    });
}

// Guardar encuesta
submitSurveyToDatabase() {
    db.collection('surveys').add({
        sessionId: this.context.sessionId,
        name: this.context.name,
        satisfaction: this.context.satisfaction,
        comments: this.context.comments,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}
```

---

### 4. Supabase (PostgreSQL) - Open Source

```javascript
// Instalar: npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://tu-proyecto.supabase.co',
    'tu-anon-key'
)

// Guardar consulta
async submitToDatabase() {
    const { data, error } = await supabase
        .from('consultations')
        .insert([this.context])
    
    if (error) console.error('Error:', error)
    else console.log('✅ Guardado:', data)
}
```

---

### 5. EmailJS - Sin Backend

Para recibir consultas por email:

```html
<!-- En index.html -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("TU_PUBLIC_KEY");
</script>
```

```javascript
// En chatbot.js
submitToDatabase() {
    emailjs.send('service_id', 'template_id', {
        name: this.context.name,
        email: this.context.email,
        phone: this.context.phone,
        consultation: this.context.consultation
    })
    .then(() => console.log('✅ Email enviado'))
    .catch((error) => console.error('❌ Error:', error));
}
```

---

### 6. Google Sheets como Base de Datos

```javascript
// Usando Google Apps Script como API
const SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec';

submitToDatabase() {
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.context)
    })
    .then(() => console.log('✅ Guardado en Google Sheets'))
    .catch((error) => console.error('❌ Error:', error));
}
```

---

## 🔧 Cómo Activar el Backend Real

### En `chatbot.js`, busca las funciones:

1. **`submitToDatabase()`** - Línea ~250
2. **`submitSurveyToDatabase()`** - Línea ~280

### Descomenta el código dentro de los bloques:

```javascript
// Cambiar esto:
/*
fetch('/api/consultations', { ... })
*/

// Por esto:
fetch('/api/consultations', { ... })
```

---

## 📊 Tablas de Base de Datos Recomendadas

### Tabla: `consultations`
```sql
CREATE TABLE consultations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100),
    timestamp DATETIME,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    consultation TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    conversation_history JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `surveys`
```sql
CREATE TABLE surveys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100),
    timestamp DATETIME,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    satisfaction INT,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Recomendaciones

### Para Comenzar (Gratis):
1. ✅ **LocalStorage** (actual) - Para pruebas
2. ✅ **Firebase** - Fácil y escalable
3. ✅ **EmailJS** - Recibe todo por email

### Para Producción:
1. 🏆 **Supabase** - PostgreSQL + API automática
2. 🏆 **MongoDB Atlas** - NoSQL cloud
3. 🏆 **Backend propio** - Control total

---

## 📧 Notificaciones por Email

Agrega en `submitToDatabase()`:

```javascript
// Enviar notificación al equipo
fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        to: 'info@cer-energia.com',
        subject: `Nueva consulta de ${this.context.name}`,
        body: `
            Nueva consulta recibida:
            
            Nombre: ${this.context.name}
            Teléfono: ${this.context.phone}
            Email: ${this.context.email}
            Consulta: ${this.context.consultation}
        `
    })
});
```

---

## 🔐 Seguridad

### Validaciones Importantes:

1. **Rate Limiting** - Limitar consultas por IP
2. **Captcha** - Prevenir spam (reCAPTCHA)
3. **Sanitización** - Limpiar inputs maliciosos
4. **HTTPS** - Siempre usar SSL en producción
5. **CORS** - Configurar dominios permitidos

---

## 📱 Webhooks (Integraciones)

### Enviar a Slack:
```javascript
fetch('https://hooks.slack.com/services/YOUR/WEBHOOK/URL', {
    method: 'POST',
    body: JSON.stringify({
        text: `Nueva consulta de ${this.context.name}: ${this.context.consultation}`
    })
});
```

### Enviar a WhatsApp Business API:
```javascript
// Requiere cuenta de WhatsApp Business
```

---

**Última actualización**: 20 de Noviembre, 2025  
**Versión**: 2.0
