FROM postgres:11

ENV TZ America/Sao_Paulo
ENV APP_FOLDER /work

# Setup do ambiente (atualiza o SO, acerta o timezone, instala pacote básico).
RUN echo $TZ > /etc/timezone \
 && rm /etc/localtime \
 && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
 && apt-get update \
 && apt-get install -y --no-install-recommends build-essential software-properties-common curl gettext-base \
 && apt-get upgrade -y

# Instalando o node 12
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
 && apt-get update \
 && apt-get install -y nodejs \
 && apt-get clean

# Usa o watcher chokidar do node.js para evitar problemas com o docker
ENV CHOKIDAR_USEPOLLING 1
ENV CHOKIDAR_INTERVAL 1000

# Instalando Sails
RUN npm install sails -g

# Copiando setup inicial do Postgres
COPY ./setup/init.sql /docker-entrypoint-initdb.d/

# Script para execução do container
COPY ./setup/run.sh /opt/run.sh

# Criando pasta de trabalho
RUN mkdir /work

EXPOSE 1337

WORKDIR /work

# Comando padrão para execução do container
CMD ["/opt/run.sh"]
