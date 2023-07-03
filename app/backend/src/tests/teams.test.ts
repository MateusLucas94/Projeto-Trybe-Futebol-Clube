import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

import {
  allTeamsMock, oneTeamMock
} from './mocks/teams.mock';
import { Login } from '../interfaces';

const { expect } = chai;

describe('Teste de Teams', () => {
   let chaiHttpResponse: Response;
   
  it('É possível buscar todos os times corretamente', async () => {
    sinon.stub(TeamsModel, "findAll").resolves(allTeamsMock as TeamsModel[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMock);

    (TeamsModel.findAll as sinon.SinonStub).restore();
  });

  it('É possível buscar um time específico pelo seu id', async () => {
    sinon.stub(TeamsModel, "findOne").resolves(oneTeamMock as TeamsModel);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(oneTeamMock);

    (TeamsModel.findOne as sinon.SinonStub).restore();
  });


});
