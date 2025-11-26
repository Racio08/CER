// ============================================
// CER - SERVIDOR BACKEND CON CRM Y OPENAI
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Servir archivos estáticos

// ============================================
// CONFIGURACIÓN DE OPENAI (OpenRouter)
// ============================================

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1'
});

// ============================================
// CONFIGURACIÓN DE BASE DE DATOS
// ============================================

const db = new sqlite3.Database('./cer_crm.db', (err) => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:', err);
    } else {
        console.log('✅ Base de datos conectada');
        initDatabase();
    }
});

// Inicializar tablas
function initDatabase() {
    // Tabla de clientes/leads
    db.run(`
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            telefono TEXT,
            email TEXT,
            consulta TEXT,
            tipo_consulta TEXT,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            estado TEXT DEFAULT 'nuevo',
            notas TEXT
        )
    `, (err) => {
        if (err) console.error('Error creando tabla leads:', err);
        else console.log('✅ Tabla leads lista');
    });

    // Tabla de conversaciones
    db.run(`
        CREATE TABLE IF NOT EXISTS conversaciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lead_id INTEGER,
            mensaje TEXT NOT NULL,
            rol TEXT NOT NULL,
            fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads (id)
        )
    `, (err) => {
        if (err) console.error('Error creando tabla conversaciones:', err);
        else console.log('✅ Tabla conversaciones lista');
    });

    // Tabla de encuestas
    db.run(`
        CREATE TABLE IF NOT EXISTS encuestas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lead_id INTEGER,
            calificacion INTEGER NOT NULL,
            comentario TEXT,
            fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads (id)
        )
    `, (err) => {
        if (err) console.error('Error creando tabla encuestas:', err);
        else console.log('✅ Tabla encuestas lista');
    });
}

// ============================================
// PROMPT DEL SISTEMA PARA CHATGPT
// ============================================

const SYSTEM_PROMPT = `Sos LUCAS, el asesor comercial estrella de CER (Compañía de Energías Renovables). 
Tu misión es guiar al cliente desde la primera pregunta hasta el cierre de venta y más allá.

🎯 TU PERSONALIDAD:
- Conversacional y cercano (usás "vos" y "che", hablás como argentino)
- Entusiasta pero nunca insistente
- Escuchás activamente y respondés con empatía
- Manejás objeciones con confianza y datos reales
- Te enfocás en los BENEFICIOS para el cliente, no solo en características
- Siempre buscás cerrar la venta sutilmente

📋 TU PROCESO DE VENTA COMPLETO:

1️⃣ PREVENTA (Educar y Calificar):
   - Entendé la necesidad real del cliente
   - Educá sobre energía renovable y sus beneficios
   - Calificá: ¿Es un lead caliente? ¿Tiene urgencia?
   - Preguntá: ubicación, consumo actual, presupuesto estimado

2️⃣ PRESENTACIÓN (Mostrar Valor):
   - Mostrá casos de éxito similares (proyectos en Patagonia)
   - Hablá de números: ahorro del 75-80% en factura de luz
   - Mencioná retorno de inversión: 5-7 años
   - Destacá: financiación con SIMM Financiera

3️⃣ MANEJO DE OBJECIONES:
   - "Es muy caro" → Retorno de inversión + financiación flexible
   - "No sé si funciona en mi zona" → Proyectos en Tierra del Fuego (clima extremo)
   - "¿Y si se rompe?" → Garantía + mantenimiento incluido
   - "Lo voy a pensar" → Ofrecé presupuesto sin compromiso + incentivo

4️⃣ CIERRE DE VENTA:
   - Usá cierres suaves: "¿Te parece que agendemos una visita técnica?"
   - Ofrecé beneficios por decidir hoy: "Este mes tenemos promoción"
   - Pedí datos de contacto para seguimiento
   - Confirmá próximos pasos claros

5️⃣ POSTVENTA:
   - Garantía de equipos e instalación
   - Mantenimiento preventivo anual
   - Monitoreo remoto 24/7
   - Soporte técnico permanente

💼 INFORMACIÓN DE CER:

📊 EMPRESA:
- 8 años de experiencia (fundada 2017)
- Filial de SIMM Holding España (respaldo internacional)
- Clientes TOP: Vestas, Genneia, Siemens, EAS Argentina
- +12 aerogeneradores montados
- 1,200+ hogares abastecidos
- 2,500+ toneladas de CO₂ evitadas

🔧 SERVICIOS COMPLETOS:

1. AEROGENERADORES (Energía Eólica):
   - Montaje de parques eólicos completos
   - Proyectos con Vestas (líder mundial)
   - Zonas: Olavarría, La Rioja, Tierra del Fuego, Bahía Blanca
   - Ideal para: Industrias, grandes consumidores

2. PANELES SOLARES (Energía Fotovoltaica):
   - Residencial: casas, departamentos
   - PyMEs: comercios, oficinas, talleres
   - Rural: estancias, campos alejados
   - Industrial: fábricas, depósitos
   - Proyecto destacado: Parque fotovoltaico Mendoza

3. MANTENIMIENTO & MONITOREO:
   - Preventivo: revisión anual incluida
   - Correctivo: reparaciones rápidas
   - Monitoreo remoto 24/7 en tiempo real
   - Respuesta ante fallas en menos de 48hs

💰 FINANCIACIÓN CON SIMM FINANCIERA:
- Planes a medida según tu capacidad de pago
- Tasas preferenciales (mejores que bancos)
- Aprobación rápida: 48-72 horas
- Sin trámites complicados
- Cuotas fijas en pesos
- Tu instalación se paga sola con el ahorro

✨ BENEFICIOS REALES:
- Ahorrá 75-80% en tu factura de luz
- Retorno de inversión garantizado en 5-7 años
- Valor de tu propiedad aumenta 15-20%
- Independencia energética
- Contribuís al medio ambiente
- Certificaciones ISO 14001 y 45001

📍 COBERTURA:
- Patagonia completa (especialidad)
- Buenos Aires: Bahía Blanca, Olavarría
- La Rioja, Mendoza
- Tierra del Fuego (llegamos a zonas extremas)
- ¡Preguntá por tu zona!

⏱️ TIEMPOS:
- Visita técnica: 7-10 días
- Presupuesto: 24-48 horas
- Instalación residencial: 2-5 días
- Instalación industrial: 2-4 semanas

📞 CONTACTO DIRECTO:
- Teléfono: +54 1156 681-718
- WhatsApp: +54 9 1132 952-755 (¡Escribinos ya!)
- Email: info@cer-energia.com
- Dirección: Av. San Martín 1234, Río Gallegos
- Horario: Lun-Vie 9-18hs, Sáb 9-13hs

🎯 TUS OBJETIVOS EN CADA CONVERSACIÓN:
1. Entender la necesidad del cliente
2. Educar sobre beneficios tangibles
3. Mostrar casos de éxito relevantes
4. Manejar objeciones con datos reales
5. Pedir datos de contacto (nombre, teléfono, email)
6. Cerrar con un próximo paso claro
7. Dejar al cliente entusiasmado

💬 ESTILO DE COMUNICACIÓN:
- Mensajes cortos y directos (máx 4-5 líneas)
- Usá emojis con moderación
- Hacé preguntas abiertas para entender mejor
- Personalizá según la situación del cliente
- Sé natural, no suenes como un robot
- Si no sabés algo, sé honesto y ofrecé conectarlo con un especialista

RECORDÁ: Sos un vendedor consultivo. Primero entendé, después ofrecé la solución perfecta.`;

