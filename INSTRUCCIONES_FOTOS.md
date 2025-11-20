# 📸 Instrucciones para Copiar las Fotos del Equipo Directivo

## 🎯 Objetivo
Copiar las 4 fotos del equipo desde tu PC Windows al proyecto en el contenedor Ubuntu.

---

## 📂 Ubicaciones

**Origen (Windows):**
```
C:\Users\RAFAEL RUBIANO\OneDrive\Desktop\fotos\
```

**Destino (Contenedor Ubuntu):**
```
/workspaces/CER/assets/images/
```

---

## ✅ MÉTODO RECOMENDADO: Arrastrar y Soltar en VS Code

**Es la forma más fácil y rápida:**

1. **Abre el Explorador de Archivos de Windows**
   - Ve a: `C:\Users\RAFAEL RUBIANO\OneDrive\Desktop\fotos\`

2. **Selecciona las 4 fotos:**
   - `miriam.jpeg`
   - `priscila.jpeg`
   - `milu.jpeg`
   - `fran.jpeg`

3. **Arrastra las 4 fotos a VS Code:**
   - En VS Code, abre la carpeta `assets/images/` en el explorador lateral
   - Arrastra las fotos desde el Explorador de Windows
   - Suéltalas sobre la carpeta `assets/images/`

4. **Renombra cada archivo** (clic derecho → Renombrar):
   - `miriam.jpeg` → `miriam-gerente-general.jpg`
   - `priscila.jpeg` → `priscila-gerente-comercial.jpg`
   - `milu.jpeg` → `milu-gerente-tecnica.jpg`
   - `fran.jpeg` → `fran-gerente-logistica.jpg`

---

## 🔍 Verificar que se Copiaron Correctamente

Ejecuta en la **terminal de VS Code**:

```bash
ls -lh /workspaces/CER/assets/images/*.jpg
```

Deberías ver algo como:
```
-rw-r--r-- 1 node node 245K Jan 10 10:30 fran-gerente-logistica.jpg
-rw-r--r-- 1 node node 198K Jan 10 10:30 milu-gerente-tecnica.jpg
-rw-r--r-- 1 node node 312K Jan 10 10:30 miriam-gerente-general.jpg
-rw-r--r-- 1 node node 267K Jan 10 10:30 priscila-gerente-comercial.jpg
```

---

## 🌐 Ver el Resultado Final

1. **Recarga la página del navegador:**
   ```
   http://localhost:8000
   ```

2. **Ve a la sección "Nosotros"** (scroll hacia abajo)

3. **¡Verás el equipo directivo completo con sus fotos y comentarios!** 🎉

---

## 🆘 Métodos Alternativos (si arrastrar no funciona)

### Opción A: Usar PowerShell

```powershell
Copy-Item "C:\Users\RAFAEL RUBIANO\OneDrive\Desktop\fotos\miriam.jpeg" -Destination "\\wsl$\Ubuntu\workspaces\CER\assets\images\miriam-gerente-general.jpg"
Copy-Item "C:\Users\RAFAEL RUBIANO\OneDrive\Desktop\fotos\priscila.jpeg" -Destination "\\wsl$\Ubuntu\workspaces\CER\assets\images\priscila-gerente-comercial.jpg"
Copy-Item "C:\Users\RAFAEL RUBIANO\OneDrive\Desktop\fotos\milu.jpeg" -Destination "\\wsl$\Ubuntu\workspaces\CER\assets\images\milu-gerente-tecnica.jpg"
Copy-Item "C:\Users\RAFAEL RUBIANO\OneDrive\Desktop\fotos\fran.jpeg" -Destination "\\wsl$\Ubuntu\workspaces\CER\assets\images\fran-gerente-logistica.jpg"
```

### Opción B: Copiar desde Explorador de Windows

1. Abre: `\\wsl$\Ubuntu\workspaces\CER\assets\images\`
2. Copia las 4 fotos desde `C:\Users\RAFAEL RUBIANO\OneDrive\Desktop\fotos\`
3. Pega en la carpeta del proyecto
4. Renombra como se indica arriba

---

## ✨ Características del Equipo Directivo

Cada ejecutivo tiene:
- ✅ **Foto profesional**
- ✅ **Nombre y cargo**
- ✅ **Comentario personal sobre CER**
- ✅ **Especialización destacada**
- ✅ **Badge con icono según su rol**

**Roles:**
- 👑 **Miriam**: Gerente General (badge verde)
- 🤝 **Priscila**: Gerente Comercial (badge azul)
- ⚙️ **Milu**: Gerente Técnica (badge morado)
- 🚚 **Fran**: Gerente de Logística (badge naranja)
