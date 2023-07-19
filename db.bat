PATH %PATH%;%cd%\env\mongo\bin;%cd%\env\npm
IF EXIST db\mongod.lock del /F db\mongod.lock
start mongod --dbpath db