// ============================================
// RUTAS API
// ============================================

// Chat con OpenAI
app.post('/api/chat', async (req, res) => {
    console.log('📩 Petición recibida en /api/chat');
    try {
        const { message, conversationHistory = [] } = req.body;
        console.log('💬 Mensaje del usuario:', message);

        if (!message) {
            console.log('❌ No se recibió mensaje');
            return res.status(400).json({ error: 'Mensaje requerido' });
        }

        // Construir historial de mensajes
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            { role: 'user', content: message }
        ];
        
        console.log('📝 Total de mensajes en el historial:', messages.length);
        console.log('🤖 Llamando a OpenRouter...');

        // Llamar a la API de OpenAI (OpenRouter)
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'openai/gpt-3.5-turbo',
            messages: messages,
            temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
            max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 800
        });

        const assistantMessage = completion.choices[0].message.content;

        console.log('✅ Respuesta de LUCAS generada correctamente');

        res.json({
            message: assistantMessage,
            usage: completion.usage
        });

    } catch (error) {
        console.error('❌ Error en chat:', error.message);
        console.error('Detalles completos:', error);
        res.status(500).json({ 
            error: 'Error al procesar el mensaje',
            details: error.message 
        });
    }
});

// Guardar lead en CRM
app.post('/api/leads', (req, res) => {
    const { nombre, telefono, email, consulta, tipo_consulta } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'Nombre requerido' });
    }

    const query = `
        INSERT INTO leads (nombre, telefono, email, consulta, tipo_consulta)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [nombre, telefono, email, consulta, tipo_consulta], function(err) {
        if (err) {
            console.error('❌ Error al guardar lead:', err);
            return res.status(500).json({ error: 'Error al guardar lead' });
        }

        console.log(`✅ Lead guardado: ${nombre} (ID: ${this.lastID})`);
        res.json({ 
            success: true, 
            leadId: this.lastID,
            message: 'Lead guardado exitosamente'
        });
    });
});

// Obtener todos los leads
app.get('/api/leads', (req, res) => {
    const query = `
        SELECT * FROM leads 
        ORDER BY fecha_creacion DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('❌ Error al obtener leads:', err);
            return res.status(500).json({ error: 'Error al obtener leads' });
        }

        res.json({ leads: rows });
    });
});

