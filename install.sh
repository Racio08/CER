#!/bin/bash

# ============================================
# SCRIPT DE INSTALACIÓN RÁPIDA - CER
# ============================================

echo "╔═══════════════════════════════════════════╗"
echo "║  🌿 Instalación de CER CRM + ChatGPT     ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Verificar Node.js
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "   Descárgalo desde: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js instalado: $NODE_VERSION"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente"
echo ""

# Configurar .env
if [ ! -f .env ]; then
    echo "🔑 Configurando variables de entorno..."
    cp .env.example .env
    echo "⚠️  IMPORTANTE: Edita el archivo .env y agrega tu API Key de OpenAI"
    echo "   1. Ve a: https://platform.openai.com/api-keys"
    echo "   2. Crea una API Key"
    echo "   3. Pégala en el archivo .env"
    echo ""
    echo "   Para editar: nano .env"
    echo ""
else
    echo "✅ Archivo .env ya existe"
    echo ""
fi

# Verificar API Key
if grep -q "tu_api_key_aqui" .env; then
    echo "⚠️  RECUERDA: Debes configurar tu API Key en .env antes de iniciar"
    echo ""
fi

echo "╔═══════════════════════════════════════════╗"
echo "║  ✅ Instalación Completada                ║"
echo "╠═══════════════════════════════════════════╣"
echo "║  Próximos pasos:                          ║"
echo "║  1. Edita .env con tu API Key            ║"
echo "║  2. Ejecuta: npm start                    ║"
echo "║  3. Abre: http://localhost:3000           ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

read -p "¿Deseas abrir el archivo .env ahora? (s/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    nano .env
fi
