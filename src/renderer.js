const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

// Variables globales
let selectedVideoPath = null;
let selectedDuration = null;
let selectedStartTime = null;
let selectedEndTime = null;
let selectedQuality = 'high';

// Elementos del DOM
const uploadArea = document.getElementById('uploadArea');
const uploadSection = document.getElementById('uploadArea');
const videoInfo = document.getElementById('videoInfo');
const videoName = document.getElementById('videoName');
const videoDuration = document.getElementById('videoDuration');
const selectVideoBtn = document.getElementById('selectVideoBtn');
const changeVideoBtn = document.getElementById('changeVideoBtn');
const processBtn = document.getElementById('processBtn');
const progressSection = document.getElementById('progressSection');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const resultsSection = document.getElementById('resultsSection');
const resultMessage = document.getElementById('resultMessage');
const openFolderBtn = document.getElementById('openFolderBtn');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupDragAndDrop();
});

// Configurar event listeners
function setupEventListeners() {
    // Selección de video
    selectVideoBtn.addEventListener('click', selectVideo);
    changeVideoBtn.addEventListener('click', selectVideo);
    
    // Botones de duración rápida
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover clase active de todos los botones
            document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            e.target.classList.add('active');
            
            selectedDuration = parseInt(e.target.dataset.duration);
            selectedStartTime = null;
            selectedEndTime = null;
            updateProcessButton();
        });
    });
    
    // Duración personalizada
    document.getElementById('setCustomDuration').addEventListener('click', () => {
        const customDuration = document.getElementById('customDuration').value;
        if (customDuration && customDuration > 0) {
            // Remover clase active de botones de duración rápida
            document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
            
            selectedDuration = parseInt(customDuration);
            selectedStartTime = null;
            selectedEndTime = null;
            updateProcessButton();
        }
    });
    
    // Tiempos específicos
    document.getElementById('startTime').addEventListener('input', (e) => {
        selectedStartTime = e.target.value;
        selectedDuration = null;
        document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
        updateProcessButton();
    });
    
    document.getElementById('endTime').addEventListener('input', (e) => {
        selectedEndTime = e.target.value;
        selectedDuration = null;
        document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
        updateProcessButton();
    });
    
    // Calidad
    document.querySelectorAll('input[name="quality"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedQuality = e.target.value;
        });
    });
    
    // Procesar video
    processBtn.addEventListener('click', processVideo);
    
    // Abrir carpeta
    openFolderBtn.addEventListener('click', () => {
        if (selectedVideoPath) {
            const outputDir = path.dirname(selectedVideoPath);
            require('electron').shell.openPath(outputDir);
        }
    });
}

// Configurar drag and drop
function setupDragAndDrop() {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            console.log('Archivo arrastrado:', file.name, file.path);
            if (isVideoFile(file.name)) {
                handleVideoSelection(file.path);
            } else {
                showError('Por favor selecciona un archivo de video válido.');
            }
        }
    });
    
    uploadArea.addEventListener('click', selectVideo);
}

// Seleccionar video
async function selectVideo() {
    try {
        const videoPath = await ipcRenderer.invoke('select-video');
        if (videoPath) {
            handleVideoSelection(videoPath);
        }
    } catch (error) {
        showError('Error al seleccionar el video: ' + error.message);
    }
}

// Manejar selección de video
async function handleVideoSelection(videoPath) {
    selectedVideoPath = videoPath;
    
    // Mostrar información del video
    const fileName = path.basename(videoPath);
    videoName.textContent = fileName;
    
    // Obtener duración del video
    videoDuration.textContent = 'Duración: Calculando...';
    
    try {
        const videoInfo = await ipcRenderer.invoke('get-video-info', videoPath);
        if (videoInfo.success) {
            if (videoInfo.duration > 0) {
                const minutes = Math.floor(videoInfo.duration / 60);
                const seconds = videoInfo.duration % 60;
                videoDuration.textContent = `Duración: ${minutes}:${seconds.toString().padStart(2, '0')} (${videoInfo.duration} segundos)`;
            } else {
                videoDuration.textContent = 'Duración: No disponible (se puede procesar igual)';
            }
        } else {
            videoDuration.textContent = 'Duración: No disponible - ' + videoInfo.error;
        }
    } catch (error) {
        console.error('Error obteniendo información del video:', error);
        videoDuration.textContent = 'Duración: No disponible (se puede procesar igual)';
    }
    
    // Cambiar vista
    uploadSection.style.display = 'none';
    videoInfo.style.display = 'block';
    
    updateProcessButton();
}

