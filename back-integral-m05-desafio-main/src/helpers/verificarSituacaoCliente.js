const knex = require('../db/connection');

async function verificarSituacaoCliente(cliente_id) {
  const verificarSituacaoCliente = await knex('cobrancas').join('clientes', 'cobrancas.cliente_id', '=', 'clientes.id').where('clientes.id', cliente_id).where('cobrancas.status_cobranca', 'ilike', 'Vencida').select('clientes.nome', 'cobrancas.*');

    if (verificarSituacaoCliente.length >= 1) {
      await knex('clientes').update({
        status_cliente: 'INADIMPLENTE'
      }).where('id', cliente_id)
    } else {
      await knex('clientes').update({
        status_cliente: 'EM DIA'
      }).where('id', cliente_id)
    }

}

module.exports = verificarSituacaoCliente