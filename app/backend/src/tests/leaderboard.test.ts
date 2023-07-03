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
  allTeamsMock, allMatchesMock
} from './mocks/leaderboard.mock';
import { Login, Matches } from '../interfaces';
import MatchesModel from '../database/models/MatchesModel';

const { expect } = chai;

describe('Teste de Leaderboard', () => {
   let chaiHttpResponse: Response;
   
    it('É possível buscar a tabela de classificação dos jogos em casa corretamente', async () => {
    sinon.stub(TeamsModel, "findAll").resolves(allTeamsMock as TeamsModel[]);
    sinon.stub(MatchesModel, "findAll").resolves(allMatchesMock as Matches[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.a('array');

    (TeamsModel.findAll as sinon.SinonStub).restore();
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('É possível buscar a tabela de classificação dos jogos fora de casa corretamente', async () => {
    sinon.stub(TeamsModel, "findAll").resolves(allTeamsMock as TeamsModel[]);
    sinon.stub(MatchesModel, "findAll").resolves(allMatchesMock as Matches[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.a('array');

    (TeamsModel.findAll as sinon.SinonStub).restore();
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('É possível buscar a tabela de classificação dos jogos corretamente', async () => {
    sinon.stub(TeamsModel, "findAll").resolves(allTeamsMock as TeamsModel[]);
    sinon.stub(MatchesModel, "findAll").resolves(allMatchesMock as Matches[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard')

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.a('array');

    (TeamsModel.findAll as sinon.SinonStub).restore();
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

});
