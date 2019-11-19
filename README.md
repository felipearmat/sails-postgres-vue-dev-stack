# Desenvolvimento WEB - App de Listas

## Autores
- Felipe Araújo Matos 5968691
- Victor Henrique Nogueira Benevides 8531491

## Git
- Veja mais desse projeto aqui:
+ [SCC0219-2019201](https://github.com/felipearmat/SCC0219-2019201)

## O que você vai encontrar aqui?
- Uma pasta "app" com a aplicação Vue.js, com o seguinte conteúdo:
  - Uma pasta src com o código fonte para a produção do App Vue, basicamente um main.js que chama todos os outros componentes e elementos da aplicação.
  - Vários arquivos de configuração da aplicação e do git.
  - Uma pasta "test" com os testes do app (por enquanto nenhum...)
- Uma pasta "sails" com a parte sails da aplicação (back-end), essa pasta possui várias outras pastas relativas ao funcionamento do servidor, para nós importam a assets, a views e a DB no geral.
- Um arquivo dockerfile que poderá ser utilizado para rodar a aplicação utilizando docker
- Esse README.md, que esperamos que seja de alguma ajuda.

## Como utilizar?
É necessário executar dois serviços, o app Vue e o app Sails, para isso uma das melhores opções é utilizar o Docker:

__Docker__:
- Essa opção permite que apenas uma aplicação seja instalada no seu pc (mais específicamente o docker) e todas as dependências do projeto serão instaladas em um contâiner (algo como uma máquina virtual), assim você mantém seu computador funcionando sem conflitos.
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
- Acesse localhost:1337 no seu navegador e se divirta!
