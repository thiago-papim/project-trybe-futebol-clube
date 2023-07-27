# Trybe Futebol Clube

Feito por [Thiago Papim](https://www.linkedin.com/in/thiago-papim/)


## Sobre o Projeto 📝
 
sobre 

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
<h2>Login</h2>
<details><summary><strong>Rotas</strong></summary><br/>

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/login` | `POST` | Realizar login de um usuário já cadastrado |

O corpo da requisição tem que ter a seguinte estrutura:

```
{
  "email": "teste@gmail.com",
  "password": "123456"
}
```

<details><summary><strong>Em caso de sucesso</strong></summary><br/>
O resposta da requisição tem que ser um token com status 200:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWxzIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkwMzg1MzAzfQ.iVsAT1dlUMQsexBEi-t8qPqAzD0wi-tME0nVWR80BS0"
}
```
</details>

<details><summary><strong>Em caso de falha</strong></summary><br/>
`Caso nenhum dos campos email ou password sejam preenchidos:

```
{
	"message": "All fields must be filled"
}
```

Caso tenha email ou senha inválidos:

```
{
	"message": "Invalid email or password"
}
```
</details>

</details>

<!-- TOKEN -->

<h2>Autenticação de Token</h2>
<details><summary><strong>Funcionamento</strong></summary><br/>

`Realizando um login com sucesso, será gerado um token. Esse token será a autenticação em algumas rotas que estarão marcadas.`

Basta na requisição colocar na chave Authorization o Bearer juntamente ao token: 

Exemplo com chave fictícia:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWxzIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkwMzg1MzAzfQ.iVsAT1dlUMQsexBEi-t8qPqAzD0wi-tME0nVWR80BS0
```

</details>

<!-- TEAMS -->

<h2>Teams</h2>
<details><summary><strong>Rotas</strong></summary><br/>

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/teams` | `GET` | Listagem de todos os times |

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser a listagem dos times com status 200

```
[
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
    ...
]
```

</details>

</details>

<!-- MATCHES -->

<h2>Matches</h2>
<details><summary><strong>Rotas</strong></summary><br/>

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/matches` | `GET` | Listagem de todos os jogos |

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser a listagem dos jogos com status 200<br>
Exemplo de retorno:

```
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]
```
</details>

##

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/matches?inProgress=true` | `GET` | Listagem de todos os jogos em progresso |

Retorna somente os jogos em progresso

##

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/matches?inProgress=false` | `GET` | Listagem de todos os jogos finalizados |

Retorna somente os jogos finalizados

##

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/matches/:id/finish` | `PATCH` | Finalizar uma partida |

Retorna somente os jogos finalizados