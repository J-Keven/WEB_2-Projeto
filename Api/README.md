<h3 align="center">
  <span>
  <img alt="GoStack" src="assets/Logo.png"  width='300px'/>
  </span>
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/J-Keven/AppFreelencer?color=blue">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">

  <a href="https://github.com/J-keven/AppFreelencer/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/J-Keven/AppFreelencer?style=social">
  </a>

  <a href="https://github.com/J-Keven/AppFreelencer/network/members">
    <img alt="Stargazers" src="https://img.shields.io/github/forks/J-keven/AppFreelencer?style=social">
  </a>
</p>


<p align="center">
  <a href="#rocket-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-como-usar">Techs</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-como-usar">Como Usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-contribuir">Como Contribuir</a>&nbsp;&nbsp;&nbsp;
  <!-- <a href="#memo-licença">Licença</a> -->
</p>

## 💈Sobre
O FreelasApp é uma aplicação para auxiliar pessoas ou empresas que estão necessitando de profissionais para desenvolver um determinado projeto ou serviço e, também, ajudar pessoas que trabalham de forma autônoma ou querem fazer um dinheiro extra a encontrar novos projetos ou serviços para desenvolver.💜🚀
## Techs
Esse projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:
<code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png"></code> <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"></code> <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png"></code> <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png"></code> <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react-native/react-native.png"></code> <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png"></code> <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png"></code> <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png"></code>

- [Axios](https://github.com/axios/axios)
- [eslint](https://eslint.org/docs/user-guide/configuring)
- [Jest](https://jestjs.io/docs/en/getting-started)
- [prettier](https://prettier.io/docs/en/options.html)
- [styled-components](https://styled-components.com/)
- [Typeorm](https://typeorm.io/#/)
- [unform](https://unform.dev/)

## ⚡ Executando o Projeto

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/) v12x** instalado na máquina
  - Também, é **preciso** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - É importante que tenha um **banco Sql** rodando na sua máquina, de preferência postgreSQL.

1. Faça um clone:

```sh
  $ git clone https://github.com/J-Keven/AppFreelencer.git
```

2. Entre na pasta da aplicação:

  ```sh
    $ cd AppFreelencer
  ```

### Iniciando o backend

1. Entre na pasta da Api :

  ```sh
    $ cd freelasApp-api
  ```

2. Alterando as informações de conexão com o Banco:
  - Cier um arquivo ``ormconfig.json`` na raiz da pasta.
  - Copie o conteúdo do arquivo [ormconfig.Example](freelasApp-api/ormconfig.Example.json) e cole no seu arquivo ``ormconfig.json``.
  - Abra o arquivo ``ormconfig.json`` e coloque as informaçõe do seu banco.
   Ex:
  ```javascript
    {
      "type": "postgres",//tipo de banco, postgres, mysql
      "host": "localhost",//onde está sedo executando o banco
      "port": 5432, // A porta que seu banco esta usando
      "username": "postgres", 
      "password": "docker",
      "database": "gobarber",//nome do banco
    }
  ```
3. Instale as depedências:
```sh
  # Instale as dependências
  $ yarn
```

4. Execute as migrations para criar as tabelas no seu banco:
```sh
  # Instale as dependências
  $ yarn typeorm migration:run
```

5. Executando a Aplicação:
```sh
  # Inicie a API no mode de dev
  $ yarn dev:server

  # Inicie a API no ambiente de produção
  $ yarn start
```

### Iniciando o Mobile

1. Entre na pasta da aplicação Mobile:

  ```sh
    $ cd freelasApp-mobile
  ```

2. Instalando as dependencias:

  ```sh
    $ yarn
  ```

3. Executando a Aplicação:

  ```sh
    $ yarn start
  ```

4. Executando no Emulador/USB android:

  ```sh
    $ yarn android
  ```
5. Executando no Ios:

  ```sh
    $ yarn ios
  ```
## 🚀 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m '[feat]: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

- Abra um Pull Request.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
<h4 align="center">
    Feito com 💜 by <a href="https://www.linkedin.com/in/jhonnas-keven-884a97159/" target="_blank">J-keven</a>
</h4>
