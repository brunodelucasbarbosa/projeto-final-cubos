import './styles.css'
import HeaderClienteDia from '../HeaderClienteDia'
import ClientDateValor from '../ClientDateValor'
import LinhaCardGrand from '../LinhaCardGrand'
import FooterCardBig from '../footerCardBig'

function CardEmDia({clientesEmDia, qntd}) {

    return (
      <div className = "containerCobVencidas">
        <HeaderClienteDia qntd={qntd}/>
        <ClientDateValor/>
        {
          clientesEmDia.map(clienteEmDia =>{
            return (
              <LinhaCardGrand
              nome={clienteEmDia.nome}
              cpf={clienteEmDia.cpf}
              id={clienteEmDia.id}/>
            )
          })
        }

        <FooterCardBig
        id="EmDia"/>
      </div>
    );
  }
  
  export default CardEmDia;
  