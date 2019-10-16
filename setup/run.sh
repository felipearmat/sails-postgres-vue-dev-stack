
export NODE_PATH=$APP_FOLDER/node_modules

echo "Executando script de desenvolvimento..."
cd $APP_FOLDER
cd app
echo "Instalando dependências do Vue..."
npm install
echo "Iniciando Vue..."
npm start &
cd ../sails
echo "Instalando dependências do Sails..."
npm install
echo "Iniciando Sails..."
sails lift
