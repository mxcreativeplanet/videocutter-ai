PRD – VideoCutter AI (Versión 1)
Nombre del proyecto: VideoCutter AI
🧭 Objetivo del producto
Crear una aplicación de escritorio multiplataforma (Windows y macOS) que permita dividir fácilmente archivos de video en fragmentos de duración determinada. La herramienta debe ser intuitiva, rápida y funcional incluso para usuarios sin experiencia técnica.

🎯 Público objetivo
Creadores de contenido (TikTok, Instagram Reels, YouTube Shorts)

Usuarios de IA de edición de video que requieren videos < 1 minuto

Editores ocasionales o principiantes

🖥️ Plataforma
Aplicación de escritorio construida con Electron.js

Backend con Node.js usando fluent-ffmpeg

Compatible con Windows (.exe) y Mac (.dmg)

🛠️ Funcionalidades principales
1. Carga de video
Arrastrar y soltar archivos o explorador de archivos.

Soporte para formatos comunes: .mp4, .mov, .avi, .mkv.

2. Opciones de división de video
Botones predefinidos:

15s

30s

45s

60s

Campo personalizado de duración:

El usuario puede escribir duración en segundos o minutos.

División automática en fragmentos consecutivos.

Conservación de audio y calidad original.

3. Extracción específica
Campos de entrada manual:

Tiempo de inicio (hh:mm:ss)

Tiempo de fin (hh:mm:ss)

Botón de “Extraer fragmento”.

El clip extraído se guarda como archivo independiente.

4. Vista previa básica (opcional para V1)
Mostrar duración total del video cargado.

Indicar en texto cuántos clips se generarán.

(En versiones futuras puede añadirse miniaturas o sliders.)

5. Exportación
Selección de carpeta de destino.

Archivos nombrados secuencialmente (clip_01.mp4, clip_02.mp4, etc.)

Conservación de formato y resolución original.

🧩 Tecnologías a utilizar
Electron.js – Framework para apps de escritorio.

Node.js – Backend con lógica de negocio.

fluent-ffmpeg – Wrapper de FFmpeg para cortar videos fácilmente.

FFmpeg – Motor de procesamiento de video (instalado junto a la app).

JavaScript / HTML / CSS – Para la interfaz de usuario.

🧪 Requisitos técnicos
La app debe incluir una instancia portable de FFmpeg o descargarla al primer uso.

Debe manejar errores como:

Formatos no soportados.

Video demasiado corto para la duración elegida.

Fragmentos fuera del rango válido.

Evitar pérdida de calidad (usar copy codec si es posible).

🧭 Flujo de usuario
Abre la app.

Carga el video arrastrándolo o buscándolo.

Elige:

Una duración fija (15/30/45/60s)

O ingresa una duración personalizada

O define un fragmento específico por tiempo.

Haz clic en “Dividir” o “Extraer”.

Selecciona carpeta de exportación.

Recibe una notificación al finalizar la exportación.

📦 Entregables esperados (si se trabaja con IA o equipo externo)
Código fuente organizado con documentación.

Ejecutable .exe para Windows y .dmg para Mac.

Carpeta de instalación con FFmpeg incluido o con instrucciones para instalarlo al primer uso.

Diseño de interfaz funcional y amigable.
