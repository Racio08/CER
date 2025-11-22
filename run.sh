#!/bin/bash
# Script para ejecutar el sitio web de CER en Linux/Mac
# Script to run the CER website on Linux/Mac

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Puerto por defecto
PORT=8000

echo "============================================================"
echo -e "${GREEN}  🌿 CER - Compañía de Energías Renovables${NC}"
echo "============================================================"
echo ""

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null
then
    echo -e "${RED}❌ Error: Python 3 no está instalado.${NC}"
    echo "   Por favor, instala Python 3 primero."
    echo "   Visita: https://www.python.org/downloads/"
    exit 1
fi

# Obtener el directorio del script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${GREEN}✅ Servidor iniciado en:${NC} http://localhost:$PORT"
echo -e "${BLUE}📁 Directorio:${NC} $SCRIPT_DIR"
echo ""
echo -e "${YELLOW}📝 Para detener el servidor, presiona Ctrl+C${NC}"
echo "============================================================"
echo ""

# Intentar abrir el navegador
sleep 1
BROWSER_OPENED=false
if command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:$PORT" &> /dev/null && BROWSER_OPENED=true
elif command -v open &> /dev/null; then
    open "http://localhost:$PORT" &> /dev/null && BROWSER_OPENED=true
fi

if [ "$BROWSER_OPENED" = true ]; then
    echo -e "${GREEN}🚀 Abriendo el navegador...${NC}"
else
    echo -e "${YELLOW}⚠️  No se pudo abrir el navegador automáticamente.${NC}"
    echo -e "   Por favor, abre manualmente: http://localhost:$PORT"
fi
echo ""
echo -e "${GREEN}🔥 Servidor ejecutándose. Visita:${NC} http://localhost:$PORT"
echo -e "   ${BLUE}Panel admin:${NC} http://localhost:$PORT/admin.html"
echo ""
echo -e "${YELLOW}⏸️  Presiona Ctrl+C para detener el servidor${NC}"
echo ""

# Iniciar el servidor HTTP
python3 -m http.server $PORT
