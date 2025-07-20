# 🎬 VideoCutter AI - Instrucciones de Uso

## ¡Tu aplicación está lista! 🚀

### 📋 Lo que hemos creado:

✅ **Aplicación completa de escritorio** para cortar videos  
✅ **Interfaz súper amigable** con diseño moderno  
✅ **Soporte para múltiples formatos** (MP4, AVI, MOV, MKV, etc.)  
✅ **Barra de progreso** en tiempo real  
✅ **Configuración de calidad** (alta, media, baja)  
✅ **Cortes rápidos** (15s, 30s, 45s, 1 minuto)  
✅ **Duración personalizada** y extracción específica  

---

## 🚀 Cómo usar la aplicación:

### **Opción 1: Probar la aplicación (desarrollo)**
```bash
node build.js dev
```
Esto abrirá la aplicación para que puedas probarla inmediatamente.

### **Opción 2: Crear instalador para Windows**
```bash
node build.js win
```
Esto creará un archivo `.exe` en la carpeta `dist/` que puedes instalar en cualquier computadora Windows.

### **Opción 3: Crear instalador para Mac**
```bash
node build.js mac
```
Esto creará un archivo `.dmg` para macOS.

---

## 🎯 Cómo funciona la aplicación:

### **Paso 1: Cargar video**
- Arrastra tu video al área de carga, o
- Haz clic en "Seleccionar Video"

### **Paso 2: Elegir cómo cortar**
- **Botones rápidos**: 15s, 30s, 45s, 1 minuto
- **Duración personalizada**: Escribe cualquier duración
- **Extracción específica**: Define tiempo de inicio y fin

### **Paso 3: Configurar calidad**
- **Alta**: Mejor calidad, archivo más grande
- **Media**: Balance perfecto (recomendado)
- **Baja**: Archivo más pequeño

### **Paso 4: Procesar**
- Haz clic en "Procesar Video"
- Selecciona dónde guardar
- ¡Espera a que termine!

---

## 📁 Estructura del proyecto:

```
videSplitter/
├── src/                    # Código fuente
│   ├── main.js            # Lógica principal de Electron
│   ├── index.html         # Interfaz de usuario
│   ├── styles.css         # Estilos bonitos
│   ├── renderer.js        # Lógica de la interfaz
│   └── config.js          # Configuración
├── assets/                # Recursos (iconos)
├── dist/                  # Aplicación final (se crea al construir)
├── build.js               # Script para construir fácilmente
├── package.json           # Configuración del proyecto
└── README.md              # Documentación completa
```

---

## 🛠️ Comandos útiles:

| Comando | Descripción |
|---------|-------------|
| `node build.js dev` | Probar la aplicación |
| `node build.js win` | Crear instalador Windows |
| `node build.js mac` | Crear instalador Mac |
| `node build.js all` | Crear todos los instaladores |
| `node build.js help` | Ver todos los comandos |

---

## 🎉 ¡Listo para usar!

Tu aplicación VideoCutter AI está completamente funcional y lista para:

- ✅ Cortar videos para TikTok/Instagram Reels
- ✅ Crear YouTube Shorts
- ✅ Extraer fragmentos específicos
- ✅ Trabajar con múltiples formatos
- ✅ Configurar calidad según necesidades

### **Próximos pasos sugeridos:**

1. **Prueba la aplicación**: `node build.js dev`
2. **Crea el instalador**: `node build.js win`
3. **Comparte con otros**: El archivo `.exe` en `dist/` se puede instalar en cualquier PC

---

## 💡 Consejos:

- **Para TikTok**: Usa 15-60 segundos
- **Para Instagram Reels**: Usa 30 segundos
- **Para YouTube Shorts**: Usa 1 minuto
- **Calidad media**: Perfecta para la mayoría de casos
- **Calidad alta**: Solo si necesitas máxima calidad

---

**¡Disfruta cortando tus videos de forma súper fácil! 🎬✂️** 