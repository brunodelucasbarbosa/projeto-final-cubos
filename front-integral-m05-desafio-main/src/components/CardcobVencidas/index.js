import './styles.css'
import ClientIdValor from '../ClientIdValor'
import LinhaClientes from '../LinhaClientesCard';
import FooterCardClients from '../footerCardClients';

function CardcobVencidas({ cobrancasVencidas, qntdVencidas }) {
  return (
    <div className="containerCobVencidas">
      <div className="headerCobVencidas">
        <h1 className="h1titulo">Cobranças Vencidas</h1>
        <h1 className="h1num h1numVenc">{qntdVencidas}</h1>
      </div>
      <ClientIdValor />
      {
        cobrancasVencidas.map(cobrancaPaga => {
          return (
            <LinhaClientes
              idCob={cobrancaPaga.id}
              valor={cobrancaPaga.valor}
              clienteNome={cobrancaPaga.nome}
            />
          )
        })
      }

      <FooterCardClients
        id="Vencidas" />
    </div>
  );
}

export default CardcobVencidas;
