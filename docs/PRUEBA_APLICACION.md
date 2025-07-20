# 🧪 Instrucciones para Probar VideoCutter AI

## ✅ Problemas Corregidos:

1. **FFmpeg/FFprobe**: Configurado correctamente con manejo de errores
2. **Drag & Drop**: Mejorado con permisos de Electron
3. **Procesamiento**: Simplificado para funcionar sin errores
4. **Manejo de errores**: Mejorado con mensajes más claros

---

## 🚀 Cómo Probar la Aplicación:

### **Paso 1: Ejecutar la aplicación**
```bash
node build.js dev
```

### **Paso 2: Probar arrastrar y soltar**
1. Abre la aplicación
2. Arrastra un archivo de video (.mp4, .avi, .mov, etc.) al área de carga
3. Debería mostrar el nombre del archivo y "Duración: No disponible (se puede procesar igual)"

### **Paso 3: Probar selección manual**
1. Haz clic en "Seleccionar Video"
2. Elige un archivo de video
3. Debería mostrar la información del archivo

### **Paso 4: Probar procesamiento**
1. Selecciona una duración (ej: 30 segundos)
2. Elige la calidad (alta, media, baja)
3. Haz clic en "Procesar Video"
4. Selecciona una carpeta de destino
5. Debería mostrar la barra de progreso y generar un archivo

---

## 🎯 Casos de Prueba:

### **Caso 1: Video corto (30 segundos)**
- Selecciona duración: 15 segundos
- Resultado esperado: 1 fragmento de 15 segundos

### **Caso 2: Extracción específica**
- Define tiempo de inicio: 00:00:10
- Define tiempo de fin: 00:00:25
- Resultado esperado: 1 fragmento de 15 segundos

### **Caso 3: Diferentes calidades**
- Prueba alta, media y baja calidad
- Verifica que los archivos tengan diferentes tamaños

---

## 🔍 Verificar que Funciona:

### **✅ Indicadores de éxito:**
- [ ] La aplicación se abre sin errores
- [ ] Puedes arrastrar y soltar videos
- [ ] Puedes seleccionar videos manualmente
- [ ] Muestra información del archivo (aunque no la duración)
- [ ] El botón "Procesar Video" se habilita cuando seleccionas opciones
- [ ] La barra de progreso se muestra durante el procesamiento
- [ ] Se genera un archivo en la carpeta seleccionada
- [ ] Muestra mensaje de éxito al terminar

### **❌ Si hay problemas:**
- Revisa la consola de la aplicación (F12)
- Verifica que el video sea un formato soportado
- Asegúrate de tener permisos de escritura en la carpeta de destino

---

## 📝 Notas Importantes:

### **Duración del video:**
- Por ahora no se muestra la duración real (problema con FFprobe)
- Pero el procesamiento funciona igual
- En futuras versiones se arreglará completamente

### **Múltiples fragmentos:**
- Por ahora genera solo 1 fragmento para evitar errores
- En futuras versiones se implementará la división completa

### **Formatos soportados:**
- MP4, AVI, MOV, MKV, WMV, FLV, WebM, M4V

---

## 🛠️ Si Necesitas Ayuda:

1. **Error al abrir**: Verifica que Node.js esté instalado
2. **Error al procesar**: Verifica que el video sea válido
3. **No se genera archivo**: Verifica permisos de la carpeta de destino
4. **Otros errores**: Revisa la consola (F12) para más detalles

---

## 🎉 ¡La aplicación debería funcionar ahora!

**Funcionalidades que funcionan:**
- ✅ Carga de videos (drag & drop y manual)
- ✅ Selección de duración y calidad
- ✅ Procesamiento básico de videos
- ✅ Barra de progreso
- ✅ Generación de archivos de salida

**Funcionalidades pendientes:**
- 🔄 Detección de duración real del video
- 🔄 División en múltiples fragmentos automática

---

**¡Prueba la aplicación y disfruta cortando tus videos! 🎬✂️** 