import './styles.css'
import iconSair from '../../assets/iconSair.svg'
import iconEditar from '../../assets/iconEditar.svg'
import useUser from '../../hooks/useUser';

function CardConfig({isOpen, onToggleModal, onToggleModalConf}) {

  const {ToastContainer, handleLogout} = useUser()

  if (!isOpen) {
    return null;
  }

    return (
      <div className = "containerConf">
        <ToastContainer
        className="toast-error"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div className = "triangulo"></div>
      <div className = "containerCardConfig" >
       <div className = "CardConfig">
         <div  onClick={onToggleModal} className="botao">
          <img src = {iconEditar} alt = "Icone de edição" onClick = {onToggleModalConf}/>
          <p >
            Editar
          </p>
         </div>
         <div onClick={e => handleLogout(e)} className="botao">
          <img src = {iconSair} alt = "Icone de sair"/>
          <p>Sair</p>
         </div>
         </div>
      </div>
      </div>
    );
  }
  
  export default CardConfig;
  