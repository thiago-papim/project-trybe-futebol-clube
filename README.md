# Trybe Futebol Clube

Feito por [Thiago Papim](https://www.linkedin.com/in/thiago-papim/)


## Sobre o Projeto 📝
 
O TFC é um site informativo sobre partidas e classificações de futebol! ⚽
<br>Nele você pode criar, atualizar e finalizar partidas, pode também ver a classificação dos times por time da casa, visitante ou uma classificação geral. Temos um sistema de login e autenticação.
<br>Todo o projeto foi trabalhado principalmente em TypeScript, Sequelize e MySQL juntamente com as ferramentas listadas abaixo.
<br>E melhor, pode ser visualizado pelo frontend já configurado no projeto.

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

 ## Endpoints 🔽
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
Caso nenhum dos campos email ou password sejam preenchidos:

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
<details><summary><strong>Caso não tenha a chave Authorization ou não tenha um token declarado</strong></summary><br/>
Tem status o 401 e a resposta da requisição:

```
{
	"message": "Token not found"
}
```
</details>

<details><summary><strong>Caso o token seja inválido</strong></summary><br/>
Tem status o 401 e a resposta da requisição:

```
{
	"message": "Token must be a valid token"
}
```

</details>

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

`IMPORTANTE: NECESSÁRIO USO DO TOKEN DE AUTENTICAÇÃO`

<details><summary><strong>Em caso de sucesso</strong></summary><br/>
Tem status o 200 e a resposta da requisição:

```
{
	"message": "Finished"
}
```
</details>

<details><summary><strong>Caso a partida já esteja encerrada</strong></summary><br/>
Tem status o 200 e a resposta da requisição:

```
{
	"message": "Partida já encerrada"
}
```

</details>

##

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/matches/:id` | `PATCH` | Atualizar uma partida em andamento |

`IMPORTANTE: NECESSÁRIO USO DO TOKEN DE AUTENTICAÇÃO`

Essa rota é capaz de mudar a quantidade de gols de um time.

<details><summary><strong>Detalhes</strong></summary><br/>

O corpo da requisição tem que ter o seguinte exemplo de estrutura:

```
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

Essa requisição tem status 200 e a resposta da requisição:

```
{
  "message": "Jogo atualizado"
}
```

</details>

##

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/matches` | `POST` | Cadastrar uma nova partida |

`IMPORTANTE: NECESSÁRIO USO DO TOKEN DE AUTENTICAÇÃO`

Essa rota é capaz de cadastrar uma nova partida.

<details><summary><strong>Detalhes</strong></summary><br/>

O corpo da requisição tem que ter o seguinte exemplo de estrutura:

```
{
  "homeTeamId": 16, // O valor deve ser o id do time
  "awayTeamId": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
```

Essa requisição tem status 200 e esse é o exemplo de resposta:

```
{
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}
```

</details>

</details>

<h2>Leaderboard</h2>
<details><summary><strong>Rotas</strong></summary><br/>

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/leaderboard/home` | `GET` | Listagem de classificação para times da casa |

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser a classificação dos times com status 200<br>
Exemplo de retorno:

```
[
	{
		"name": "Santos",
		"totalPoints": 9,
		"totalGames": 3,
		"totalVictories": 3,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 9,
		"goalsOwn": 3,
		"goalsBalance": 6,
		"efficiency": "100.00"
	},
	{
		"name": "Palmeiras",
		"totalPoints": 7,
		"totalGames": 3,
		"totalVictories": 2,
		"totalDraws": 1,
		"totalLosses": 0,
		"goalsFavor": 10,
		"goalsOwn": 5,
		"goalsBalance": 5,
		"efficiency": "77.78"
	},
	{
		"name": "Corinthians",
		"totalPoints": 6,
		"totalGames": 2,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 6,
		"goalsOwn": 1,
		"goalsBalance": 5,
		"efficiency": "100.00"
	},
	{
		"name": "Grêmio",
		"totalPoints": 6,
		"totalGames": 2,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 4,
		"goalsOwn": 1,
		"goalsBalance": 3,
		"efficiency": "100.00"
	},
    ...
]
```
</details>

##

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/leaderboard/away` | `GET` | Listagem de classificação para times visitantes |

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser a classificação dos times com status 200<br>
Exemplo de retorno:

```
[
	{
		"name": "Palmeiras",
		"totalPoints": 6,
		"totalGames": 2,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 7,
		"goalsOwn": 0,
		"goalsBalance": 7,
		"efficiency": "100.00"
	},
	{
		"name": "Corinthians",
		"totalPoints": 6,
		"totalGames": 3,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 1,
		"goalsFavor": 6,
		"goalsOwn": 2,
		"goalsBalance": 4,
		"efficiency": "66.67"
	},
	{
		"name": "Internacional",
		"totalPoints": 6,
		"totalGames": 2,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 3,
		"goalsOwn": 0,
		"goalsBalance": 3,
		"efficiency": "100.00"
	},
	{
		"name": "São José-SP",
		"totalPoints": 6,
		"totalGames": 2,
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 3,
		"goalsOwn": 1,
		"goalsBalance": 2,
		"efficiency": "100.00"
	},
    ...
]
```
</details>

##

| Endpoint | Método | Funcionalidade |
|---|---|---|
| `/leaderboard` | `GET` | Listagem de classificação geral |

<details><summary><strong>Em caso de sucesso</strong></summary><br/>

O resposta da requisição tem que ser a classificação dos times com status 200<br>
Exemplo de retorno:

```
[
	{
		"name": "Palmeiras",
		"totalPoints": 13,
		"totalGames": 5,
		"totalVictories": 4,
		"totalDraws": 1,
		"totalLosses": 0,
		"goalsFavor": 17,
		"goalsOwn": 5,
		"goalsBalance": 12,
		"efficiency": "86.67"
	},
	{
		"name": "Corinthians",
		"totalPoints": 12,
		"totalGames": 5,
		"totalVictories": 4,
		"totalDraws": 0,
		"totalLosses": 1,
		"goalsFavor": 12,
		"goalsOwn": 3,
		"goalsBalance": 9,
		"efficiency": "80.00"
	},
	{
		"name": "Santos",
		"totalPoints": 11,
		"totalGames": 5,
		"totalVictories": 3,
		"totalDraws": 2,
		"totalLosses": 0,
		"goalsFavor": 12,
		"goalsOwn": 6,
		"goalsBalance": 6,
		"efficiency": "73.33"
	},
	{
		"name": "Grêmio",
		"totalPoints": 10,
		"totalGames": 5,
		"totalVictories": 3,
		"totalDraws": 1,
		"totalLosses": 1,
		"goalsFavor": 9,
		"goalsOwn": 8,
		"goalsBalance": 1,
		"efficiency": "66.67"
	},
  ...
]
```