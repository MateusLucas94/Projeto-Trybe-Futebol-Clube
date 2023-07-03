import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import MatchesModel from '../database/models/MatchesModel';
import { Matches } from '../interfaces/index'
chai.use(chaiHttp);

import {
  allMatchesMock
} from './mocks/matches.mock';


const { expect } = chai;

describe('Teste de Matches', () => {
   let chaiHttpResponse: Response;
   
  it('É possível buscar todos os jogos corretamente', async () => {
    sinon.stub(MatchesModel, "findAll").resolves(allMatchesMock as Matches[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatchesMock);

    (MatchesModel.findAll as sinon.SinonStub).restore();
  });



});
