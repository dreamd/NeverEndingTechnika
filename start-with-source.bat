@echo off
taskkill /f /im node.exe
taskkill /f /im NeverEndingTechnika.exe
taskkill /f /im mongod.exe
call db.bat
supervisor -w src/app -e js,json src/app/server.js