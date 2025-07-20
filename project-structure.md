# Estructura del Proyecto VideoCutter AI

## 📁 Estructura de Directorios

```
videocutter-ai/
├── 📁 .github/                    # Configuración de GitHub
│   ├── 📁 ISSUE_TEMPLATE/        # Templates para issues
│   ├── 📁 workflows/             # GitHub Actions CI/CD
│   ├── CODE_OF_CONDUCT.md        # Código de conducta
│   └── FUNDING.yml               # Configuración de sponsors
├── 📁 .vscode/                   # Configuración de VSCode
│   ├── extensions.json           # Extensiones recomendadas
│   └── settings.json             # Configuración del editor
├── 📁 assets/                    # Recursos estáticos
│   ├── icon.ico                 # Icono para Windows
│   └── icon.svg                 # Icono vectorial
├── 📁 docs/                      # Documentación del proyecto
│   ├── EJECUTABLE_FINAL.md      # Documentación del ejecutable
│   ├── EJECUTABLE_CORREGIDO.md  # Correcciones del ejecutable
│   ├── EJECUTABLE_WINDOWS.md    # Instrucciones para Windows
│   ├── SOLUCION_FINAL.md        # Solución final
│   ├── PRUEBA_APLICACION.md     # Pruebas de la aplicación
│   ├── CORRECCIONES.md          # Correcciones realizadas
│   ├── INSTRUCCIONES.md         # Instrucciones de uso
│   └── videoSplitterPRD.md      # PRD del proyecto
├── 📁 src/                       # Código fuente principal
│   ├── main.js                  # Proceso principal de Electron
│   ├── renderer.js              # Proceso de renderizado
│   ├── config.js                # Configuración de la aplicación
│   ├── index.html               # Interfaz de usuario
│   └── styles.css               # Estilos CSS
├── 📁 dist-final/               # Archivos de construcción (generados)
├── 📁 node_modules/             # Dependencias de Node.js (generado)
├── .editorconfig                # Configuración del editor
├── .eslintrc.json               # Configuración de ESLint
├── .gitignore                   # Archivos ignorados por Git
├── .prettierrc                  # Configuración de Prettier
├── build.js                     # Script de construcción
├── CHANGELOG.md                 # Historial de cambios
├── CONTRIBUTING.md              # Guía de contribución
├── init-git.ps1                 # Script de inicialización de Git
├── LICENSE                      # Licencia MIT
├── package.json                 # Configuración del proyecto
├── package-lock.json            # Lock de dependencias
├── project-structure.md         # Este archivo
└── README.md                    # Documentación principal
```

## 🏗️ Arquitectura del Proyecto

### Frontend (Electron Renderer)
- **HTML**: Interfaz de usuario principal
- **CSS**: Estilos y diseño responsivo
- **JavaScript**: Lógica de la interfaz y manejo de eventos

### Backend (Electron Main)
- **Node.js**: Lógica de negocio y procesamiento
- **FFmpeg**: Procesamiento de video
- **Electron**: Framework de aplicación de escritorio

### Configuración
- **ESLint**: Linting de código JavaScript
- **Prettier**: Formateo automático de código
- **EditorConfig**: Configuración consistente del editor
- **GitHub Actions**: CI/CD automatizado

## 📋 Archivos de Configuración

### Desarrollo
- `.eslintrc.json`: Reglas de linting
- `.prettierrc`: Formateo de código
- `.editorconfig`: Configuración del editor
- `.vscode/`: Configuración específica de VSCode

### Git y GitHub
- `.gitignore`: Archivos ignorados
- `.github/`: Templates y workflows
- `CONTRIBUTING.md`: Guía de contribución
- `CODE_OF_CONDUCT.md`: Código de conducta

### Documentación
- `README.md`: Documentación principal
- `CHANGELOG.md`: Historial de versiones
- `docs/`: Documentación técnica detallada

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia la aplicación
npm run dev        # Modo desarrollo
npm run lint       # Ejecuta ESLint
npm run lint:fix   # Corrige errores de ESLint

# Construcción
npm run build      # Construye para todas las plataformas
npm run build:win  # Construye para Windows
npm run build:mac  # Construye para macOS
```

## 🔧 Tecnologías Utilizadas

- **Electron**: Framework de aplicación de escritorio
- **Node.js**: Runtime de JavaScript
- **FFmpeg**: Procesamiento de video
- **HTML/CSS/JavaScript**: Interfaz de usuario
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **GitHub Actions**: CI/CD

## 📦 Dependencias Principales

### Producción
- `@ffmpeg-installer/ffmpeg`: Instalador de FFmpeg
- `@ffprobe-installer/ffprobe`: Instalador de FFprobe
- `fluent-ffmpeg`: Wrapper de FFmpeg para Node.js

### Desarrollo
- `electron`: Framework de aplicación de escritorio
- `electron-builder`: Herramienta de construcción
- `eslint`: Linting de código

## 🎯 Convenciones del Proyecto

### Nomenclatura
- **Archivos**: kebab-case (ej: `video-cutter.js`)
- **Variables**: camelCase (ej: `videoFile`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `MAX_FILE_SIZE`)
- **Clases**: PascalCase (ej: `VideoProcessor`)

### Estructura de Commits
```
tipo(alcance): descripción

feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato de código
refactor: refactorización
test: tests
chore: tareas de mantenimiento
```

### Organización de Código
- **Separación de responsabilidades**: UI, lógica de negocio, configuración
- **Modularización**: Funciones y clases reutilizables
- **Documentación**: Comentarios en código complejo
- **Testing**: Tests para funcionalidades críticas 