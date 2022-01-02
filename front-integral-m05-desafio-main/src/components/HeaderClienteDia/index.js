import './styles.css';
import iconv from '../../assets/iconClienteDia.svg'

function HeaderClienteEmDia({qntd}) {
    return (
     
        <div className = "headercompBig">
        <div className = "sectionCliInad">
          <img src = {iconv} alt = "icon cliente em dia"/>
          <h1 className = "h1titulo">Clientes Em dia </h1>
        </div>
          <h1 className = "h1numEmdia h1num">{qntd}</h1>
        
       </div>

    );
  }
  
  export default HeaderClienteEmDia;