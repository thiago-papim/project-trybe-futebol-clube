import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches, teams, resultLeaderboardAll, resultHome, resultAway } from './mocks/Leaderboard.mock';
import SequelizeTeams from '../database/models/SequelizeTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando Leaderboard', () => {
  beforeEach(() => sinon.restore())

  it('Testando Leaderboard completa', async function (){
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/leaderboard');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(resultLeaderboardAll);
  });

  it('Testando Leaderboard completa', async function (){
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/leaderboard/');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(resultLeaderboardAll);
  });

  it('Testando Leaderboard home', async function (){
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(resultHome);
  });

  it('Testando Leaderboard away', async function (){
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(resultAway);
  });
});
