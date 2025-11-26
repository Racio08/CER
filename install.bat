@echo off
REM ============================================
REM SCRIPT DE INSTALACIÓN RÁPIDA - CER (Windows)
REM ============================================

echo ╔═══════════════════════════════════════════╗
echo ║  🌿 Instalación de CER CRM + ChatGPT     ║
echo ╚═══════════════════════════════════════════╝
echo.

REM Verificar Node.js
echo 📦 Verificando Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo    Descárgalo desde: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js instalado: %NODE_VERSION%
echo.

REM Instalar dependencias
echo 📦 Instalando dependencias...
call npm install

if errorlevel 1 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo ✅ Dependencias instaladas correctamente
echo.

REM Configurar .env
if not exist .env (
    echo 🔑 Configurando variables de entorno...
    copy .env.example .env
    echo ⚠️  IMPORTANTE: Edita el archivo .env y agrega tu API Key de OpenAI
    echo    1. Ve a: https://platform.openai.com/api-keys
    echo    2. Crea una API Key
    echo    3. Pégala en el archivo .env
    echo.
    echo    Para editar: notepad .env
    echo.
) else (
    echo ✅ Archivo .env ya existe
    echo.
)

echo ╔═══════════════════════════════════════════╗
echo ║  ✅ Instalación Completada                ║
echo ╠═══════════════════════════════════════════╣
echo ║  Próximos pasos:                          ║
echo ║  1. Edita .env con tu API Key            ║
echo ║  2. Ejecuta: npm start                    ║
echo ║  3. Abre: http://localhost:3000           ║
echo ╚═══════════════════════════════════════════╝
echo.

set /p OPEN_ENV="¿Deseas abrir el archivo .env ahora? (s/n): "
if /i "%OPEN_ENV%"=="s" (
    notepad .env
)

pause
