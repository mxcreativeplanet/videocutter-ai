# Script para inicializar Git y hacer el primer commit
Write-Host "🚀 Inicializando repositorio Git..." -ForegroundColor Green

# Inicializar Git
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "feat: initial commit - VideoCutter AI project setup

- Add Electron application structure
- Configure ESLint and Prettier
- Add GitHub Actions CI/CD
- Add comprehensive documentation
- Add issue and PR templates
- Add code of conduct and contributing guidelines"

Write-Host "✅ Repositorio Git inicializado exitosamente!" -ForegroundColor Green
Write-Host "📝 Para conectar con un repositorio remoto, ejecuta:" -ForegroundColor Yellow
Write-Host "   git remote add origin URL-DE-TU-REPOSITORIO" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host '   git push -u origin main' -ForegroundColor Cyan 