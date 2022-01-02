import './styles.css'
import cobrançaPaga from '../../assets/iconCobrançaPaga.svg'

function CardPago({valor}) {
    return (
      <div className = "containerCardPago" >
       <div className = "CardPago" >
        <img src = {cobrançaPaga} alt = "icon pago"/>
          <div className = "textDia" >
            <b className = "titulo">Cobranças pagas</b>
            <b className = "valor">R$ {valor}</b>
          </div>
       </div>
      </div>
    );
  }
  
  export default CardPago;
  