FROM node:12.10-stretch-slim

ENV TZ America/Sao_Paulo
ENV APP_FOLDER /work

# Setup do ambiente (atualiza o SO, acerta o timezone, instala pacote básico).
RUN echo $TZ > /etc/timezone \
 && rm /etc/localtime \
 && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
 && apt-get update \
 && apt-get install -y --no-install-recommends build-essential curl gettext-base \
 && apt-get upgrade -y \
 && apt-get clean

# Instalando Node.js
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
 && apt-get install -y nodejs \
 && apt-get clean

# Instalando Sails
RUN npm install sails -g

# Instalando o vue-cli e bootstrap-vue.
RUN npm install -g @vue/cli
RUN npm install --save bootstrap-vue

# Criando pasta de trabalho
RUN mkdir /work

EXPOSE 1337

WORKDIR /work

# Definindo comando padrão da imagem
CMD ./setup/run.sh
