# Script para configurar el repositorio remoto en GitHub
param(
    [Parameter(Mandatory = $true)]
    [string]$GitHubUsername
)

Write-Host "🚀 Configurando repositorio remoto en GitHub..." -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: No se encontró un repositorio Git en este directorio" -ForegroundColor Red
    exit 1
}

# Verificar el estado del repositorio
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Advertencia: Hay cambios sin commitear" -ForegroundColor Yellow
    Write-Host "   Archivos modificados:" -ForegroundColor Yellow
    $status | ForEach-Object { Write-Host "   $_" -ForegroundColor Yellow }
    Write-Host ""
}

# Configurar el repositorio remoto
$remoteUrl = "https://github.com/$GitHubUsername/videocutter-ai.git"
Write-Host "📡 Conectando con: $remoteUrl" -ForegroundColor Cyan

git remote add origin $remoteUrl

# Cambiar la rama principal a 'main'
Write-Host "🔄 Configurando rama principal..." -ForegroundColor Cyan
git branch -M main

# Subir el código a GitHub
Write-Host "📤 Subiendo código a GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ ¡Repositorio configurado exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Tu repositorio está disponible en:" -ForegroundColor Yellow
    Write-Host "   https://github.com/$GitHubUsername/videocutter-ai" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "   1. Ve a la URL del repositorio" -ForegroundColor White
    Write-Host "   2. Configura la descripción y topics" -ForegroundColor White
    Write-Host "   3. Crea un release inicial v1.0.0" -ForegroundColor White
    Write-Host "   4. Configura branch protection (opcional)" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Consulta GITHUB_SETUP.md para más detalles" -ForegroundColor Cyan
}
else {
    Write-Host "❌ Error al subir el código" -ForegroundColor Red
    Write-Host "   Verifica que el repositorio existe en GitHub" -ForegroundColor Yellow
    Write-Host "   y que tienes permisos para escribir" -ForegroundColor Yellow
} 