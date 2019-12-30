# Stack Básico Sails-Postgres-Vue.js

## Autores
- Felipe Araújo Matos 5968691
- Victor Henrique Nogueira Benevides 8531491

## Git
- Veja mais desse projeto aqui:
+ [SCC0219-2019201](https://github.com/felipearmat/SCC0219-2019201)

## O que você vai encontrar aqui?
- Uma pasta "app" com a aplicação Vue.js, com o seguinte conteúdo:
  - Uma pasta src com o código fonte e assets para a produção do App Vue, basicamente um main.js que chama todos os outros componentes e elementos da aplicação.
  - Vários arquivos de configuração da aplicação e do git.
  - Uma pasta "test" com os testes do app Vue.js que podem ser executados com o comando npm test
- Uma pasta "sails" com a parte sails da aplicação (back-end), essa pasta possui várias outras pastas relativas ao funcionamento do servidor, para nós importam as pastas assets, views e a api no geral.
- Uma pasta "setup" que possui um script para inicialização do servidor (inicia o postgres, instala pacotes do sails e do Vue.js, inicia vue-cli no modo watch e inicia servidor Sails) e um script sql com os dados iniciais para que a aplicação sails consiga ser executada.
- Um arquivo dockerfile que poderá ser utilizado para rodar a aplicação utilizando docker
- Esse README.md, que esperamos que seja de alguma ajuda.

## Como utilizar?
Existem várias maneiras de rodar a aplicação, falaremos de duas:

__Vue-Cli__ e __Sails__ e __Postgres__:
- Você pode optar por usar os programas diretamente no seu pc, instale o Vue-Cli, o sails e o postgres no seu computador, acesse a pasta do APP e siga as etapas:

- Execute as seguintes linhas de comando no postgres:
```
CREATE DATABASE sails_app;
CREATE USER sails_app WITH PASSWORD 'password';
ALTER ROLE sails_app SET client_encoding TO 'utf8';
ALTER ROLE sails_app SET default_transaction_isolation TO 'read committed';
ALTER ROLE sails_app SET timezone TO 'America/Sao_Paulo';
SET TIMEZONE TO 'America/Sao_Paulo';
GRANT ALL PRIVILEGES ON DATABASE sails_app TO sails_app;
```
**PS:** Esses são os mesmo comandos contidos on arquivo init.sql na pasta setup

- Acesse a pasta 'app', instale as dependências do Vue.js e compile a aplicação:
```
npm install
npm run build
```
- Acesse a pasta 'sails', instale as dependências e inicie o servidor Sails:
```
npm install
sails lift
```

- Não se esqueça que o postgres deve estar sendo executado para que a aplicação funcione!
- Você pode acessar seu navegador favorito em "localhost:1337" para ver a aplicação.
- Para atualizar o App Vue.js você deverá executar novamente o build da aplicação (ou executar o comando 'npm start' no lugar do 'npm build' e executar os outros comandos em uma outra janela)

Algumas pessoas podem achar essas etapas trabalhosas, ou podem não querer instalar todos esses caras no seu pc, daí você pode utilizar o Docker:

__Docker__:
- Essa opção permite que apenas uma aplicação seja instalada no seu pc (mais específicamente o docker) e todas as dependências do projeto serão instaladas em um contâiner (algo como uma máquina virtual), assim você mantém seu computador funcionando, sem conflitos.
**!!!Obs!!!** O docker só está disponível para utilização em plataformas Unix e em plataformas Windows versão Pro ou mais completa, Windows Home e Mac OS não poderão utilizar essa opção!

- Instale o docker (ou docker community em plataformas Unix) no seu pc
- Acessando a raiz do projeto (pasta onde está o dockerfile), crie o contâiner para a aplicação com o seguinte comando do docker (ele utilizará o script do arquivo "dockerfile" para construir o contâiner):
```
docker build -t desweb/applista .
```

- Agora execute o contâiner com o seguinte comando (ele conectará a porta 1337 do seu pc com a porta 1337 do contâiner, mapeará a pasta /app para a pasta /work do contâiner, criará uma variável de ambiente que indica a pasta da aplicação e executará o contâiner desweb/applist que foi criado no passo anterior)
```
# Comando para Windows
docker run -it --rm -p 1337:1337 -e APP_FOLDER="/work" -v %cd%:/work --name=applista desweb/applista

# Comando para Unix
docker run -it --rm --net=host -e APP_FOLDER="/work" -v `pwd`:/work --name=applista desweb/applista
```
- O script run.sh está configurado para ser executado automaticamente com o início do contâiner, você verá as informações do script no terminal (você pode adicionar o final 'bash' em qualquer um dos comandos acima, isso impedirá o script run.sh de ser executado automaticamente e iniciará um terminal dentro do contâiner, daí você poderá executar o script manualmente com o comando '/opt/run.sh')
- Acesse localhost:1337 no seu navegador e se divirta!
