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

  it('Testando Login com password invalido', async function (){
    const { status, body } = await chai.request(app).post('/login').send({
      "email": "teste@teste.com",
      "password": "12345"
    });   

    expect(status).to.eq(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testando Login com email invalido', async function (){
    const { status, body } = await chai.request(app).post('/login').send({
      "email": "testeteste.com",
      "password": "12345"
    });   

    expect(status).to.eq(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testando Login com token incorreto', async function (){
    sinon.stub(SequelizeUsers, 'findOne').resolves(user as any);
    const { status, body } = await chai.request(app).post('/login')
    // .set('Authorization', 'teste')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });   

    expect(status).to.eq(200);
    // expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });
});
