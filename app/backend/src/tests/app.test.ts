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
    server = new App().app.listen(3999);
  });

  afterEach(() => {
    server.close();
  });
  it('Testando app.start', async () => {
    const listenSpy = sinon.spy(app, 'listen');
    const port = 3998;
    new App().start(port);
  });
});
