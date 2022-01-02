import './styles.css'
import { useState } from 'react';
import atencaoDelete from '../../assets/atencaoDelet.svg'
import { ToastContainer, toast } from 'react-toastify';
import CobrancaExcluida from '../CobrancaExcluida';

function ModalConfirmeDel({ isOpen, onToggleModal, id, token, setCobrançaClientes }) {
  const [excluida, setExcluida] = useState(false);

  if (!isOpen) {
    return null;
  }

  const deletarCobrança = async () => {
    setExcluida(false);
    try {
      const promise = await fetch(`https://back-end-equipe15.herokuapp.com/cobrancas/${ id }`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${ token }`,
        },
      })
      const response = await promise.json();

      if (response.status !== 200) {
        return toast.error('Falha ao excluir cobrança, verifique se está Paga ou Vencida!', {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setCobrançaClientes((prevState) =>
        prevState.filter((cobranca) => cobranca.id !== id)
      );

      return setExcluida(true);

    } catch (error) {
      return error.message;
    }
  }

  return (
    <>
      {excluida && <CobrancaExcluida onToggleModal={onToggleModal} operacao={"excluída"} />}
      {!excluida && <>
      <div className="containerModalDelet" >
        <ToastContainer
          className="toast-error"
          position="top-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme='dark'
        />
        <div className='cardModalDelet'>
          <nav className='closeDescricao'>
            <h1 onClick={onToggleModal}>X</h1>
          </nav>
          <section className='elementosCardDel'>
            <div >
              <img src={atencaoDelete} alt='excluir' />
            </div>
            <h3 className='h3Carddelete'>Tem certeza que deseja excluir esta cobrança?</h3>
            <nav className='btnCardDel'>
              <button className='btnDel btnNao' onClick={onToggleModal}>Não</button>
              <button className='btnDel btnSim' onClick={deletarCobrança}>Sim</button>
            </nav>
          </section>
        </div>
      </div> </>}
    </>
  );
}
export default ModalConfirmeDel;


