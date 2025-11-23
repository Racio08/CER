# 🚀 Cómo Ejecutar el Proyecto CER

## ⚡ Método Rápido (Recomendado)

### Windows
Simplemente **doble clic** en:
```
run.bat
```

### Linux / Mac
Abre la terminal en esta carpeta y ejecuta:
```bash
./run.sh
```
O también:
```bash
python3 run.py
```

---

## 📋 Métodos Alternativos

### Opción 1: Python (Todas las plataformas)

```bash
# Con Python 3 (recomendado)
python3 -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

### Opción 2: Node.js (si lo tienes instalado)

```bash
# Instalar http-server globalmente (solo la primera vez)
npm install -g http-server

# Ejecutar el servidor
http-server -p 8000

# Abrir: http://localhost:8000
```

### Opción 3: PHP (si lo tienes instalado)

```bash
php -S localhost:8000
```

### Opción 4: Abrir directamente el archivo

**Solo para pruebas rápidas** (algunas funcionalidades pueden no funcionar):
- Doble clic en `index.html`

⚠️ **Nota**: Algunas funcionalidades del chatbot y formularios pueden requerir un servidor HTTP local.

---

## 🌐 URLs Disponibles

Una vez iniciado el servidor:

- **Página Principal**: http://localhost:8000
- **Panel Administrativo**: http://localhost:8000/admin.html

---

## ❓ Solución de Problemas

### Puerto 8000 ocupado

Si el puerto 8000 ya está en uso, cambia el puerto:

**Python:**
```bash
python3 -m http.server 8080  # Usar puerto 8080
```

**run.sh (editar el archivo):**
```bash
PORT=8080  # Cambiar esta línea
```

**run.bat (editar el archivo):**
```batch
SET PORT=8080  REM Cambiar esta línea
```

### Python no instalado

1. Descarga Python desde: https://www.python.org/downloads/
2. Durante la instalación, marca "Add Python to PATH"
3. Reinicia la terminal y vuelve a intentar

---

## 🛑 Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

---

## 💡 Consejos

- **Usa siempre un servidor HTTP local** en lugar de abrir directamente el archivo HTML
- **El navegador se abrirá automáticamente** con los scripts proporcionados
- **Los cambios en el código** requieren recargar la página (F5) en el navegador
- **Para desarrollo**, considera usar Live Server en VS Code para recarga automática

---

## 📱 Acceso desde Otros Dispositivos

Para acceder desde tu móvil u otros dispositivos en la misma red:

1. Encuentra tu IP local:
   - **Windows**: `ipconfig` en CMD
   - **Linux/Mac**: `ifconfig` o `ip addr`

2. Inicia el servidor con:
   ```bash
   python3 -m http.server 8000 --bind 0.0.0.0
   ```

3. Accede desde otro dispositivo:
   ```
   http://TU_IP_LOCAL:8000
   ```
   Ejemplo: `http://192.168.1.100:8000`

---

## 🔥 Despliegue en Producción

Para deploy en la nube, consulta:
- [README.md](README.md) - Sección de Despliegue
- [DATABASE_INTEGRATION.md](DATABASE_INTEGRATION.md) - Integración con backend

Plataformas recomendadas:
- **GitHub Pages** (gratis)
- **Netlify** (gratis)
- **Vercel** (gratis)

---

¿Necesitas ayuda? Revisa el [README.md](README.md) completo.
