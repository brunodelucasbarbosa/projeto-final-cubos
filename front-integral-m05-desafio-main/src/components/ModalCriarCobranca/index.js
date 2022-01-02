import './styles.css'
import { useState } from 'react'
import close from '../../assets/CLOSE.svg'
import IconCobranca from '../../assets/icon-cobranca.svg'
import { ToastContainer, toast } from 'react-toastify';
import ButtonRosa from '../ButtonRosa';
import InputMask from 'react-input-mask'
import useAuth from '../../hooks/useLoginProvider';


import Radio from '@mui/material/Radio';


function ModalCriarCobranca({ setModalCriarCobranca, idClienteCobranca, nomeCobranca }) {
  const { token } = useAuth();
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vencimento, setVencimento] = useState('');

  const [erroDescricao, setErroDescricao] = useState(false);
  const [erroVencimento, setErroVencimento] = useState(false);
  const [erroValor, setErroValor] = useState(false);

  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  async function handleSubmitCobranca(e) {
    e.preventDefault();
    if (!descricao) {
      return setErroDescricao(true);
    } else {
      setErroDescricao(false);
    }
    const vencimentoFormat = vencimento.replace(/[^\d]/g, '');
    const dia = vencimentoFormat.substr(0,2);
    const mes = vencimentoFormat.substr(2,2);
    const ano = vencimentoFormat.substr(4,4);
    if (!vencimento || vencimentoFormat.length !== 8) {
      return setErroVencimento(true);
    } else {
      setErroVencimento(false)
    }
    if (!valor) {
      return setErroValor(true);
    } else {
      setErroValor(false);
    }
    const status_cobranca = selectedValue === 'a' ? 'Paga' : 'Pendente';

    const cobrancaEnviar = {
      cliente_id: idClienteCobranca,
      data_vencimento: `${ano}-${mes}-${dia}`,
      descricao,
      valor,
      status_cobranca
    }

    const promise = await fetch('https://back-end-equipe15.herokuapp.com/cobrancas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
      body: JSON.stringify(cobrancaEnviar)
    });
    const response = await promise.json();

    if (response.status !== 201) {
      return toast.error('Falha ao cadastrar cobrança!!', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    return toast.success('Cobrança cadastrada com sucesso!', {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  return (
    <form onSubmit={handleSubmitCobranca}>
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

      <div className="containerModalEdit" >
        <div className="modalCadCliente">
          <header className="cadHead">
            <div className="close botao">
              <img
                src={close}
                alt="close modal"
                onClick={() => setModalCriarCobranca(false)}
              />
            </div>
            <div className="cadHeader">
              <img src={IconCobranca}
                alt="icon user"
              />
              <h1>Cadastro de Cobrança</h1>
            </div>

          </header>
          <section>
            <div className="cad" >
              <label htmlFor="nome" >Nome*</label>
              <input
                value={nomeCobranca}
                required
                readOnly
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
              />
            </div>
            <div className="cad cad-descricao">
              <label htmlFor="descricao">Descrição*</label>
              <textarea
                style={{ border: erroDescricao ? '1px solid red' : '' }}
                id="descricao"
                cols="30"
                rows="5"
                placeholder="Digite a descrição"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
              ></textarea>
              {erroDescricao &&
                <span className="form-error">Este campo deve ser preenchido</span>}
            </div>

            <div className="cpfTell">
              <div className="cad">
                <label htmlFor="vencimento"> Vencimento*</label>
                <InputMask mask="99/99/9999" value={vencimento} onChange={e => setVencimento(e.target.value)}>
                  <input
                    style={{ border: erroVencimento ? '1px solid red' : '' }}
                    id="vencimento"
                    name="vencimento"
                    placeholder="Data de Vencimento"
                  />
                </InputMask>
                {erroVencimento &&
                  <span className="form-error">Este campo deve ser preenchido</span>}
              </div>
              <div className="cad">
                <label htmlFor="valor"> Valor:*</label>
                <input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
                style={{ border: erroValor ? '1px solid red' : '' }}
                id="valor" />
                {erroValor &&
                  <span className="form-error">Este campo deve ser preenchido</span>}
              </div>
            </div>

            <div className="cad">
              <div className="input-status">
                <label htmlFor="status">Status:*</label>
                <div>
                  <Radio
                    id="status"
                    checked={selectedValue === 'a'}
                    onChange={handleChange}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                    labelPlacement="top"
                  /> <span>Cobrança Paga</span>
                </div>
                <div>

                  <Radio
                    id="status"
                    checked={selectedValue === 'b'}
                    onChange={handleChange}
                    value="b"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'B' }}
                  /><span>Cobrança Pendente</span>
                </div>
              </div>
            </div>

            <div className="btn">
              <ButtonRosa texto="Aplicar" />
              <button
                onClick={() => setModalCriarCobranca(false)}
                className="tela_cadCli_direita_botao_cadCli botao">Cancelar</button>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
export default ModalCriarCobranca;


