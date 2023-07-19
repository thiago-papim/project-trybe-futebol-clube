import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { team, teams } from './mocks/Teams.mock';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { user, userLogin } from './mocks/Login.mock';
import { tokenGenerate } from '../utils/JWT';
import UsersService from '../services/UsersService';
import loginValidator from '../utils/loginValidator';
import UsersModel from '../models/UsersModel';

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

  it('Testando /role em Login sem token', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user });
    const response2 = await chai.request(app).get('/login/role').set('Authorization', '').send(); 
    expect(response2.status).to.eq(401);
    expect(response2.body).to.deep.equal({message: 'Token not found'})
  })

  it('Testando /role em Login', async function (){
    sinon.stub(UsersService.prototype, 'findByEmail').resolves({ code: 200, data: user });
    const response = await chai.request(app).post('/login').send(userLogin);
    const response2 = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${response.body.token}`).send(); 
    expect(response2.status).to.eq(200);
    expect(response2.body).to.deep.equal({role: 'admin'})
  })

  it('Testando service corretamente', async function (){
    sinon.stub(UsersModel.prototype, 'findByEmail').resolves(user);
    await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: '123456' })
    const { status } = await chai.request(app).post('/login')
    .send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    });    
    expect(status).to.eq(200);
  });
});
