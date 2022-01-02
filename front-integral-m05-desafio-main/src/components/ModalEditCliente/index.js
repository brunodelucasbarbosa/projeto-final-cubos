import { useEffect, useState } from 'react'
import close from '../../assets/CLOSE.svg'
import user from '../../assets/user.svg'
import { ToastContainer, toast } from 'react-toastify';
import ButtonRosa from '../ButtonRosa';
import InputMask from 'react-input-mask'
import useLogin from '../../hooks/useLoginProvider'

function ModalEditClient({setModalEditarClienteOpen, clienteDetalhado}) {

  const [nome, setNome] = useState(clienteDetalhado.nome);
  const [erroNome, setErroNome] = useState(false);
  const [email, setEmail] = useState(clienteDetalhado.email);
  const [cpf, setCpf] = useState(clienteDetalhado.cpf);
  const [telefone, setTelefone] = useState(clienteDetalhado.telefone);
  const [endereco, setEndereco] = useState(clienteDetalhado.logradouro);
  const [complemento, setComplemento] = useState(clienteDetalhado.complemento);
  const [cepEdit, setCep] = useState(clienteDetalhado.cep);
  const [bairro, setBairro] = useState(clienteDetalhado.bairro);
  const [cidade, setCidade] = useState(clienteDetalhado.cidade);
  const [estado, setEstado] = useState(clienteDetalhado.estado);

  const [erroEmail, setErroEmail] = useState(false);
  const [erroCpf, setErroCpf] = useState(false);
  const [erroTelelefone, setErroTelefone] = useState(false);
  

  const {token} = useLogin();

  async function consultarCep(cep) {
    try {
      const promise = await fetch(`https://viacep.com.br/ws/${ cep }/json/`);
      const response = await promise.json();
      setBairro(response.bairro);
      setComplemento(response.complemento);
      setCidade(response.localidade);
      setEndereco(response.logradouro);
      setEstado(response.uf);
    } catch (error) {
      return error.message;
    }

  }
  useEffect(() => {
    const cepFormat = cepEdit.replace(/[^\d]/g, '');
    if(cepFormat.length === 8) {
      consultarCep(cepFormat);
    }
  }, [cepEdit])

  async function handleSubmitEditCliente(e) {
    e.preventDefault();

    if (!nome) {
      setErroNome(true);
    } else {
      setErroNome(false);
    }
    if (!email) {
      return setErroEmail(true);
    } else {
      setErroEmail(false);
    }
    const cpfFormat = cpf.replace(/[^\d]/g, '');
    if (cpfFormat.length !== 11 || !cpfFormat) {
      return setErroCpf(true);
    } else {
      setErroCpf(false);
    }
    if (!telefone || telefone.length !== 15) {
      return setErroTelefone(true);
    } else {
      setErroTelefone(false);
    }
    
    const clienteDados = {
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
      logradouro: endereco,
      complemento: complemento,
      cep: cepEdit,
      bairro: bairro,
      cidade: cidade,
      uf: estado
    }
    const promise = await fetch(`https://back-end-equipe15.herokuapp.com/clients/${clienteDetalhado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clienteDados)
      });

    const response = await promise.json();
    if (response.status === 201) {
      return toast.success('Cliente editado com sucesso!', {
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

    return toast.error('Falha ao editar cliente!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  }

  return (
    <form onSubmit={handleSubmitEditCliente}>
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
            <div className="close">
              <img src={close} alt="close modal" onClick={() => setModalEditarClienteOpen()} />
            </div>
            <div className="cadHeader">
              <img src={user}
                alt="icon user"
              />
              <h1>Editar Cliente</h1>
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
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              {erroNome &&
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
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {erroEmail &&
                <span className="form-error">Este campo deve ser preenchido</span>
              }
            </div>

            <div className="cpfTell">

              <div className="cad">
                <label for="cpf" > CPF*</label>
                <InputMask mask="999-999-999.99"
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}>
                  <input
                    id="cpf"
                    name="cpf"
                    placeholder="Digite seu CPF"
                  />
                </InputMask>
                {erroCpf &&
                  <span className="form-error">Verifique se tem 11 dígitos</span>
                }
              </div>

              <div className="cad">
                <label for="telefone" > Telefone*</label>
                <InputMask mask="(99) 99999-9999"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}>
                  <input
                    id="telefone"
                    name="telefone"
                    placeholder="Digite seu Telefone"
                  />
                </InputMask>
                {erroTelelefone &&
                  <span className="form-error">Este campo deve ser preenchido</span>
                }
              </div>
            </div>
            <div className="cpfTell">

              <div className="cad">
                <label for="cep"> CEP</label>
                <InputMask mask="99999-999" value={cepEdit} onChange={e => setCep(e.target.value)}>
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
                  value={bairro}
                  onChange={e => setBairro(e.target.value)}
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
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
              />

            </div>

            <div className="cad">
              <label for="Complemento" > Complemento</label>
              <input
                type="text"
                id="Complemento"
                name="Complemento"
                placeholder="Digite o complemento"
                value={complemento}
                onChange={e => setComplemento(e.target.value)}
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
                  value={cidade}
                  onChange={e => setCidade(e.target.value)}
                />

              </div>

              <div className="cad">
                <label for="uf" > UF</label>
                <InputMask mask="aa"
                  value={estado}
                  onChange={e => setEstado(e.target.value)}>
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
                onClick={() => setModalEditarClienteOpen(false)} >Cancelar</button>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
export default ModalEditClient;


