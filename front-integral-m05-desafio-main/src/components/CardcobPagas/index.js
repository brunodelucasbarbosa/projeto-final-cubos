import './styles.css'
import ClientIdValor from '../ClientIdValor'
import LinhaClientes from '../LinhaClientesCard';
import FooterCardClients from '../footerCardClients';

function CardCobPagas({cobrancasPagas, qntdPagas}) {

    return (
      <div className = "containerCobPagas">
        <div className = "headerCobPagas">
         <h1 className = "h1titulo">Cobranças Pagas</h1>
         <h1 className = "h1numpagas h1num">{qntdPagas}</h1>
        </div>
        <ClientIdValor/>
        {
          cobrancasPagas.map(cobrancaPaga =>{
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
          id="Pagas"
        />
      </div>
    );
  }
  
  export default CardCobPagas;
  