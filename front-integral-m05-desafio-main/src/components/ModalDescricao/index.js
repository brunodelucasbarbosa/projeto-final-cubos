import './styles.css'
import  cobranca from '../../assets/cobrançasblack.svg'

function ModalConfirmed({ isOpen, onToggleModal, nome, descricao, valor, id, data_vencimento, status}){
  
  if(!isOpen){
    return null;
  }

  return (
        
        <div className = "containerModalDescricao" >
          <div className='cardModalDescricao'>
              <nav className='closeDescricao'>
                 <h1 onClick = {onToggleModal}>X</h1>
              </nav>
            <header className='headerDescricaoCob'>
              <img src = {cobranca} alt = "cobrança"/>
              <h1>Detalhe da Cobrança</h1>
            </header>
            <section>
              <div className='elementosCard'>
                <h3>Nome</h3>
                <p>{nome}</p>
              </div>
              <div className='elementosCard'>
                <h3>Descrição</h3>
                <p className='descP'>{descricao}</p>
              </div>
              <div className='elementosCard duploEle'>
                <div>
                  <h3>Vencimento</h3>
                  <p>{data_vencimento}</p>
                </div>
                <div>
                  <h3>Valor</h3>
                  <p>R${valor}</p>
                </div>
              </div>
              <div className='elementosCard duploEle'>
                <div>
                  <h3>ID Cobrança</h3>
                  <p>{id}</p>
                </div>
                <div>
                  <h3>Status</h3>
                  <p id={status}>{status}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }
    export default ModalConfirmed;
    

