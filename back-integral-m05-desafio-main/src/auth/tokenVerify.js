const jwt = require('jsonwebtoken');
const knex = require('../db/connection');
const {authToken} = require('../jwt');
//AUTH -> tokenVerify.js
async function validaToken(req, res, next) {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({mensagem: "Para acessar este recurso o usuário deverá enviar um token válido."});
    }
    
    try {
        const token = authorization.replace('Bearer ', '').trim();
        const {id} = jwt.verify(token, authToken);
        const searchUser = await knex('usuarios').where('id', id)
        
        if(searchUser.length === 0) {
            return res.status(400).json('O usuário não foi encontrado');
        }

        const {password, ...user} = searchUser[0];
        req.user = user;
        next();
    }
    catch (erro) {
        if (erro.name === 'JsonWebTokenError' || erro.name === 'TokenExpiredError') {
            return res.status(401).json({mensagem: "Para acessar este recurso o usuário deverá enviar um token válido."});
        }

        return res.status(500).json({mensagem: "Ocorreu um erro inesperado. - " + erro.message});
    }
}

module.exports = validaToken;