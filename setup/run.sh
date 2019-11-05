#!/bin/bash

echo "Executando script de desenvolvimento..."
cd "$APP_FOLDER/app"
echo "Instalando dependências do Vue e do Sails..."
npm install &
cd "$APP_FOLDER/sails"
npm install &
wait
echo "Dependências instaladas!!!"
echo "Iniciando Vue no modo watch com WebPack..."
cd "$APP_FOLDER/app"
npm start &
cd "$APP_FOLDER/sails"
echo "Iniciando Sails..."
sails lift