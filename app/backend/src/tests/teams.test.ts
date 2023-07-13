import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { team, teams } from './mocks/Teams.mock';
import SequelizeTeams from '../database/models/SequelizeTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando Teams', () => {
  beforeEach(() => sinon.restore())

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Testando getAll', async function (){
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(teams);
  });

  it('Testando getById', async function (){
    sinon.stub(SequelizeTeams, 'findByPk').resolves(team as any);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.eq(200);
    expect(body).to.deep.equal(team);
  });

  it('Testando getById com id inválido', async function (){
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/1');
    
    expect(status).to.eq(200);
    expect(body).to.deep.equal(null);
  });
});
