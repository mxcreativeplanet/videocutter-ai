# VideoCutter AI

Una aplicación de escritorio moderna y fácil de usar para cortar videos de forma rápida y eficiente, construida con Electron y FFmpeg.

## 🚀 Características

- **Interfaz intuitiva**: Diseño moderno y fácil de usar
- **Corte rápido**: Procesamiento eficiente de videos con FFmpeg
- **Múltiples formatos**: Soporte para formatos de video populares
- **Previsualización**: Vista previa del video antes del corte
- **Cross-platform**: Funciona en Windows, macOS y Linux

## 📋 Requisitos

- Node.js 16 o superior
- npm o yarn
- FFmpeg (se instala automáticamente)

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/videocutter-ai.git
   cd videocutter-ai
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## 📦 Construcción

### Para desarrollo
```bash
npm run dev
```

### Para producción
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Todas las plataformas
npm run build
```

## 🏗️ Estructura del Proyecto

```
videocutter-ai/
├── src/                    # Código fuente principal
│   ├── main.js            # Proceso principal de Electron
│   ├── renderer.js        # Proceso de renderizado
│   ├── config.js          # Configuración de la aplicación
│   ├── index.html         # Interfaz de usuario
│   └── styles.css         # Estilos CSS
├── assets/                # Recursos estáticos
│   ├── icon.ico          # Icono para Windows
│   └── icon.svg          # Icono vectorial
├── dist-final/           # Archivos de construcción (generados)
├── docs/                 # Documentación
└── package.json          # Configuración del proyecto
```

## 🧪 Scripts Disponibles

- `npm start` - Inicia la aplicación
- `npm run dev` - Inicia en modo desarrollo
- `npm run build` - Construye la aplicación
- `npm run build:win` - Construye para Windows
- `npm run build:mac` - Construye para macOS

## 🔧 Tecnologías Utilizadas

- **Electron** - Framework para aplicaciones de escritorio
- **FFmpeg** - Procesamiento de video
- **Node.js** - Runtime de JavaScript
- **HTML/CSS/JavaScript** - Interfaz de usuario

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.

## 📄 Changelog

### v1.0.0
- Lanzamiento inicial
- Interfaz básica de corte de video
- Soporte para múltiples formatos
- Integración con FFmpeg 