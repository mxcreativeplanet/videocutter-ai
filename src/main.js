const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

// Configurar FFmpeg y FFprobe con manejo de rutas para ejecutable empaquetado
let ffmpegPath, ffprobePath;

// Determinar las rutas correctas según el entorno
if (app.isPackaged) {
  // En el ejecutable empaquetado, usar rutas absolutas
  const appPath = path.dirname(app.getPath('exe'));
  ffmpegPath = path.join(appPath, 'resources', 'app.asar.unpacked', 'node_modules', '@ffmpeg-installer', 'win32-x64', 'ffmpeg.exe');
  ffprobePath = path.join(appPath, 'resources', 'app.asar.unpacked', 'node_modules', '@ffprobe-installer', 'win32-x64', 'ffprobe.exe');
  console.log('🔧 Modo empaquetado - Rutas absolutas:');
} else {
  // En desarrollo, usar las rutas de los instaladores
  try {
    ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    ffprobePath = require('@ffprobe-installer/ffprobe').path;
    console.log('🔧 Modo desarrollo - Rutas de instaladores:');
  } catch (error) {
    console.log('❌ Error cargando instaladores, usando rutas relativas:', error.message);
    ffmpegPath = path.join(__dirname, '..', 'node_modules', '@ffmpeg-installer', 'win32-x64', 'ffmpeg.exe');
    ffprobePath = path.join(__dirname, '..', 'node_modules', '@ffprobe-installer', 'win32-x64', 'ffprobe.exe');
  }
}

// Verificar que los archivos existen
if (!fs.existsSync(ffmpegPath)) {
  console.log('⚠️ FFmpeg no encontrado en:', ffmpegPath);
  // Intentar encontrar FFmpeg en el sistema
  ffmpegPath = 'ffmpeg';
}

if (!fs.existsSync(ffprobePath)) {
  console.log('⚠️ FFprobe no encontrado en:', ffprobePath);
  // Intentar encontrar FFprobe en el sistema
  ffprobePath = 'ffprobe';
}

// Configurar FFmpeg y FFprobe
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

console.log('FFmpeg path:', ffmpegPath);
console.log('FFprobe path:', ffprobePath);

let mainWindow;

function createWindow() {
  // Crear la ventana principal
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    title: 'VideoCutter AI'
  });

  // Cargar la interfaz principal
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Abrir las herramientas de desarrollo en modo desarrollo
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Cuando la app esté lista, crear la ventana
app.whenReady().then(createWindow);

// Cerrar la app cuando todas las ventanas estén cerradas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Manejar la selección de archivos
ipcMain.handle('select-video', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Videos', extensions: ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', 'm4v'] }
    ]
  });
  return result.filePaths[0];
});

// Obtener información del video usando ffmpeg directamente
ipcMain.handle('get-video-info', async (event, videoPath) => {
  return new Promise((resolve, reject) => {
    try {
      // Usar ffmpeg para obtener información del video
      const command = ffmpeg(videoPath);
      let duration = 0;
      let format = 'unknown';
      
      command.ffprobe((err, metadata) => {
        if (err) {
          console.log('Error obteniendo metadata:', err.message);
          // Si falla, intentar obtener duración de otra manera
          resolve({ 
            success: true, 
            duration: 0, 
            format: 'unknown',
            size: 0,
            note: 'Duración no disponible'
          });
        } else {
          try {
            duration = Math.round(metadata.format.duration);
            format = metadata.format.format_name;
            console.log('Duración obtenida:', duration, 'segundos');
            resolve({ 
              success: true, 
              duration: duration, 
              format: format,
              size: metadata.format.size || 0
            });
          } catch (parseError) {
            console.log('Error parseando metadata:', parseError);
            resolve({ 
              success: true, 
              duration: 0, 
              format: 'unknown',
              size: 0,
              note: 'Error parseando duración'
            });
          }
        }
      });
    } catch (error) {
      console.log('Error en get-video-info:', error);
      resolve({ 
        success: true, 
        duration: 0, 
        format: 'unknown',
        size: 0,
        note: 'Error general'
      });
    }
  });
});

