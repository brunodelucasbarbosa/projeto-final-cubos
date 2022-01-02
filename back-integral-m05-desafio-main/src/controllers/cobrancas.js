const knex = require('../db/connection');
const { cobrancasSchema } = require('../schemas/schemas');
const verificarSituacaoCliente = require('../helpers/verificarSituacaoCliente');

async function cadastrarCobranca(req, res) {
  // data no formato: AAAA-MM-DD
  const { cliente_id, data_vencimento, descricao, valor, status_cobranca } = req.body;

  try {
    await cobrancasSchema.validate(req.body);
    const hoje = new Date();
    const dataVencimentoFormat = new Date(data_vencimento);
    let statusCobrancaReal;

    if (status_cobranca === 'Pendente' && dataVencimentoFormat < hoje) {
      statusCobrancaReal = 'Vencida';
    } else if (status_cobranca === 'Pendente' && dataVencimentoFormat >= hoje) {
      statusCobrancaReal = 'Pendente';
    } else if (status_cobranca === 'Paga') {
      statusCobrancaReal = 'Paga';
    }

    const { rowCount } = await knex("cobrancas").insert({
      cliente_id,
      data_vencimento,
      descricao,
      valor,
      status_cobranca: statusCobrancaReal,
    });


    if (rowCount === 0) {
      return res.status(500).json({ status: 500, message: "Ops... Não foi possivel registrar a cobrança" });
    }

    await verificarSituacaoCliente(cliente_id);

    return res.status(201).json({ status: 201, message: "Cobrança cadastrada com sucesso!" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

async function listarCobrancas(req, res) {
  try {
    const cobrancas = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').select('clientes.nome', 'cobrancas.*');

    const cobrancasVencidas = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('cobrancas.status_cobranca', 'Vencida').select('clientes.nome', 'cobrancas.*');

    const cobrancasPendentes = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('cobrancas.status_cobranca', 'Pendente').select('clientes.nome', 'cobrancas.*');

    const cobrancasPagas = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('cobrancas.status_cobranca', 'Paga').select('clientes.nome', 'cobrancas.*');

    return res.status(200).json({ status: 200, cobrancas, cobrancasVencidas, cobrancasPendentes, cobrancasPagas });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function editarCobrancas(req, res) {
  const { data_vencimento, descricao, valor, status_cobranca, cliente_id } = req.body;
  const { id } = req.params;

  try {
    await cobrancasSchema.validate(req.body);

    const hoje = new Date();
    const dataVencimentoFormat = new Date(data_vencimento);
    let statusCobrancaReal;

    if (status_cobranca === 'Pendente' && dataVencimentoFormat < hoje) {
      statusCobrancaReal = 'Vencida';
    } else if (status_cobranca === 'Pendente' && dataVencimentoFormat >= hoje) {
      statusCobrancaReal = 'Pendente';
    } else if (status_cobranca === 'Paga') {
      statusCobrancaReal = 'Paga';
    }

    const { rowCount } = await knex('cobrancas').update({
      cliente_id,
      data_vencimento,
      descricao,
      valor,
      status_cobranca: statusCobrancaReal
    }).where({ id });

    if (rowCount === 0) {
      return res.status(500).json({ status: 500, message: 'Erro ao atualizar cobrança!' })
    }

    await verificarSituacaoCliente(cliente_id);

    return res.status(201).json({ status: 201, message: 'Cobrança atualizada com sucesso!' })

  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

async function listarCobrancasPorUsuario(req, res) {
  const { id } = req.params;

  try {
    const cobrancas = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('clientes.id', id).select('clientes.nome', 'cobrancas.*');

    return res.status(200).json({ status: 200, cobrancas });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function detalharCobranca(req, res) {
  const { id } = req.params;

  try {
    const cobrancas = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('cobrancas.id', id).select('clientes.nome', 'cobrancas.*').first();

    return res.status(200).json({ status: 200, cobrancas });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

const excluirCobranca = async (req, res) => {
  const { id } = req.params;

  try {
    const cobranca = await knex('cobrancas').where({ id })

    if (cobranca.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Não existe esta cobrança.'
      })
    }

    if (cobranca[0].status_cobranca === 'Pendente') {
      const { rowCount } = await knex('cobrancas').delete().where({ id });
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Falha ao excluir a cobrança.'
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Não é possível excluir esta cobrança pois já foi paga ou está vencida!'
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Cobrança excluída com sucesso.',
      cobranca: cobranca[0]
    });

  } catch (error) {
    return res.status(400).json({
      status: 400,
      erro: error.message
    });
  }
}

async function listarCobrancasPorStatus(req, res) {

  try {
    const valorCobrancasPagas = await knex('cobrancas').where('status_cobranca', 'Paga').sum('valor');
    const valorCobrancasVencidas = await knex('cobrancas').where('status_cobranca', 'Vencida').sum('valor');
    const valorCobrancasPendentes = await knex('cobrancas').where('status_cobranca', 'Pendente').sum('valor');

    const cobrancasPagas = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('cobrancas.status_cobranca', 'Paga').select('clientes.nome', 'cobrancas.*').limit(4);
    const cobrancasVencidas = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('cobrancas.status_cobranca', 'Vencida').select('clientes.nome', 'cobrancas.*').limit(4);

    const cobrancasPendentes = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('cobrancas.status_cobranca', 'Pendente').select('clientes.nome', 'cobrancas.*').limit(4);

    const qntdCobrancasPagas = await knex('cobrancas').where('status_cobranca', 'Paga').count().first();
    const qntdCobrancasVencidas = await knex('cobrancas').where('status_cobranca', 'Vencida').count().first();
    const qntdCobrancasPendentes = await knex('cobrancas').where('status_cobranca', 'Pendente').count().first();

    const clientesInadimplentes = await knex('clientes').where('status_cliente', 'INADIMPLENTE').limit(4);

    const clientesEmDia = await knex('clientes').where('status_cliente', 'EM DIA').limit(4);

    const qntdClientesEmDia = await knex('clientes').where('status_cliente', 'EM DIA').count();

    const qntdClientesInadimplentes = await knex('clientes').where('status_cliente', 'INADIMPLENTE').count();

    return res.status(200).json({ status: 200, qntdCobrancasPagas, qntdCobrancasVencidas, qntdCobrancasPendentes, valorCobrancasPagas, valorCobrancasVencidas, valorCobrancasPendentes, cobrancasPagas, cobrancasVencidas, cobrancasPendentes, clientesInadimplentes, clientesEmDia, qntdClientesEmDia, qntdClientesInadimplentes });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}



module.exports = {
  cadastrarCobranca,
  listarCobrancas,
  editarCobrancas,
  listarCobrancasPorUsuario,
  detalharCobranca,
  excluirCobranca,
  listarCobrancasPorStatus
};
