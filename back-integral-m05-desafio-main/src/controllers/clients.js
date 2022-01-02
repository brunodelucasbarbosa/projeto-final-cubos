const knex = require('../db/connection');
const { clientRegisterUpdateSchema } = require('../schemas/schemas');

const clientRegister = async (req, res) => {
  const { nome, email, cpf, telefone, logradouro, complemento, cep, bairro, cidade, uf } = req.body;
  const { id } = req.user;

  try {
    await clientRegisterUpdateSchema.validate(req.body);
    const verificarEmailExiste = await knex('clientes').where({email}).first();
    const verificarCPFExiste = await knex('clientes').where({cpf}).first();
    const verificarTelefoneExiste = await knex('clientes').where({telefone}).first();

    if(verificarEmailExiste || verificarCPFExiste || verificarTelefoneExiste) {
      return res.status(400).json({status: 400, message: "Já existe um cliente com estes dados!"})
    }

    const { rowCount } = await knex('clientes').insert({
      nome,
      email,
      usuario_id: id,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      uf
    });

    if (rowCount === 0) {
      return res.status(404).json({ status: 404, message: "Ocorreu um erro ao cadastrar o cliente!" })
    }

    return res.status(201).json({ status: 201, message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return res.json(error.message);
  }
};

const clientDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const clienteDetalhado = await knex('clientes').where({ id })

    if (clienteDetalhado.length === 0) {
      return res.status(400).json({ status: 400, message: "Falha ao encontrar o cliente!" })
    }

    return res.status(200).json({ status: 200, clienteDetalhado })
  } catch (error) {
    return res.json(error.message)
  }
};

const updateClient = async (req, res) => {
  const { id: clientId } = req.params;
  const { nome, email, cpf, telefone, logradouro, complemento, cep, bairro, cidade, uf } = req.body;
 
  try {
    await clientRegisterUpdateSchema.validate(req.body);
    
    const existeEmail = await knex('clientes').where({email});
    const existeTelefone = await knex('clientes').where({telefone});
    const existeCpf = await knex('clientes').where({cpf});
    
    if( existeEmail[0] && existeEmail[0].id === clientId ){
      return res.status(400).json(
        {
          status: 400,
          mensagem: "Já existe usuário cadastrado com o e-mail informado."
        });
    }
    if( existeTelefone[0] && existeTelefone[0].id === clientId ){
      return res.status(400).json(
        {
          status: 400,
          mensagem: "Já existe usuário cadastrado com o telefone informado."
        });
    }
    if( existeCpf[0] && existeCpf[0].id === clientId ){
      return res.status(400).json(
        {
          status: 400,
          mensagem: "Já existe usuário cadastrado com o cpf informado."
        });
    }

    const clienteAtual = await knex('clientes').where('id', clientId);
    const { nome: nomeAtual, email: emailAtual, cpf: cpfAtual, telefone: telefoneAtual, logradouro: logradouroAtual, complemento: complementoAtual, cep: cepAtual, bairro: bairroAtual, cidade: cidadeAtual, uf: ufAtual } = clienteAtual[0];

    const clienteAtualizado = await knex('clientes').update({
      nome,
      email,
      cpf,
      telefone,
      cep: cep || cepAtual,
      logradouro: logradouro || logradouroAtual,
      complemento: complemento || complementoAtual,
      bairro: bairro || bairroAtual,
      cidade: cidade || cidadeAtual,
      uf: uf || ufAtual
    }).where('id', clientId);

    if (clienteAtualizado.length === 0) {
      return res.status(400).json({ status: 400, message: "Falha ao encontrar o cliente!" })
    }

    return res.status(201).json({status: 201, message: "Cliente atualizado com sucesso!"})

  } catch (error) {
    return res.json(error.message)
  }
};

const listClients = async (req, res) => {
  try {
    const clientesListados = await knex('clientes').returning('*')
    const clientesEmDia = await knex('clientes').where('status_cliente', 'EM DIA').returning('*')
    const clientesInadimplentes = await knex('clientes').where('status_cliente', 'INADIMPLENTE').returning('*')


    if(clientesListados.length === 0) {
      return res.status(400).json({status: 400, message: "Nenhum cliente encontrado"})
    }

    return res.status(200).json({status: 200, clientes: clientesListados, clientesEmDia, clientesInadimplentes});
  } catch (error) {
    return res.json(error.message)
  }
}

module.exports = {
  clientRegister,
  clientDetail,
  updateClient,
  listClients
}
