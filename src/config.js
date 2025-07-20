// Configuración de la aplicación VideoCutter AI

module.exports = {
  // Configuración de la ventana
  window: {
    width: 900,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    title: 'VideoCutter AI',
    icon: '../assets/icon.png'
  },

  // Formatos de video soportados
  supportedFormats: [
    '.mp4', '.avi', '.mov', '.mkv', '.wmv', 
    '.flv', '.webm', '.m4v', '.3gp', '.ogv'
  ],

  // Configuraciones de calidad
  qualitySettings: {
    high: {
      crf: '18',
      description: 'Alta calidad - Archivo más grande',
      recommended: 'Para videos profesionales'
    },
    medium: {
      crf: '23',
      description: 'Calidad media - Balance perfecto',
      recommended: 'Recomendado para la mayoría de casos'
    },
    low: {
      crf: '28',
      description: 'Calidad baja - Archivo más pequeño',
      recommended: 'Para compartir rápido o ahorrar espacio'
    }
  },

  // Duraciónes predefinidas (en segundos)
  presetDurations: [
    { value: 15, label: '15 segundos', description: 'Perfecto para TikTok' },
    { value: 30, label: '30 segundos', description: 'Ideal para Instagram Reels' },
    { value: 45, label: '45 segundos', description: 'Para contenido corto' },
    { value: 60, label: '1 minuto', description: 'Perfecto para YouTube Shorts' }
  ],

  // Configuración de FFmpeg
  ffmpeg: {
    videoCodec: 'libx264',
    audioCodec: 'aac',
    outputFormat: 'mp4'
  },

  // Mensajes de la aplicación
  messages: {
    welcome: '¡Bienvenido a VideoCutter AI!',
    dragDrop: 'Arrastra tu video aquí o haz clic para seleccionar',
    processing: 'Procesando video...',
    success: '¡Video procesado exitosamente!',
    error: 'Error al procesar el video',
    noVideo: 'Por favor selecciona un video primero',
    noOptions: 'Por favor selecciona una duración o tiempo específico',
    invalidFormat: 'Formato de video no soportado',
    invalidTime: 'Formato de tiempo inválido (usa HH:MM:SS)'
  },

  // Configuración de la interfaz
  ui: {
    theme: {
      primary: '#667eea',
      secondary: '#764ba2',
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    animations: {
      duration: 300,
      easing: 'ease-in-out'
    }
  }
}; 