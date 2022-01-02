import './styles.css';
import iconX from '../../assets/iconClienteInadimplente.svg'

function HeaderClienteInadimplente({qntd}) {
    return (
     
        <div className = "headercompBig">
        <div className = "sectionCliInad">
          <img src = {iconX} alt = "icon cliente inadimplente"/>
          <h1 className = "h1titulo">Clientes inadimplentes</h1>
        </div>
          <h1 className = "h1numinad h1num">{qntd}</h1>
        
       </div>

    );
  }
  
  export default HeaderClienteInadimplente;