import './styles.css'
import { useEffect } from 'react'
import close from '../../assets/CLOSE.svg'
import useUserCadCliente from '../../hooks/useUserCadCliente'
import user from '../../assets/user.svg'
import { ToastContainer, toast } from 'react-toastify';
import ButtonRosa from '../ButtonRosa';
import InputMask from 'react-input-mask'
import useLogin from '../../hooks/useLoginProvider'

function ModalCadClienteUser({ isOpen, onToggleModal }) {
  const {
    emailCadCliente,
    setEmailCadCliente,
    erroEmailCadCliente,
    setErroEmailCadCliente,
    nameCadCliente,
    setNameCadCliente,
    erroNameCadCliente,
    setErroNameCadCliente,
    cpfCadCliente,
    setCpfCadCliente,
    erroCpfCadCliente,
    setErroCpfCadCliente,
    tellCadCliente,
    setTellCadCliente,
    erroTellCadCliente,
    setErroTellCadCliente,
    enderecoCadCliente,
    setEnderecoCadCliente,
    ComplementoCadCliente,
    setComplementoCadCliente,
    cepCadCliente,
    setCepCadCliente,
    bairroCadCliente,
    setBairroCadCliente,
    cidadeCadCliente,
    setCidadeCadCliente,
    ufCadCliente,
    setUfCadCliente
  } = useUserCadCliente();
  const {token} = useLogin();

  async function consultarCep(cep) {
    try {
      const promise = await fetch(`https://viacep.com.br/ws/${ cep }/json/`);
      const response = await promise.json();
      setBairroCadCliente(response.bairro);
      setComplementoCadCliente(response.complemento);
      setCidadeCadCliente(response.localidade);
      setEnderecoCadCliente(response.logradouro);
      setUfCadCliente(response.uf);
    } catch (error) {
      return error.message;
    }

  }

  useEffect(() => {
    const cepFormat = cepCadCliente.replace(/[^\d]/g, '');
    if(cepFormat.length === 8) {
      consultarCep(cepFormat);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepCadCliente])

  async function handleSubmitCadCliente(e) {
    e.preventDefault();

    if (!nameCadCliente) {
      setErroNameCadCliente(true);
    } else {
      setErroNameCadCliente(false);
    }
    if (!emailCadCliente) {
      return setErroEmailCadCliente(true);
    } else {
      setErroEmailCadCliente(false);
    }
    if (!nameCadCliente) {
      return setErroNameCadCliente(true);
    } else {
      setErroNameCadCliente(false);
    }
    const cpfFormat = cpfCadCliente.replace(/[^\d]/g, '');
    if (cpfFormat.length !== 11) {
      return setErroCpfCadCliente(true);
    } else {
      setErroCpfCadCliente(false);
    }
    if (!tellCadCliente || tellCadCliente.length !== 15) {
      return setErroTellCadCliente(true);
    } else {
      setErroTellCadCliente(false);
    }
    const clienteDados = {
      nome: nameCadCliente,
      email: emailCadCliente,
      cpf: cpfCadCliente,
      telefone: tellCadCliente,
      logradouro: enderecoCadCliente,
      complemento: ComplementoCadCliente,
      cep: cepCadCliente,
      bairro: bairroCadCliente,
      cidade: cidadeCadCliente,
      uf: ufCadCliente
    }

    const promise = await fetch('https://back-end-equipe15.herokuapp.com/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clienteDados)
      });

    const response = await promise.json();
    
    if (response.status === 201) {
      return toast.success('Cadastro realizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

    if (response.status === 400) {
      return toast.error('Já existe um cliente com estes dados!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
     }

    return toast.error('Falha ao cadastrar novo cliente!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  }

  if (!isOpen) {
    return null;
  } 

  return (
    <form onSubmit={handleSubmitCadCliente}>
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
        theme="dark"
      />
      
      <div className="containerModalEdit" >
        <div className="modalCadCliente">
          <header className="cadHead">
            <div className="close botao">
              <img
                src={close}
                alt="close modal"
                onClick={onToggleModal}
              />
            </div>
            <div className="cadHeader">
              <img src={user}
                alt="icon user"
              />
              <h1>Cadastro do cliente</h1>
            </div>

          </header>
          <section>
            <div className="cad" >
              <label for="nome" >Nome*</label>
              <input
                required
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={nameCadCliente}
                onChange={e => setNameCadCliente(e.target.value)}
              />
              {erroNameCadCliente &&
                <span className="form-error">Este campo deve ser preenchido</span>
              }
            </div>

            <div className="cad">
              <label for="email" > E-mail*</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={emailCadCliente}
                onChange={e => setEmailCadCliente(e.target.value)}
              />
              {erroEmailCadCliente &&
                <span className="form-error">Este campo deve ser preenchido</span>
              }
            </div>

            <div className="cpfTell">

              <div className="cad">
                <label for="cpf" > CPF*</label>
                <InputMask mask="999-999-999.99"
                  value={cpfCadCliente}
                  onChange={e => setCpfCadCliente(e.target.value)}>
                  <input
                    id="cpf"
                    name="cpf"
                    placeholder="Digite seu CPF"
                  />
                </InputMask>
                {erroCpfCadCliente &&
                  <span className="form-error">Verifique se tem 11 dígitos</span>
                }
              </div>

              <div className="cad">
                <label for="telefone" > Telefone*</label>
                <InputMask mask="(99) 99999-9999"
                  value={tellCadCliente}
                  onChange={e => setTellCadCliente(e.target.value)}>
                  <input
                    id="telefone"
                    name="telefone"
                    placeholder="Digite seu Telefone"
                  />
                </InputMask>
                {erroTellCadCliente &&
                  <span className="form-error">Este campo deve ser preenchido</span>
                }
              </div>
            </div>
            <div className="cpfTell">

              <div className="cad">
                <label for="cep"> CEP</label>
                <InputMask mask="99999-999" value={cepCadCliente} onChange={e => setCepCadCliente(e.target.value)}>
                  <input
                    id="cep"
                    name="cep"
                    placeholder="Digite seu cep"
                  />
                </InputMask>

              </div>

              <div className="cad">
                <label for="bairro" > Bairro</label>
                <input
                  type="text"
                  id="bairro"
                  name="bairro"
                  placeholder="Digite seu bairro"
                  value={bairroCadCliente}
                  onChange={e => setBairroCadCliente(e.target.value)}
                />
              </div>
            </div>
            <div className="cad" >
              <label for="endereço" >Endereço</label>
              <input
                type="text"
                id="endereço"
                name="endereço"
                placeholder="Digite seu endereço"
                value={enderecoCadCliente}
                onChange={e => setEnderecoCadCliente(e.target.value)}
              />

            </div>

            <div className="cad">
              <label for="Complemento" > Complemento</label>
              <input
                type="text"
                id="Complemento"
                name="Complemento"
                placeholder="Digite o complemento"
                value={ComplementoCadCliente}
                onChange={e => setComplementoCadCliente(e.target.value)}
              />
            </div>


            <div className="cpfTell">

              <div className="cad">
                <label for="cidade" > Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  placeholder="Digite sua cidade"
                  value={cidadeCadCliente}
                  onChange={e => setCidadeCadCliente(e.target.value)}
                />

              </div>

              <div className="cad">
                <label for="uf" > UF</label>
                <InputMask mask="aa"
                  value={ufCadCliente}
                  onChange={e => setUfCadCliente((e.target.value).toUpperCase())}>
                  <input
                    id="uf"
                    name="uf"
                    placeholder="Digite seu UF"
                  />
                </InputMask>

              </div>
            </div>
            <div className="btn">
              <ButtonRosa texto="Aplicar" />
              <button className="tela_cadCli_direita_botao_cadCli botao"
                onClick={onToggleModal} >Cancelar</button>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
export default ModalCadClienteUser;


