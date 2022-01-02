import { useState, useEffect } from 'react'
import close from '../../assets/CLOSE.svg'
import IconCobranca from '../../assets/icon-cobranca.svg'
import { ToastContainer, toast } from 'react-toastify';
import ButtonRosa from '../ButtonRosa';
import InputMask from 'react-input-mask'
import useAuth from '../../hooks/useLoginProvider';
import CobrancaExcluida from '../CobrancaExcluida';

import Radio from '@mui/material/Radio';


function ModalEditarCobranca({openModalEdit, setOpenModalEdit, id, cliente_id, setCobrançaClientes }) {
  const { token } = useAuth();
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [nomeCobranca, setNomeCobranca] = useState('');
  const [erroDescricao, setErroDescricao] = useState(false);
  const [erroVencimento, setErroVencimento] = useState(false);
  const [erroValor, setErroValor] = useState(false);
  const [editada, setEditada] = useState(false);

  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  async function handleSubmitEditCobranca(e) {
    e.preventDefault();
    if (!descricao) {
      return setErroDescricao(true);
    } else {
      setErroDescricao(false);
    }

    const vencimentoFormat = vencimento.replace(/[^\d]/g, '');
    const dia = vencimentoFormat.substr(0, 2);
    const mes = vencimentoFormat.substr(2, 2);
    const ano = vencimentoFormat.substr(4, 4);
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
      cliente_id,
      data_vencimento: `${ ano }-${ mes }-${ dia }`,
      descricao,
      valor,
      status_cobranca
    }
    setEditada(false);
    try {
      const promise = await fetch(`https://back-end-equipe15.herokuapp.com/cobrancas/${ id }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify(cobrancaEnviar)
      });
      const response = await promise.json();
      if (response.status !== 201) {
        return toast.error('Falha ao editar cobrança!', {
          position: "top-right",
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      const linkFetch = window.location.pathname.includes('/clientes') ? `https://back-end-equipe15.herokuapp.com/cobrancas/${ cliente_id}` : 'https://back-end-equipe15.herokuapp.com/cobrancas';

      const promiseCobrancas = await fetch(linkFetch, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      })
      const responseCobrancas = await promiseCobrancas.json();
      console.log(responseCobrancas)
      setCobrançaClientes(responseCobrancas.cobrancas);
      setEditada(true);

      return toast.success('Cobrança editada com sucesso!', {
        position: "top-right",
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      return error.message;
    }


  }


  async function detalharCobranca() {
    try {
      const promise = await fetch(`https://back-end-equipe15.herokuapp.com/detalharcobranca/${ id }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      })
      const response = await promise.json();
      setValor(response.cobrancas.valor);
      setNomeCobranca(response.cobrancas.nome);
      setDescricao(response.cobrancas.descricao);
      const dia = response.cobrancas.data_vencimento.substr(8, 2);
      const mes = response.cobrancas.data_vencimento.substr(5, 2);
      const ano = response.cobrancas.data_vencimento.substr(0, 4);
      setVencimento(`${ dia }/${ mes }/${ ano }`);
      setSelectedValue(response.cobrancas.status_cobranca === 'Paga' ? 'a' : 'b')
    } catch (error) {
      return console.log(error.message);
    }
  }

  useEffect(() => {
    detalharCobranca();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      {editada && <CobrancaExcluida onToggleModal={setOpenModalEdit} operacao={"editada"} />}
      {!editada &&
        <form onSubmit={handleSubmitEditCobranca}>
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
                    onClick={() => setOpenModalEdit(false)}
                  />
                </div>
                <div className="cadHeader">
                  <img src={IconCobranca}
                    alt="icon user"
                  />
                  <h1>Edição de Cobrança</h1>
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
                      value={Number(valor)}
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
                    onClick={() => setOpenModalEdit(false)}
                    className="tela_cadCli_direita_botao_cadCli botao">Cancelar</button>
                </div>
              </section>
            </div>
          </div>
        </form>
      }
    </>
  );
}
export default ModalEditarCobranca;


