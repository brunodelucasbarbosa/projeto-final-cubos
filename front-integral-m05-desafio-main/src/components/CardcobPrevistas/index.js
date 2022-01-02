import './styles.css'
import ClientIdValor from '../ClientIdValor'
import LinhaClientes from '../LinhaClientesCard';
import FooterCardClients from '../footerCardClients';

function CardCobPrevistas({ cobrancasPendentes, qntdPendentes }) {
  return (
    <div className="containerCobPrevistas">
      <div className="headerCobPrevistas">
        <h1 className="h1titulo">Cobranças Previstas</h1>
        <h1 className="h1numprevista h1num">{qntdPendentes}</h1>
      </div>
      <ClientIdValor />
      {
        cobrancasPendentes.map(cobrancaPaga => {
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
        id="Pendentes" />
    </div>
  );
}

export default CardCobPrevistas;
