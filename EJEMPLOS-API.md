# 🔌 Ejemplos de Uso de la API - CER

Ejemplos prácticos para probar la API del sistema CER.

---

## 🧪 Probar con cURL

### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-26T10:30:00.000Z",
  "openai": true
}
```

---

### 2. Enviar Mensaje al Chatbot
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "¿Cuánto cuesta instalar paneles solares?",
    "conversationHistory": []
  }'
```

**Respuesta:**
```json
{
  "message": "¡Hola! El costo de instalación de paneles solares depende de varios factores:\n\n☀️ Para una instalación residencial promedio (5kW):\n- Costo: $XX.XXX - $XX.XXX\n- Retorno de inversión: 5-7 años\n- Reducción en factura: hasta 80%\n\n💚 Con SIMM Financiera podés pagarlo en cuotas flexibles.\n\n¿Te gustaría un presupuesto personalizado? ¿Cuál es tu nombre?",
  "usage": {
    "prompt_tokens": 450,
    "completion_tokens": 120,
    "total_tokens": 570
  }
}
```

---

### 3. Guardar un Lead
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "telefono": "+54 9 11 1234-5678",
    "email": "juan@example.com",
    "consulta": "Quiero instalar paneles solares en mi casa",
    "tipo_consulta": "presupuesto"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "leadId": 1,
  "message": "Lead guardado exitosamente"
}
```

---

### 4. Obtener Todos los Leads
```bash
curl http://localhost:3000/api/leads
```

**Respuesta:**
```json
{
  "leads": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "telefono": "+54 9 11 1234-5678",
      "email": "juan@example.com",
      "consulta": "Quiero instalar paneles solares en mi casa",
      "tipo_consulta": "presupuesto",
      "fecha_creacion": "2025-11-26T10:30:00.000Z",
      "estado": "nuevo",
      "notas": null
    }
  ]
}
```

---

### 5. Obtener un Lead Específico
```bash
curl http://localhost:3000/api/leads/1
```

**Respuesta:**
```json
{
  "lead": {
    "id": 1,
    "nombre": "Juan Pérez",
    "telefono": "+54 9 11 1234-5678",
    "email": "juan@example.com",
    "consulta": "Quiero instalar paneles solares en mi casa",
    "tipo_consulta": "presupuesto",
    "fecha_creacion": "2025-11-26T10:30:00.000Z",
    "estado": "nuevo",
    "notas": null
  }
}
```

---

### 6. Actualizar Estado de un Lead
```bash
curl -X PUT http://localhost:3000/api/leads/1 \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "contactado",
    "notas": "Cliente llamado, espera presupuesto por email"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Lead actualizado"
}
```

---

### 7. Guardar una Conversación
```bash
curl -X POST http://localhost:3000/api/conversaciones \
  -H "Content-Type: application/json" \
  -d '{
    "lead_id": 1,
    "mensaje": "¿Cuánto cuesta instalar paneles solares?",
    "rol": "user"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "conversacionId": 1
}
```

---

### 8. Obtener Conversaciones de un Lead
```bash
curl http://localhost:3000/api/conversaciones/1
```

**Respuesta:**
```json
{
  "conversaciones": [
    {
      "id": 1,
      "lead_id": 1,
      "mensaje": "¿Cuánto cuesta instalar paneles solares?",
      "rol": "user",
      "fecha": "2025-11-26T10:30:00.000Z"
    },
    {
      "id": 2,
      "lead_id": 1,
      "mensaje": "El costo promedio es...",
      "rol": "assistant",
      "fecha": "2025-11-26T10:30:05.000Z"
    }
  ]
}
```

---

### 9. Guardar una Encuesta
```bash
curl -X POST http://localhost:3000/api/encuestas \
  -H "Content-Type: application/json" \
  -d '{
    "lead_id": 1,
    "calificacion": 5,
    "comentario": "Excelente atención, muy profesionales"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "encuestaId": 1
}
```

---

### 10. Obtener Estadísticas
```bash
curl http://localhost:3000/api/estadisticas
```

**Respuesta:**
```json
{
  "totalLeads": 24,
  "leadsHoy": 3,
  "leadsSemana": 8,
  "promedioEncuestas": 4.5,
  "leadsPorTipo": [
    { "tipo_consulta": "presupuesto", "total": 12 },
    { "tipo_consulta": "instalacion", "total": 7 },
    { "tipo_consulta": "reparacion", "total": 3 },
    { "tipo_consulta": "informacion", "total": 2 }
  ],
  "leadsPorEstado": [
    { "estado": "nuevo", "total": 8 },
    { "estado": "contactado", "total": 10 },
    { "estado": "cerrado", "total": 5 },
    { "estado": "perdido", "total": 1 }
  ]
}
```

---

## 🧪 Probar con JavaScript (Fetch)

### En el Navegador o Node.js

```javascript
// 1. Enviar mensaje al chatbot
async function enviarMensaje(mensaje, historial = []) {
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: mensaje,
      conversationHistory: historial
    })
  });
  
  const data = await response.json();
  console.log('Respuesta del bot:', data.message);
  return data;
}

