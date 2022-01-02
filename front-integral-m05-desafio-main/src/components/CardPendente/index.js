import './styles.css'
import cobrançaPendente from '../../assets/iconCorbançaPendente.svg'

function CardPrevisto({valor}) {
    return (
      <div className = "containerCardPrevisto" >
       <div className = "CardPrevisto" >
        <img src = {cobrançaPendente} alt = "icon prevista"/>
          <div className = "textDia" >
            <b className = "titulo">Cobranças Prevista</b>
            <b className = "valor">R$ {valor}</b>
          </div>
       </div>
      </div>
    );
  }
  
  export default CardPrevisto;
  