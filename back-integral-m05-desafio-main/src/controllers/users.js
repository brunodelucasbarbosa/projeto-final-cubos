const knex = require('../db/connection');
const { registerSchema } = require('../schemas/schemas')
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
  const { name, password, email } = req.body;
  
  try {
    await registerSchema.validate(req.body);
    
    const verifyEmail = await knex('usuarios').where('email', email);
    
    if (verifyEmail.length > 0) {
      return res.status(400).json(
        {
          status: 400,
          mensagem: "Já existe usuário cadastrado com o e-mail informado."
        });
    }
    const passwordCrypt = await bcrypt.hash(password, 10);
    const { insertUser } = await knex('usuarios').insert({
      name: name,
      email: email,
      password: passwordCrypt,
    });
    
    if (insertUser === 0) {
      return res.status(400).json(
        {
          status: 400,
          mensagem: 'Não foi possível cadastrar o usuário'
        });
    }
    res.status(201).json(
      {
        status: 201,
        mensagem: 'Usuário cadastrado com sucesso!'
      });

  } catch (erro) {
    return res.status(500).json(
      {
        status: 500,
        mensagem: `Ocorreu um erro inesperado. - ${ erro.message }`
      });
  }
};
const userDetail = async (req, res) => {
  const { id } = req.user;

  try {
    const searchUser = await knex('usuarios').where('id', id);
    if (searchUser.length === 0) {
      return res.status(400).json('Usuário não encontrado');
    }
    const { password, ...user } = searchUser[0];

    return res.status(200).json({ status: 200, user });

  } catch (error) {
    return res.status(404).json(
      {
        status: 404,
        mensagem: error.message
      });
  }
};

const userUpdate = async (req, res) => {
  const { name, email, password, cpf, phone } = req.body;
  const { id } = req.user;
  
  try {
    await registerSchema.validate(req.body)

    const verifyEmail = await knex('usuarios').where({email})
    
    if( verifyEmail[0] && verifyEmail[0].id !== id){
      return res.status(400).json(
        {
          status: 400,
          mensagem: "Já existe usuário cadastrado com o e-mail informado."
        });
    }
    const passwordCrypt = await bcrypt.hash(password, 10);
    const { name: nameAtual, email: emailAtual, cpf: cpfAtual, phone: phoneAtual } = req.user
    const userAtualizado = await knex('usuarios').update({
      name,
      email,
      password: passwordCrypt,
      cpf: cpf || cpfAtual,
      phone: phone || phoneAtual
    })
      .where('id', id).returning('*')

    if (userAtualizado.length === 0) {
      return res.status(400).json(
        {
          status: 400,
          mensagem: 'Não houveram mudanças'
        })
    }
    const searchUser = await knex('usuarios').where('id', id);

    if (searchUser.length === 0) {
      return res.status(400).json(
        {
          erro: 400,
          mensagem: 'Usuário não encontrado'
        });
    }
    const { password: _, ...user } = searchUser[0];
    return res.status(200).json(
      {
        status: 200,
        user
      });

  } catch (error) {
    return res.status(400).json({ status: 400, mensagem: error.message })
  }
};

module.exports = {
  userRegister,
  userDetail,
  userUpdate
}