// Uso
await enviarMensaje('¿Cuánto cuesta instalar paneles solares?');
```

```javascript
// 2. Guardar un lead
async function guardarLead(nombre, telefono, email, consulta, tipo) {
  const response = await fetch('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      telefono,
      email,
      consulta,
      tipo_consulta: tipo
    })
  });
  
  const data = await response.json();
  console.log('Lead guardado:', data);
  return data;
}

// Uso
await guardarLead(
  'Juan Pérez',
  '+54 9 11 1234-5678',
  'juan@example.com',
  'Quiero presupuesto para mi casa',
  'presupuesto'
);
```

```javascript
// 3. Obtener todos los leads
async function obtenerLeads() {
  const response = await fetch('http://localhost:3000/api/leads');
  const data = await response.json();
  console.log('Leads:', data.leads);
  return data.leads;
}

// Uso
const leads = await obtenerLeads();
```

```javascript
// 4. Obtener estadísticas
async function obtenerEstadisticas() {
  const response = await fetch('http://localhost:3000/api/estadisticas');
  const stats = await response.json();
  console.log('Estadísticas:', stats);
  return stats;
}

// Uso
const stats = await obtenerEstadisticas();
console.log(`Total de leads: ${stats.totalLeads}`);
console.log(`Leads hoy: ${stats.leadsHoy}`);
```

---

## 🧪 Probar con Postman

### Colección de Postman

Importa esta colección en Postman:

```json
{
  "info": {
    "name": "CER API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "health"]
        }
      }
    },
    {
      "name": "Chat con ChatGPT",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"message\": \"¿Cuánto cuesta instalar paneles solares?\",\n  \"conversationHistory\": []\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/chat",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "chat"]
        }
      }
    },
    {
      "name": "Crear Lead",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"nombre\": \"Juan Pérez\",\n  \"telefono\": \"+54 9 11 1234-5678\",\n  \"email\": \"juan@example.com\",\n  \"consulta\": \"Quiero instalar paneles solares\",\n  \"tipo_consulta\": \"presupuesto\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/leads",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "leads"]
        }
      }
    },
    {
      "name": "Obtener Leads",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/leads",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "leads"]
        }
      }
    },
    {
      "name": "Estadísticas",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/estadisticas",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "estadisticas"]
        }
      }
    }
  ]
}
```

---

## 🧪 Probar con Python

```python
import requests
import json

BASE_URL = "http://localhost:3000/api"

# 1. Enviar mensaje al chatbot
def enviar_mensaje(mensaje, historial=[]):
    response = requests.post(
        f"{BASE_URL}/chat",
        json={
            "message": mensaje,
            "conversationHistory": historial
        }
    )
    return response.json()

