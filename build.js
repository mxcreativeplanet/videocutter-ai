const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎬 VideoCutter AI - Script de construcción');
console.log('==========================================');

// Verificar que estamos en el directorio correcto
if (!fs.existsSync('package.json')) {
    console.error('❌ Error: No se encontró package.json. Asegúrate de estar en el directorio del proyecto.');
    process.exit(1);
}

// Verificar que las dependencias estén instaladas
if (!fs.existsSync('node_modules')) {
    console.log('📦 Instalando dependencias...');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencias instaladas correctamente');
    } catch (error) {
        console.error('❌ Error al instalar dependencias:', error.message);
        process.exit(1);
    }
}

// Función para construir la aplicación
function buildApp(platform) {
    console.log(`\n🔨 Construyendo para ${platform}...`);
    
    try {
        const command = platform === 'all' ? 'npm run build' : `npm run build:${platform}`;
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ Construcción para ${platform} completada`);
        
        // Mostrar ubicación de los archivos
        const distPath = path.join(__dirname, 'dist');
        if (fs.existsSync(distPath)) {
            console.log(`📁 Archivos generados en: ${distPath}`);
            const files = fs.readdirSync(distPath);
            files.forEach(file => {
                console.log(`   - ${file}`);
            });
        }
        
    } catch (error) {
        console.error(`❌ Error al construir para ${platform}:`, error.message);
        process.exit(1);
    }
}

// Función para ejecutar en modo desarrollo
function runDev() {
    console.log('\n🚀 Ejecutando en modo desarrollo...');
    try {
        execSync('npm run dev', { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ Error al ejecutar en modo desarrollo:', error.message);
        process.exit(1);
    }
}

// Función para mostrar ayuda
function showHelp() {
    console.log(`
📋 Comandos disponibles:

  node build.js dev      - Ejecutar en modo desarrollo
  node build.js win      - Construir para Windows
  node build.js mac      - Construir para macOS
  node build.js all      - Construir para todas las plataformas
  node build.js help     - Mostrar esta ayuda

💡 Ejemplos:
  node build.js dev      # Para probar la aplicación
  node build.js win      # Para crear el instalador de Windows
  node build.js all      # Para crear instaladores de todas las plataformas
    `);
}

// Procesar argumentos de línea de comandos
const args = process.argv.slice(2);
const command = args[0] || 'help';

switch (command) {
    case 'dev':
        runDev();
        break;
    case 'win':
        buildApp('win');
        break;
    case 'mac':
        buildApp('mac');
        break;
    case 'all':
        buildApp('all');
        break;
    case 'help':
    default:
        showHelp();
        break;
} 