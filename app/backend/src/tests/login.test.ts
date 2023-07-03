import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

import {
  userMock,
  validLogin,
  validationLoginEmail,
  validationLoginPassword,
  emailVazio,
  passwordVazia,
  mockTokenVerification,
} from './mocks/login.mock';
import { Login } from '../interfaces';

const { expect } = chai;

describe('Teste de Login', () => {
   let chaiHttpResponse: Response;
   
  afterEach(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('É possível fazer login com os dados corretos, retornando um token', async () => {
    sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(validLogin);
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Retorna mensagem de erro caso e-mail seja inválido', async () => {
    sinon.stub(UserModel, "findOne").resolves(null);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(validationLoginEmail);

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('Retorna mensagem de erro caso senha seja inválida', async () => {
    sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(validationLoginPassword);

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('Não é possível realizar login sem e-mail ou senha', async () => {
    sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(emailVazio);

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('Não é possível realizar login sem e-mail ou senha', async () => {
    sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(passwordVazia);

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('Na rota /login/validate é possível receber o cargo correto do usuário', async () => {
    sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);
    sinon.stub(jwt, 'verify').resolves(mockTokenVerification as Login)
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('Authorization', 'token')
    
       expect(chaiHttpResponse.status).to.be.eq(200);
       expect(chaiHttpResponse.body).to.have.property('role');
  })
});