// Obtener un lead por ID
app.get('/api/leads/:id', (req, res) => {
    const query = `SELECT * FROM leads WHERE id = ?`;

    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            console.error('❌ Error al obtener lead:', err);
            return res.status(500).json({ error: 'Error al obtener lead' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Lead no encontrado' });
        }

        res.json({ lead: row });
    });
});

// Actualizar estado de lead
app.put('/api/leads/:id', (req, res) => {
    const { estado, notas } = req.body;
    const query = `
        UPDATE leads 
        SET estado = ?, notas = ?
        WHERE id = ?
    `;

    db.run(query, [estado, notas, req.params.id], function(err) {
        if (err) {
            console.error('❌ Error al actualizar lead:', err);
            return res.status(500).json({ error: 'Error al actualizar lead' });
        }

        res.json({ success: true, message: 'Lead actualizado' });
    });
});

// Guardar conversación
app.post('/api/conversaciones', (req, res) => {
    const { lead_id, mensaje, rol } = req.body;

    const query = `
        INSERT INTO conversaciones (lead_id, mensaje, rol)
        VALUES (?, ?, ?)
    `;

    db.run(query, [lead_id, mensaje, rol], function(err) {
        if (err) {
            console.error('❌ Error al guardar conversación:', err);
            return res.status(500).json({ error: 'Error al guardar conversación' });
        }

        res.json({ success: true, conversacionId: this.lastID });
    });
});

// Obtener conversaciones de un lead
app.get('/api/conversaciones/:leadId', (req, res) => {
    const query = `
        SELECT * FROM conversaciones 
        WHERE lead_id = ? 
        ORDER BY fecha ASC
    `;

    db.all(query, [req.params.leadId], (err, rows) => {
        if (err) {
            console.error('❌ Error al obtener conversaciones:', err);
            return res.status(500).json({ error: 'Error al obtener conversaciones' });
        }

        res.json({ conversaciones: rows });
    });
});

// Guardar encuesta
app.post('/api/encuestas', (req, res) => {
    const { lead_id, calificacion, comentario } = req.body;

    if (!calificacion || calificacion < 1 || calificacion > 5) {
        return res.status(400).json({ error: 'Calificación inválida (1-5)' });
    }

    const query = `
        INSERT INTO encuestas (lead_id, calificacion, comentario)
        VALUES (?, ?, ?)
    `;

    db.run(query, [lead_id, calificacion, comentario], function(err) {
        if (err) {
            console.error('❌ Error al guardar encuesta:', err);
            return res.status(500).json({ error: 'Error al guardar encuesta' });
        }

        res.json({ success: true, encuestaId: this.lastID });
    });
});

// Obtener estadísticas del CRM
app.get('/api/estadisticas', (req, res) => {
    const queries = {
        totalLeads: `SELECT COUNT(*) as total FROM leads`,
        leadsHoy: `SELECT COUNT(*) as total FROM leads WHERE DATE(fecha_creacion) = DATE('now')`,
        leadsSemana: `SELECT COUNT(*) as total FROM leads WHERE DATE(fecha_creacion) >= DATE('now', '-7 days')`,
        promedioEncuestas: `SELECT AVG(calificacion) as promedio FROM encuestas`,
        leadsPorTipo: `SELECT tipo_consulta, COUNT(*) as total FROM leads GROUP BY tipo_consulta`,
        leadsPorEstado: `SELECT estado, COUNT(*) as total FROM leads GROUP BY estado`
    };

    const stats = {};

    db.get(queries.totalLeads, [], (err, row) => {
        stats.totalLeads = row?.total || 0;

        db.get(queries.leadsHoy, [], (err, row) => {
            stats.leadsHoy = row?.total || 0;

            db.get(queries.leadsSemana, [], (err, row) => {
                stats.leadsSemana = row?.total || 0;

                db.get(queries.promedioEncuestas, [], (err, row) => {
                    stats.promedioEncuestas = row?.promedio || 0;

                    db.all(queries.leadsPorTipo, [], (err, rows) => {
                        stats.leadsPorTipo = rows || [];

                        db.all(queries.leadsPorEstado, [], (err, rows) => {
                            stats.leadsPorEstado = rows || [];
                            res.json(stats);
                        });
                    });
                });
            });
        });
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        openai: !!process.env.OPENAI_API_KEY 
    });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║  🌿 CER - SERVIDOR BACKEND ACTIVO         ║
╠═══════════════════════════════════════════╣
║  🚀 Puerto: ${PORT}                        ║
║  🤖 OpenAI: ${process.env.OPENAI_API_KEY ? '✅ Configurado' : '❌ No configurado'}        ║
║  💾 Base de datos: SQLite                 ║
╚═══════════════════════════════════════════╝
    `);
    console.log(`📱 Accede en: http://localhost:${PORT}`);
});

// Manejo de cierre
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err);
        } else {
            console.log('✅ Base de datos cerrada');
        }
        process.exit(0);
    });
});
