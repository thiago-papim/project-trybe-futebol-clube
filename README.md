# Trybe Futebol Clube

Feito por [Thiago Papim](https://www.linkedin.com/in/thiago-papim/)


## Sobre o Projeto 📝
 
sobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobresobre sobre

## Ferramentas e Habilidades utilizadas ⚙️
- TypeScript
- Node.js
- MySQL
- Sequelize
- Express
- Docker
- Mocha.js
- Jest.js
- Chai.js
- TDD (Test Driven Development)
- Arquitetura de software MSC

 ## Como Executar o Projeto ✅
> 👀 Necessário ter o docker e o docker-compose instalados em sua máquina.
<details><summary><strong>Passo a passo</strong></summary><br/>


1. Clone o repositório
```
git clone git@github.com:thiago-papim/project-trybe-futebol-clube.git
```
2. Instalar as dependências
```
npm i && npm run install:front && npm run install:back
```
3. Subir os containers<br>
Iremos subir 3 containers no total, sendo eles frontend, backend e database
```
cd app && docker-compose up
```
Com isso estará funcionando

</details>

 ## Endpoints ✅

<details><summary><strong>Login</strong></summary><br/>
O corpo da requisição tem que ter a seguinte estrutura:

```
{
  "email": "teste@gmail.com",
  "password": "123456"
}
```

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/login` | `GET` | Realizar login de um usuário já cadastrado |
