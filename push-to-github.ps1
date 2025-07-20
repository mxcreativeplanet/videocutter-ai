# Script para hacer push a GitHub con autenticación correcta
Write-Host "🚀 Configurando push a GitHub..." -ForegroundColor Green

# Configurar el remoto con HTTPS
Write-Host "📡 Configurando remoto HTTPS..." -ForegroundColor Cyan
git remote set-url origin https://github.com/mxcreativeplanet/videocutter-ai.git

# Verificar el remoto
Write-Host "🔍 Verificando configuración del remoto..." -ForegroundColor Cyan
git remote -v

Write-Host ""
Write-Host "🔐 Para autenticarte, necesitas:" -ForegroundColor Yellow
Write-Host "   1. Ir a GitHub.com → Settings → Developer settings → Personal access tokens" -ForegroundColor White
Write-Host "   2. Generar un nuevo token con permisos 'repo'" -ForegroundColor White
Write-Host "   3. Copiar el token" -ForegroundColor White
Write-Host ""
Write-Host "📝 Cuando hagas push, usa:" -ForegroundColor Cyan
Write-Host "   Username: mxcreativeplanet" -ForegroundColor White
Write-Host "   Password: [tu-token-de-acceso]" -ForegroundColor White
Write-Host ""

# Intentar hacer push
Write-Host "📤 Intentando hacer push..." -ForegroundColor Cyan
Write-Host "   (Se te pedirán las credenciales)" -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Push exitoso!" -ForegroundColor Green
    Write-Host "🌐 Tu repositorio está en: https://github.com/mxcreativeplanet/videocutter-ai" -ForegroundColor Cyan
}
else {
    Write-Host ""
    Write-Host "❌ Error en el push" -ForegroundColor Red
    Write-Host "💡 Asegúrate de:" -ForegroundColor Yellow
    Write-Host "   - Tener un token de acceso personal válido" -ForegroundColor White
    Write-Host "   - Usar 'mxcreativeplanet' como usuario" -ForegroundColor White
    Write-Host "   - Usar el token como contraseña" -ForegroundColor White
} 