const matchesMock = [
  {
		"id": 1,
		"homeTeamId": 16,
		"homeTeamGoals": 1,
		"awayTeamId": 8,
		"awayTeamGoals": 1,
		"inProgress": false,
		"home_team_id": 16,
		"away_team_id": 8,
		"homeTeam": {
			"teamName": "São Paulo"
		},
		"awayTeam": {
			"teamName": "Grêmio"
		}
	},
	{
		"id": 2,
		"homeTeamId": 9,
		"homeTeamGoals": 1,
		"awayTeamId": 14,
		"awayTeamGoals": 1,
		"inProgress": false,
		"home_team_id": 9,
		"away_team_id": 14,
		"homeTeam": {
			"teamName": "Internacional"
		},
		"awayTeam": {
			"teamName": "Santos"
		}
	},
	{
		"id": 3,
		"homeTeamId": 4,
		"homeTeamGoals": 3,
		"awayTeamId": 11,
		"awayTeamGoals": 0,
		"inProgress": false,
		"home_team_id": 4,
		"away_team_id": 11,
		"homeTeam": {
			"teamName": "Corinthians"
		},
		"awayTeam": {
			"teamName": "Napoli-SC"
		}
	},
	{
		"id": 4,
		"homeTeamId": 3,
		"homeTeamGoals": 0,
		"awayTeamId": 2,
		"awayTeamGoals": 0,
		"inProgress": false,
		"home_team_id": 3,
		"away_team_id": 2,
		"homeTeam": {
			"teamName": "Botafogo"
		},
		"awayTeam": {
			"teamName": "Bahia"
		}
	},
	{
		"id": 5,
		"homeTeamId": 7,
		"homeTeamGoals": 1,
		"awayTeamId": 10,
		"awayTeamGoals": 1,
		"inProgress": false,
		"home_team_id": 7,
		"away_team_id": 10,
		"homeTeam": {
			"teamName": "Flamengo"
		},
		"awayTeam": {
			"teamName": "Minas Brasília"
		}
	},
	{
		"id": 6,
		"homeTeamId": 5,
		"homeTeamGoals": 1,
		"awayTeamId": 13,
		"awayTeamGoals": 1,
		"inProgress": true,
		"home_team_id": 5,
		"away_team_id": 13,
		"homeTeam": {
			"teamName": "Cruzeiro"
		},
		"awayTeam": {
			"teamName": "Real Brasília"
		}
	},
	{
		"id": 7,
		"homeTeamId": 12,
		"homeTeamGoals": 2,
		"awayTeamId": 6,
		"awayTeamGoals": 2,
		"inProgress": true,
		"home_team_id": 12,
		"away_team_id": 6,
		"homeTeam": {
			"teamName": "Palmeiras"
		},
		"awayTeam": {
			"teamName": "Ferroviária"
		}
	},
]

const matchesMockInProgress = [
  {
		"id": 1,
		"homeTeamId": 16,
		"homeTeamGoals": 1,
		"awayTeamId": 8,
		"awayTeamGoals": 1,
		"inProgress": false,
		"home_team_id": 16,
		"away_team_id": 8,
		"homeTeam": {
			"teamName": "São Paulo"
		},
		"awayTeam": {
			"teamName": "Grêmio"
		}
	},
	{
		"id": 2,
		"homeTeamId": 9,
		"homeTeamGoals": 1,
		"awayTeamId": 14,
		"awayTeamGoals": 1,
		"inProgress": false,
		"home_team_id": 9,
		"away_team_id": 14,
		"homeTeam": {
			"teamName": "Internacional"
		},
		"awayTeam": {
			"teamName": "Santos"
		}
	},
	{
		"id": 3,
		"homeTeamId": 4,
		"homeTeamGoals": 3,
		"awayTeamId": 11,
		"awayTeamGoals": 0,
		"inProgress": false,
		"home_team_id": 4,
		"away_team_id": 11,
		"homeTeam": {
			"teamName": "Corinthians"
		},
		"awayTeam": {
			"teamName": "Napoli-SC"
		}
	},
	{
		"id": 4,
		"homeTeamId": 3,
		"homeTeamGoals": 0,
		"awayTeamId": 2,
		"awayTeamGoals": 0,
		"inProgress": false,
		"home_team_id": 3,
		"away_team_id": 2,
		"homeTeam": {
			"teamName": "Botafogo"
		},
		"awayTeam": {
			"teamName": "Bahia"
		}
	},
	{
		"id": 5,
		"homeTeamId": 7,
		"homeTeamGoals": 1,
		"awayTeamId": 10,
		"awayTeamGoals": 1,
		"inProgress": false,
		"home_team_id": 7,
		"away_team_id": 10,
		"homeTeam": {
			"teamName": "Flamengo"
		},
		"awayTeam": {
			"teamName": "Minas Brasília"
		}
	}
]

const createMatchModel = {
	id: 51,
	homeTeamId: 2,
	awayTeamId: 16,
	homeTeamGoals: 2,
	awayTeamGoals: 2,
	inProgress: true
};

const createMatchModelEqual = {
	id: 52,
	homeTeamId: 2,
	awayTeamId: 2,
	homeTeamGoals: 2,
	awayTeamGoals: 2,
	inProgress: true
};

const jsonCreateMacth = {
	homeTeamId: 2,
  awayTeamId: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

const jsonCreateMacthEqual = {
	homeTeamId: 2,
  awayTeamId: 2,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

export {matchesMock, matchesMockInProgress, createMatchModel, jsonCreateMacth, createMatchModelEqual, jsonCreateMacthEqual };