// Test de la API de OpenRouter
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1'
});

async function testAPI() {
    try {
        console.log('🧪 Probando conexión con OpenRouter...');
        console.log('API Key:', process.env.OPENAI_API_KEY?.substring(0, 20) + '...');
        console.log('Modelo:', process.env.OPENAI_MODEL);
        
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'openai/gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Eres Lucas, un asesor comercial amigable.' },
                { role: 'user', content: 'Hola' }
            ],
            max_tokens: 100
        });

        console.log('\n✅ Respuesta exitosa:');
        console.log(completion.choices[0].message.content);
        console.log('\n📊 Uso:', completion.usage);
        
    } catch (error) {
        console.error('\n❌ Error detallado:');
        console.error('Mensaje:', error.message);
        console.error('Status:', error.status);
        console.error('Tipo:', error.type);
        if (error.response) {
            console.error('Respuesta:', error.response.data);
        }
    }
}

testAPI();
