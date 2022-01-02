const knex = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { authToken } = require('../jwt')
const { loginSchema } = require('../schemas/schemas')

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    await loginSchema.validate(req.body);

    const verifyEmail = await knex('usuarios').where('email', email);
    if (verifyEmail.length === 0) {
      return res.status(404).json({ status: 404, mensagem: 'O usuario não foi encontrado' })
    }
    const user = verifyEmail[0];
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json('Usuário e/ou password inválido(s).')
    }
    
    const {password: _, id, ...userReturn} = user;
    
    const token = jwt.sign({ id: user.id }, authToken, { expiresIn: '30d' });
    return res.status(200).json({
      status: 200,
      token,
      userReturn
    });
    
  } catch (error) {
    return res.status(400).json({status: 400, mensagem: error.message})
  }
}

module.exports = {
  login
}
