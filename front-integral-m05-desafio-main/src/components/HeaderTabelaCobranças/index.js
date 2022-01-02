import './styles.css'
import setas from '../../assets/setas.svg'

function HeaderTableCobrança({ordemID, odernarNome}) {

    return (
      <>
      <ul className = "headercobrança">
        <li>
          <img src = {setas} alt = "setas" onClick={odernarNome} />
          <p>Cliente</p>
        </li>
        <li>
          <img src = {setas} alt = "setas" onClick={ordemID}/>
          <p> ID cob.</p>
        </li>
        <li>Valor</li>
        <li>Data de venc.</li>
        <li>Status</li>
        <li className = "descricaoCob">Descrição</li>
        <li></li>
      </ul>
      </>
    );
  }
  
  export default HeaderTableCobrança;
  