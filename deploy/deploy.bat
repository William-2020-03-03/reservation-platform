@echo off
cd /d %~dp0




set FRONTEND_DIR=C:\restaurant-reservation-system\frontend\ui
set BACKEND_DIR=C:\restaurant-reservation-system\backend

set FRONTEND_PUBLISH_DIR=C:\nginx\html
set BACKEND_PUBLISH_DIR=C:\pm2-backend-published

echo ========================
echo STEP 1: Build and deploy node.js backend
echo ========================

cd /d "%BACKEND_DIR%"

echo stop and delete reservation-api first 
call pm2 stop reservation-api
call pm2 delete reservation-api

echo install and build backend
call npm install
call npm run build

echo Clean backend publish directory
if exist "%BACKEND_PUBLISH_DIR%" rmdir /S /Q "%BACKEND_PUBLISH_DIR%"
mkdir "%BACKEND_PUBLISH_DIR%"

echo Copy backend files
xcopy dist "%BACKEND_PUBLISH_DIR%\dist" /E /Y /I
copy .env "%BACKEND_PUBLISH_DIR%"
copy package.json "%BACKEND_PUBLISH_DIR%"

echo Install backend dependencies
cd /d "%BACKEND_PUBLISH_DIR%"
call npm install

echo start backend with PM2
call pm2 start dist\server.js --name reservation-api --env production

echo clean pm2 logs reservation-api
call pm2 flush

echo ========================
echo STEP 2: Build Angular frontend
echo ========================

cd /d "%FRONTEND_DIR%"
call npm install
call ng build --configuration production

echo copy frontend dist to nginx html/browser
if exist "%FRONTEND_PUBLISH_DIR%\browser" rmdir /S /Q "%FRONTEND_PUBLISH_DIR%\browser"
xcopy dist "%FRONTEND_PUBLISH_DIR%" /E /Y /I

echo ========================
echo STEP 3: Start NGINX
echo ========================

cd /d "C:\nginx"
start nginx


pause