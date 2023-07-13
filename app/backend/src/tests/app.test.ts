import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

chai.use(chaiHttp);

import { app, App } from '../app';
import Example from '../database/models/ExampleModel';

const { expect } = chai;

describe('Testando App', function() {
  let server: any;

  beforeEach(() => {
    server = new App().app.listen(3999); // Inicia o servidor na porta 3001 antes de executar os testes
  });

  afterEach(() => {
    server.close(); // Encerra o servidor após a execução dos testes
  });
  it('Testando app.start', async () => {
    const listenSpy = sinon.spy(app, 'listen');

    // Chama a função start com um número de porta fictício
    const port = 3998;
    new App().start(port);
  });
  it('Testando Server', async function() {
    const res = await chai.request(server).get('/');

    expect(res).to.have.status(200);
    expect(res.body).to.eql({ ok: true });
  })
});
