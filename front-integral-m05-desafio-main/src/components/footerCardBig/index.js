import './styles.css'
import {useHistory} from 'react-router-dom'



function FooterCardBig ({filtroInadimplente, filtroEmDia, id}){

  const history = useHistory();

  function handleSetFiltro(e) {
    history.push(`/clientes/${e.target.id}`)
  }

    return(
        <>
        <div className = "footerLinhaUserBig">
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
export default FooterCardBig;