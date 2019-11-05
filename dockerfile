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

# Script para execução do container
COPY ./setup/run.sh /opt/run.sh

# Criando pasta de trabalho
RUN mkdir /work

# Usa o watcher chokidar do node.js para evitar problemas com o docker
ENV CHOKIDAR_USEPOLLING 1
ENV CHOKIDAR_INTERVAL 1000

# Instalando Sails
RUN npm install sails -g

EXPOSE 1337

WORKDIR /work

# Comando padrão para execução do container
CMD ["/opt/run.sh"]
