import './styles.css'
import HeaderClienteInadimplente from '../HeaderClienteInadimplente'
import ClientDateValor from '../ClientDateValor'
import LinhaCardGrand from '../LinhaCardGrand'
import FooterCardBig from '../footerCardBig'

function CardInadimplenetes({clientesInadimplentes, qntd}) {
    return (
      <div className = "containerCobVencidas">
        <HeaderClienteInadimplente qntd={qntd}/>
        <ClientDateValor/>
        {
          clientesInadimplentes.map(clienteEmDia =>{
            return (
              <LinhaCardGrand 
              nome={clienteEmDia.nome}
              cpf={clienteEmDia.cpf}
              id={clienteEmDia.id}/>
            )
          })
        }

        <FooterCardBig
        id="Inadimplente"/>
      </div>
    );
  }
  
  export default CardInadimplenetes;
  