# 2. Guardar lead
def guardar_lead(nombre, telefono, email, consulta, tipo):
    response = requests.post(
        f"{BASE_URL}/leads",
        json={
            "nombre": nombre,
            "telefono": telefono,
            "email": email,
            "consulta": consulta,
            "tipo_consulta": tipo
        }
    )
    return response.json()

# 3. Obtener todos los leads
def obtener_leads():
    response = requests.get(f"{BASE_URL}/leads")
    return response.json()

# 4. Obtener estadísticas
def obtener_estadisticas():
    response = requests.get(f"{BASE_URL}/estadisticas")
    return response.json()

# Uso
if __name__ == "__main__":
    # Chatear con el bot
    respuesta = enviar_mensaje("¿Cuánto cuesta instalar paneles solares?")
    print(f"Bot: {respuesta['message']}")
    
    # Guardar un lead
    lead = guardar_lead(
        "Juan Pérez",
        "+54 9 11 1234-5678",
        "juan@example.com",
        "Quiero instalar paneles solares",
        "presupuesto"
    )
    print(f"Lead guardado con ID: {lead['leadId']}")
    
    # Ver estadísticas
    stats = obtener_estadisticas()
    print(f"Total de leads: {stats['totalLeads']}")
    print(f"Leads hoy: {stats['leadsHoy']}")
```

---

## 🧪 Script de Prueba Completo

Guarda esto como `test-api.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:3000/api"

echo "🧪 Probando API de CER..."
echo ""

# 1. Health Check
echo "1️⃣ Health Check..."
curl -s $API_URL/health | jq
echo ""

# 2. Crear un lead de prueba
echo "2️⃣ Creando lead de prueba..."
LEAD_RESPONSE=$(curl -s -X POST $API_URL/leads \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "telefono": "+54 11 0000-0000",
    "email": "test@example.com",
    "consulta": "Consulta de prueba",
    "tipo_consulta": "informacion"
  }')
echo $LEAD_RESPONSE | jq
LEAD_ID=$(echo $LEAD_RESPONSE | jq -r '.leadId')
echo "Lead ID: $LEAD_ID"
echo ""

# 3. Chat con el bot
echo "3️⃣ Chateando con el bot..."
curl -s -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hola, ¿cuánto cuesta instalar paneles solares?",
    "conversationHistory": []
  }' | jq '.message'
echo ""

# 4. Obtener estadísticas
echo "4️⃣ Obteniendo estadísticas..."
curl -s $API_URL/estadisticas | jq
echo ""

echo "✅ Pruebas completadas!"
```

Ejecutar:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## 📊 Respuestas de Error

### Error 400 - Bad Request
```json
{
  "error": "Mensaje requerido"
}
```

### Error 404 - Not Found
```json
{
  "error": "Lead no encontrado"
}
```

### Error 500 - Server Error
```json
{
  "error": "Error al procesar el mensaje",
  "details": "OpenAI API error: insufficient_quota"
}
```

---

## 🎯 Casos de Uso Prácticos

### Integrar con WhatsApp Business

```javascript
// Webhook de WhatsApp
app.post('/webhook/whatsapp', async (req, res) => {
  const mensaje = req.body.message.text;
  const telefono = req.body.from;
  
  // Enviar a ChatGPT
  const respuesta = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: mensaje, conversationHistory: [] })
  });
  
  const data = await respuesta.json();
  
  // Responder por WhatsApp
  await enviarWhatsApp(telefono, data.message);
  
  res.json({ success: true });
});
```

### Dashboard en React

```jsx
import { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/estadisticas')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);
  
  return (
    <div>
      <h1>Dashboard CER</h1>
      {stats && (
        <>
          <p>Total de leads: {stats.totalLeads}</p>
          <p>Leads hoy: {stats.leadsHoy}</p>
          <p>Satisfacción: {stats.promedioEncuestas} ⭐</p>
        </>
      )}
    </div>
  );
}
```

---

**¡Listo para probar la API! 🚀**
