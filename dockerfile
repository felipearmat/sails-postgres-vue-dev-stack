FROM node:12.10-stretch-slim

ENV TZ America/Sao_Paulo

# Setup do ambiente (atualiza o SO, acerta o timezone).
RUN echo $TZ > /etc/timezone \
 && rm /etc/localtime \
 && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
 && apt-get update \
 && apt-get upgrade -y \
 && apt-get clean

# Instalando o vue-cli.
RUN npm install -g @vue/cli
RUN npm install --save bootstrap-vue

# Criando pasta de trabalho
RUN mkdir /work

EXPOSE 8080

WORKDIR /work

# Definindo comando padrão da imagem
CMD npm run start
