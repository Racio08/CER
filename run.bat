@echo off
REM Script para ejecutar el sitio web de CER en Windows
REM Script to run the CER website on Windows

title CER - Compañía de Energías Renovables

SET PORT=8000

echo ============================================================
echo   [32m[1mCER - Compañía de Energías Renovables[0m
echo ============================================================
echo.

REM Verificar si Python esta instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [31mError: Python no esta instalado.[0m
    echo Por favor, instala Python primero.
    echo Visita: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [32mServidor iniciado en:[0m http://localhost:%PORT%
echo [34mDirectorio:[0m %CD%
echo.
echo [33mPara detener el servidor, presiona Ctrl+C[0m
echo ============================================================
echo.

REM Abrir el navegador automaticamente
timeout /t 2 /nobreak >nul
start http://localhost:%PORT%

echo [32mAbriendo el navegador...[0m
echo.
echo [32mServidor ejecutandose. Visita:[0m http://localhost:%PORT%
echo    [34mPanel admin:[0m http://localhost:%PORT%/admin.html
echo.
echo [33mPresiona Ctrl+C para detener el servidor[0m
echo.

REM Iniciar el servidor HTTP
python -m http.server %PORT%
