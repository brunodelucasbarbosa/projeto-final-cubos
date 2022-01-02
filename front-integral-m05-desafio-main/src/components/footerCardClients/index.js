import './styles.css'
import {useHistory} from 'react-router-dom'

function FooterCardClients ({filtroPagas, filtroVencidas, filtroPrevistas, id}){
    
  const history = useHistory();

  function handleSetFiltro(e) {
    history.push(`/cobrancas/${e.target.id}`)
  }

  return(
        <>
        <div className="footerLinhaUser" >
         <span
         style={{textDecoration: 'underline', cursor: 'pointer'}} 
         to="/home"
         id={id}
         onClick={e=> handleSetFiltro(e)}
         className="footherCards"
         >Ver todos</span>
       </div>
       </>

    )
}
export default FooterCardClients;