# 📸 Instrucciones para Agregar la Foto de la Gerente General

## Paso 1: Guardar la Imagen

Guarda la foto de la Gerente General con el nombre:
```
gerente-general.jpg
```

En la ruta:
```
/workspaces/CER/assets/images/gerente-general.jpg
```

## Paso 2: Especificaciones de la Imagen

### Dimensiones Recomendadas:
- **Ancho**: 800-1200px
- **Alto**: 800-1200px (proporción cuadrada o vertical)
- **Formato**: JPG o PNG
- **Tamaño**: Máximo 500KB (optimizar con TinyPNG)

### Características:
- ✅ Fondo profesional o neutro
- ✅ Buena iluminación
- ✅ Foto formal/profesional
- ✅ Rostro claramente visible

## Paso 3: Cómo Agregar la Imagen

### Opción A: Copiar Directamente
```bash
cp /ruta/de/tu/imagen.jpg /workspaces/CER/assets/images/gerente-general.jpg
```

### Opción B: Subir por Interfaz
1. Abre la carpeta `assets/images/`
2. Arrastra y suelta la imagen
3. Renombra a `gerente-general.jpg`

## Paso 4: Verificar

Abre el navegador en:
```
http://localhost:8000
```

Ve a la sección "Nosotros" y verifica que la imagen se muestre correctamente.

## 🎨 Personalización del Mensaje

Si quieres cambiar el texto del mensaje de la Gerente General, edita en `index.html`:

```html
<p class="ceo-text">
    "Tu mensaje personalizado aquí..."
</p>
```

También puedes cambiar:
- El nombre: `<h3>María Alejandra Rodríguez</h3>`
- El título: `<p>Gerente General | CER</p>`
- Las credenciales en la sección `.ceo-credentials`

---

**Nota**: La imagen ya está referenciada en el código. Solo necesitas colocar el archivo en la ubicación correcta.