// Manejar la selección de carpeta de destino
ipcMain.handle('select-output-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

// Manejar el procesamiento de video
ipcMain.handle('process-video', async (event, data) => {
  const { inputPath, outputFolder, startTime, duration, quality, generateMultiple } = data;
  
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Procesando video con datos:', data);
      
      // Si es extracción específica (un solo fragmento)
      if (startTime && duration) {
        const outputFileName = `fragmento_${Date.now()}.mp4`;
        const outputPath = path.join(outputFolder, outputFileName);
        
        let command = ffmpeg(inputPath);
        command = command.inputOptions([`-ss ${startTime}`, `-t ${duration}`]);
        
        const result = await processSingleVideo(command, outputPath, quality, mainWindow);
        resolve({ success: true, outputPath, type: 'single' });
      }
      // Si es división en múltiples fragmentos
      else if (duration && generateMultiple) {
        // Intentar obtener la duración total del video
        let totalDuration = 0;
        let numFragments = 1;
        
        try {
          const videoInfo = await new Promise((resolveInfo, rejectInfo) => {
            const command = ffmpeg(inputPath);
            command.ffprobe((err, metadata) => {
              if (err) {
                console.log('Error obteniendo duración total:', err.message);
                rejectInfo(err);
              } else {
                resolveInfo(metadata);
              }
            });
          });
          
          totalDuration = Math.floor(videoInfo.format.duration);
          const fragmentDuration = parseInt(duration);
          numFragments = Math.ceil(totalDuration / fragmentDuration);
          
          console.log(`Video total: ${totalDuration}s, Fragmentos de: ${fragmentDuration}s, Total fragmentos: ${numFragments}`);
        } catch (error) {
          console.log('No se pudo obtener duración total, generando solo un fragmento');
          totalDuration = parseInt(duration);
          numFragments = 1;
        }
        
        const results = [];
        let completedFragments = 0;
        
        for (let i = 0; i < numFragments; i++) {
          const startTime = i * parseInt(duration);
          const actualDuration = Math.min(parseInt(duration), totalDuration - startTime);
          
          if (actualDuration <= 0) break;
          
          const outputFileName = `fragmento_${String(i + 1).padStart(2, '0')}.mp4`;
          const outputPath = path.join(outputFolder, outputFileName);
          
          console.log(`Procesando fragmento ${i + 1}/${numFragments}: ${startTime}s - ${startTime + actualDuration}s`);
          
          let command = ffmpeg(inputPath);
          command = command.inputOptions([`-ss ${startTime}`, `-t ${actualDuration}`]);
          
          try {
            await processSingleVideo(command, outputPath, quality, mainWindow, i + 1, numFragments);
            results.push(outputPath);
            completedFragments++;
            
            // Enviar progreso general
            const overallProgress = (completedFragments / numFragments) * 100;
            mainWindow.webContents.send('processing-progress', { 
              percent: overallProgress,
              current: completedFragments,
              total: numFragments
            });
          } catch (error) {
            console.error(`Error procesando fragmento ${i + 1}:`, error);
          }
        }
        
        resolve({ 
          success: true, 
          outputPaths: results, 
          type: 'multiple',
          totalFragments: completedFragments
        });
      }
      // Si es un solo fragmento desde el inicio
      else if (duration) {
        const outputFileName = `fragmento_${Date.now()}.mp4`;
        const outputPath = path.join(outputFolder, outputFileName);
        
        let command = ffmpeg(inputPath);
        command = command.inputOptions([`-t ${duration}`]);
        
        const result = await processSingleVideo(command, outputPath, quality, mainWindow);
        resolve({ success: true, outputPath, type: 'single' });
      }
      else {
        reject({ success: false, error: 'Parámetros inválidos' });
      }
    } catch (error) {
      console.error('Error en process-video:', error);
      reject({ success: false, error: error.message });
    }
  });
});

// Función auxiliar para procesar un solo video
function processSingleVideo(command, outputPath, quality, mainWindow, currentFragment = 1, totalFragments = 1) {
  return new Promise((resolve, reject) => {
    // Configurar calidad
    let videoCodec = 'libx264';
    let audioCodec = 'aac';
    let crf = '23'; // Calidad por defecto
    
    switch (quality) {
      case 'high':
        crf = '18';
        break;
      case 'medium':
        crf = '23';
        break;
      case 'low':
        crf = '28';
        break;
    }
    
    console.log(`Iniciando procesamiento del fragmento ${currentFragment}/${totalFragments}`);
    
    command
      .videoCodec(videoCodec)
      .audioCodec(audioCodec)
      .outputOptions([`-crf ${crf}`])
      .output(outputPath)
      .on('progress', (progress) => {
        console.log(`Progreso fragmento ${currentFragment}: ${progress.percent ? Math.round(progress.percent) : 0}%`);
        // Enviar progreso con información del fragmento actual
        mainWindow.webContents.send('processing-progress', {
          ...progress,
          currentFragment,
          totalFragments
        });
      })
      .on('end', () => {
        console.log(`Fragmento ${currentFragment} completado: ${outputPath}`);
        resolve({ success: true, outputPath });
      })
      .on('error', (err) => {
        console.error(`Error en fragmento ${currentFragment}:`, err.message);
        reject({ success: false, error: err.message });
      })
      .run();
  });
} 