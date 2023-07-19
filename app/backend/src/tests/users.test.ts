import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { team, teams } from './mocks/Teams.mock';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { user } from './mocks/Login.mock';
import { tokenGenerate } from '../utils/JWT';
import UsersService from '../services/UsersService';
import loginValidator from '../utils/loginValidator';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando Login', () => {
  beforeEach(() => sinon.restore())

  it('Testando Login sem email', async function (){
    const { status, body } = await chai.request(app).post('/login').send({
      "email": "",
      "password": "secret_dmin"
    });   

    expect(status).to.eq(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testando Login sem password', async function (){
    const { status, body } = await chai.request(app).post('/login').send({
      "email": "teste@teste.com",
      "password": ""
    });   

    expect(status).to.eq(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testando Login com password invalido e valido', async function (){
    const teste = loginValidator('teste@teste.com', '123456')
    const teste2 = loginValidator('teste@teste.com', '12345')
    expect(teste).to.be.true;
    expect(teste2).to.be.false;
  });

  it('Testando Login com email invalido', async function (){
    const teste = loginValidator('teste.com', '123456')
    expect(teste).to.be.false;
  });
    it('Testando Login com token incorreto', async function (){
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login')
    // .set('Authorization', 'teste')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });   

    expect(status).to.eq(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testando Login com token correto', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user });
    const { body: token } = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: '123456' })
    const { status, body } = await chai.request(app).post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });    
    expect(status).to.eq(200);
    expect(body).to.deep.equal(token)
  });
});
