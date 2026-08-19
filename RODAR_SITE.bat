@echo off
title A Maquina de Lucro da Sua Loja - Servidor Web
cd /d "%~dp0"
echo ========================================================
echo   Iniciando o site: A Maquina de Lucro da Sua Loja
echo ========================================================
echo.
echo Abrindo o navegador automaticamente...
start http://localhost:5173/
echo.
echo Servidor rodando! Mantenha esta janela aberta enquanto navegar.
echo.
npm run dev -- --host
pause
