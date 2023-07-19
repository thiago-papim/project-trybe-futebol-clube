import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import {createMatchModel, createMatchModelEqual, jsonCreateMacth, jsonCreateMacthEqual, matchesMock, matchesMockInProgress} from './mocks/Matches.mock';
import { user, userLogin } from './mocks/Login.mock';
import MatchesService from '../services/MathcesService';
import UsersService from '../services/UsersService';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

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
  
  it('Testando finishMatch com sucesso', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user })
    const updateStub = sinon.stub(SequelizeMatches, 'update').resolves([0, 1] as any);
  
    const response = await chai.request(app).post('/login').send(userLogin);
    const response2 = await chai.request(app).patch('/matches/5/finish').set('Authorization', `Bearer ${response.body.token}`).send();
    expect(response2.body).to.deep.eq({ message: 'Finished'})
    updateStub.restore();
  });

  it('Testando finishMatch partida já encerrada', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user });
    const updateStub = sinon.stub(SequelizeMatches, 'update').resolves([0, 0] as any);
    const response = await chai.request(app).post('/login').send(userLogin);
    const response2 = await chai.request(app).patch('/matches/42/finish').set('Authorization', `Bearer ${response.body.token}`).send();
    expect(response2.body).to.deep.eq({ message: 'Partida já encerrada'});
    updateStub.restore();
  });

  it('Testando update com sucesso', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user })
    const updateStub = sinon.stub(SequelizeMatches, 'update').resolves([0]);
    const response = await chai.request(app).post('/login').send(userLogin);
    const response2 = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${response.body.token}`).send();
    expect(response2.body).to.deep.eq({ message: 'Jogo atualizado'})
    updateStub.restore();
  });

  it('Testando update sem sucesso', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user })
    const updateStub = sinon.stub(SequelizeMatches, 'update').resolves(undefined);
    const response = await chai.request(app).post('/login').send(userLogin);
    const response2 = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${response.body.token}`).send();
    expect(response2.body).to.deep.eq({ message: 'Jogo atualizado'})
    updateStub.restore();
  });

  it('Testando createMatch correto', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user })
    const updateStub = sinon.stub(SequelizeMatches, 'create').resolves(createMatchModel as any);
    const response = await chai.request(app).post('/login').send(userLogin);
    const response2 = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(jsonCreateMacth);
    expect(response2.body).to.deep.eq(createMatchModel)
    updateStub.restore();
  });


  it('Testando createMatch com times iguais', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user });
    const updateStub = sinon.stub(SequelizeMatches, 'create').resolves(createMatchModelEqual as any);
    const response = await chai.request(app).post('/login').send(userLogin);
    const response2 = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(jsonCreateMacthEqual);
    expect(response2.body).to.deep.eq({ message: 'It is not possible to create a match with two equal teams'})
    updateStub.restore();
  });

  it('Testando createMatch com times inexistente', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user })
    sinon.stub(TeamsModel.prototype, 'findById').onFirstCall().resolves(null);
    const updateStub = sinon.stub(SequelizeMatches, 'create').resolves(createMatchModel as any);
    const response = await chai.request(app).post('/login').send(userLogin);
    const response2 = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(jsonCreateMacth);
    expect(response2.body).to.deep.eq({ message: 'There is no team with such id!'})
    updateStub.restore();
  });
});
