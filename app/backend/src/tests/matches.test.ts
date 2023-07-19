import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import {matchesMock, matchesMockInProgress} from './mocks/Matches.mock';
import { user } from './mocks/Login.mock';
import MatchesService from '../services/MathcesService';
import UsersService from '../services/UsersService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando Matches', () => {
  beforeEach(() => sinon.restore())

  it('Testando getAll', async function (){
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock as any);
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(matchesMock);
  });

  it('Testando getAll com filtro de inProgress', async function (){
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock as any);
    const { status, body } = await chai.request(app).get('/matches/?inProgress=false');
    
    expect(status).to.eq(200);
    expect(body).to.deep.equal(matchesMockInProgress);
  });

  it('Testando finishMatch sem token', async function (){
    sinon.stub(SequelizeMatches, 'update').resolves([0] as any);
    const { status, body } = await chai.request(app).patch('/matches/7/finish').set('Authorization', '');
    
    expect(status).to.eq(401);
    expect(body).to.deep.equal({ message: 'Token not found'});
  });

  it('Testando finishMatch com token invalido', async function (){
    sinon.stub(SequelizeMatches, 'update').resolves([0] as any);
    const { status, body } = await chai.request(app).patch('/matches/7/finish').set('Authorization', '123456');
    
    expect(status).to.eq(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token'});
  });
  
  it('Testando finishMatch com token valido', async function (){
    // sinon.stub(MatchesService.prototype, 'finishMatch').resolves(true);
    // sinon.stub(UsersService.prototype, 'findByEmail').resolves({code: 200, data: user})
    // const { body: token } = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: '123456' })
    // console.log(token);
    
    // const { status, body } = await chai.request(app)
    //   .patch('/matches/7/finish')
    //   .set('Authorization', `Bearer ${token}`)
    //   .send();
    // expect(body).to.eq({200: ''});
  });
});
