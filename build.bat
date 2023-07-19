@echo off
taskkill /f /im node.exe
taskkill /f /im NeverEndingTechnika.exe
taskkill /f /im mongod.exe
PATH %PATH%;%cd%\env\mongo\bin;%cd%\env\npm
call pkg -t node10-win src/package.json