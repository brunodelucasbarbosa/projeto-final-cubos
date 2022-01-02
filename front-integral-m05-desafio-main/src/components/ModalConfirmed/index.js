import './styles.css'
import confirm from '../../assets/confirm.svg'

function ModalConfirmed({ isOpen, onToggleModal}){
  
  if(!isOpen){
    return null;
  }

  return (
        
        <div className = "containerModalConfirm" onClick = {onToggleModal}>
          <div className = "cardModalConfirm">
            <img 
            src = {confirm} 
            alt = "confirmado"
            />
            <h1>Cadastro Alterado com sucesso!</h1>
          </div>
        </div>
      );
    }
    export default ModalConfirmed;
    

