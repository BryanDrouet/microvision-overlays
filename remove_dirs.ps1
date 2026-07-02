$workDir = "c:\Users\Administrateur\Desktop\Autre\microvision-overlays\microvision-overlays"
cd $workDir

Write-Host "=== Directory Status Before Deletion ==="
Get-ChildItem -Directory | Select-Object Name

Write-Host "`n=== Removing css directory ==="
if (Test-Path "css") {
    Remove-Item -Path "css" -Recurse -Force -ErrorAction Continue
    Write-Host "css directory removal attempted"
} else {
    Write-Host "css directory not found"
}

Write-Host "`n=== Removing js directory ==="
if (Test-Path "js") {
    Remove-Item -Path "js" -Recurse -Force -ErrorAction Continue
    Write-Host "js directory removal attempted"
} else {
    Write-Host "js directory not found"
}

Write-Host "`n=== Directory Status After Deletion ==="
Get-ChildItem -Directory | Select-Object Name

Write-Host "`n=== Git Status ==="
git status

Write-Host "`n=== Git Add ==="
git add -A

Write-Host "`n=== Git Commit ==="
git commit -m "refactor: remove centralized css and js directories"

Write-Host "`n=== Git Push ==="
git push

Write-Host "`n=== Git Log (Last 5 commits) ==="
git log --oneline -5
