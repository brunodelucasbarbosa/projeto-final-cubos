const express = require('express');
const { userRegister, userDetail, userUpdate } = require('./controllers/users');
const tokenVerify = require('./auth/tokenVerify');
const { clientRegister, clientDetail, updateClient, listClients } = require('./controllers/clients');
const { login } = require('./controllers/login');
const { cadastrarCobranca, listarCobrancas, editarCobrancas, listarCobrancasPorUsuario, detalharCobranca, excluirCobranca, listarCobrancasPorStatus } = require('./controllers/cobrancas');

const routes = express();

routes.post('/register', userRegister);
routes.post('/login', login);

routes.use(tokenVerify);
routes.get('/user', userDetail);
routes.put('/user', userUpdate);

routes.post('/clients', clientRegister);
routes.get('/clients/:id', clientDetail);
routes.put('/clients/:id', updateClient);

routes.get('/clients', listClients);

routes.post('/cobrancas', cadastrarCobranca);
routes.get('/cobrancas', listarCobrancas);
routes.get('/cobrancas-iniciais', listarCobrancasPorStatus);
routes.put('/cobrancas/:id', editarCobrancas)
routes.get('/cobrancas/:id', listarCobrancasPorUsuario)
routes.delete('/cobrancas/:id', excluirCobranca)

routes.get('/detalharcobranca/:id', detalharCobranca)



module.exports = routes;
