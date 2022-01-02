import './styles.css'
import cobrançaVencida from '../../assets/iconCorbançaVencida.svg'

function CardVencido({valor}) {
    return (
      <div className = "containerCardVencido" >
       <div className = "CardVencido" >
        <img src = {cobrançaVencida} alt = "icon vencido"/>
          <div className = "textDia" >
            <b className = "titulo">Cobranças Vencidas</b>
            <b className = "valor">R$ {valor}</b>
          </div>
       </div>
      </div>
    );
  }
  
  export default CardVencido;
  