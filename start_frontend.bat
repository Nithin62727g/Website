@echo off
echo ========================================
echo   LearnFlow AI Frontend Server
echo ========================================
echo.
echo Starting local web server for the UI...
echo The browser will block API calls if you just double-click the HTML files.
echo So we are serving them locally on port 5500.
echo.
echo Please open: http://127.0.0.1:5500/dashboard.html
echo.
cd /d "%~dp0"

REM Try to open the browser automatically
start http://127.0.0.1:5500/dashboard.html

REM Start the python http server
python -m http.server 5500
pause