// Verificar si es archivo de video
function isVideoFile(filename) {
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.m4v'];
    const ext = path.extname(filename).toLowerCase();
    return videoExtensions.includes(ext);
}

// Actualizar botón de procesamiento
function updateProcessButton() {
    const hasVideo = selectedVideoPath !== null;
    const hasOptions = selectedDuration !== null || (selectedStartTime && selectedEndTime);
    
    processBtn.disabled = !hasVideo || !hasOptions;
}

// Procesar video
async function processVideo() {
    if (!selectedVideoPath) {
        showError('Por favor selecciona un video primero.');
        return;
    }
    
    if (!selectedDuration && (!selectedStartTime || !selectedEndTime)) {
        showError('Por favor selecciona una duración o tiempo específico.');
        return;
    }
    
    try {
        // Seleccionar carpeta de destino
        const outputFolder = await ipcRenderer.invoke('select-output-folder');
        if (!outputFolder) return;
        
        // Preparar datos para procesamiento
        const processData = {
            inputPath: selectedVideoPath,
            outputFolder: outputFolder,
            quality: selectedQuality
        };
        
        // Determinar si es extracción específica o división múltiple
        if (selectedStartTime && selectedEndTime) {
            // Extracción específica (un solo fragmento)
            processData.startTime = selectedStartTime;
            const duration = calculateDuration(selectedStartTime, selectedEndTime);
            processData.duration = duration;
            processData.generateMultiple = false;
        } else if (selectedDuration) {
            // División múltiple o fragmento único
            processData.duration = selectedDuration;
            processData.generateMultiple = true; // Siempre generar múltiples fragmentos
        }
        
        // Mostrar progreso
        showProgress();
        
        // Procesar video
        const result = await ipcRenderer.invoke('process-video', processData);
        
        if (result.success) {
            if (result.type === 'multiple') {
                showResultsMultiple(result.outputPaths, result.totalFragments);
            } else {
                showResults(result.outputPath);
            }
        } else {
            showError('Error al procesar el video: ' + (result.error || 'Error desconocido'));
        }
        
    } catch (error) {
        console.error('Error completo:', error);
        showError('Error: ' + (error.message || error.toString()));
    }
}

// Calcular duración entre dos tiempos
function calculateDuration(startTime, endTime) {
    const start = timeToSeconds(startTime);
    const end = timeToSeconds(endTime);
    return end - start;
}

// Convertir tiempo HH:MM:SS a segundos
function timeToSeconds(timeString) {
    const parts = timeString.split(':').map(Number);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

// Mostrar progreso
function showProgress() {
    progressSection.style.display = 'block';
    resultsSection.style.display = 'none';
    progressFill.style.width = '0%';
    progressText.textContent = '0% - Iniciando procesamiento...';
}

// Mostrar resultados
function showResults(outputPath) {
    progressSection.style.display = 'none';
    resultsSection.style.display = 'block';
    resultMessage.textContent = `Video procesado exitosamente en: ${path.basename(outputPath)}`;
}

// Mostrar resultados múltiples
function showResultsMultiple(outputPaths, totalFragments) {
    progressSection.style.display = 'none';
    resultsSection.style.display = 'block';
    resultMessage.textContent = `¡Procesamiento completado! Se generaron ${totalFragments} fragmentos en la carpeta seleccionada.`;
}

// Mostrar error
function showError(message) {
    alert(message); // En una versión más avanzada, esto sería una notificación más elegante
}

// Escuchar progreso desde el proceso principal
ipcRenderer.on('processing-progress', (event, progress) => {
    if (progress.percent !== undefined) {
        const percent = Math.round(progress.percent);
        progressFill.style.width = percent + '%';
        
        if (progress.current && progress.total) {
            progressText.textContent = `${percent}% - Fragmento ${progress.current} de ${progress.total}`;
        } else if (progress.currentFragment && progress.totalFragments) {
            progressText.textContent = `${percent}% - Fragmento ${progress.currentFragment} de ${progress.totalFragments}`;
        } else {
            progressText.textContent = `${percent}% - Procesando...`;
        }
    }
}); 