import './styles.css'
import { useEffect } from 'react'
import password from '../../assets/password.svg'
import close from '../../assets/CLOSE.svg'
import useUserEdit from '../../hooks/useUserEdit'
import InputMask from 'react-input-mask'
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react'
import ButtonRosa from '../ButtonRosa';
import useUser from '../../hooks/useUser';

function ModalEditUser({ isOpen, onToggleModal}) {
  const { token } = useUser();

  const {
    emailEdit,
    setEmailEdit,
    nameEdit,
    setNameEdit,
    erroNameEdit,
    setErroNameEdit,
    cpfEdit,
    setCpfEdit,
    setErroCpfEdit,
    erroCpfEdit,
    tellEdit,
    setTellEdit,
    newPasswordEdit,
    setNewPasswordEdit,
    erroNewPassEdit,
    setErroNewPassEdit,
    confirmNewPassEdit,
    setConfirmNewPassEdit,
    erroConfirmNewPassEditEdit,
    setErroConfirmNewPassEditEdit,
    passwordDifEdit } = useUserEdit();

    async function detalharUsuario() {
      try {
        const promise = await fetch(`https://back-end-equipe15.herokuapp.com/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`,
          },
        })
        const response = await promise.json();
        setNameEdit(response.user.name)
        setEmailEdit(response.user.email)
        setCpfEdit(response.user.cpf)
        setTellEdit(response.user.phone)
      } catch (error) {
        return error.message;
      }
    }
    useEffect(()=>{
      detalharUsuario()
    },[])

  const [typePassword, setTypePassword] = useState("password");
  const [typeConfPassword, setTypeConfPassword] = useState("password");
  const [errorEmail, setErrorEmail] = useState(false)
    
  async function handleEditUser(e) {
    e.preventDefault();
    const cpfFormat = cpfEdit.replace(/[^\d]/g, '');

    if (confirmNewPassEdit !== newPasswordEdit) {
      return setErroConfirmNewPassEditEdit(true);
    } else {
      setErroConfirmNewPassEditEdit(false);
    }
    if (!nameEdit) {
      return setErroNameEdit(true);
    } else {
      setErroNameEdit(false);
    }
    if (!emailEdit ) {
      return setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (cpfFormat.length > 1 && cpfFormat.length !== 11) {
      return setErroCpfEdit(true);
    } else {
      setErroCpfEdit(false);
    }

    if (newPasswordEdit.length < 3 || confirmNewPassEdit.length < 3) {
      return setErroNewPassEdit(true);
    } else {
      setErroNewPassEdit(false);
    }
    
    const dadosAtuais = {
      name: nameEdit,
      email: emailEdit,
      password: newPasswordEdit,
      cpf: cpfEdit,
      phone: tellEdit
    }
    
    const response = await fetch(`https://back-end-equipe15.herokuapp.com/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${ token }`,
      },
      body: JSON.stringify(dadosAtuais),
    });
    const promise = await response.json()
    
    if (response.status === 200) {
      return toast.success('Edição realizado com sucesso!', {
        position: "bottom-right",
        autoClose: 90000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      return toast.error('Falha ao editar usuário!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

  }

  if (!isOpen) {
    return null;
  }

  return (
    <form onSubmit={handleEditUser}>
      <ToastContainer 
      position="top-right" 
      autoClose={90000} 
      newestOnTop={false} 
      closeOnClick rtl={false} 
      pauseOnFocusLoss 
      draggable 
      />
      <div className="containerModalEdit" >
        <div className="modal">
          <header className="cadeditUserHead">
            <div className="close botao" >
              <img
                src={close}
                alt="icon close"
                onClick={onToggleModal}
              />
            </div>
            <h1 className="h1Edituser" style={{ textAlign: 'center' }}>Edite seu cadastro</h1>
          </header>
          <section>

            <div className="cadeditUser" >
              <label for="nome" >Nome*</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={nameEdit}
                onChange={e => setNameEdit(e.target.value)}
              />
              {erroNameEdit &&
                <span className="form-error">Este campo deve ser preenchido</span>
              }
            </div>

            <div className="cadeditUser">
              <label for="email" > E-mail*</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={emailEdit}
                onChange={e => setEmailEdit(e.target.value)}
              />
              {errorEmail && 
                  <span className="form-error">Este campo deve ser preenchido</span>
              }
            </div>

            <div className="cpfTell">

              <div className="cadeditUser">
                <label for="cpf" > CPF</label>
                <InputMask mask="999.999.999-99"
                  value={cpfEdit}
                  onChange={e => setCpfEdit(e.target.value)}>
                  <input
                    id="cpf"
                    name="cpf"
                    placeholder="Digite seu CPF"
                  />
                </InputMask>
                {erroCpfEdit &&
                  <span className="form-error">CPF Obrigatório</span>
                }
              </div>

              <div className="cadeditUser">
                <label for="telefone" > Telefone</label>
                <InputMask mask="(99) 99999-9999"
                  value={tellEdit}
                  onChange={e => setTellEdit(e.target.value)}>
                  <input
                    id="telefone"
                    name="telefone"
                    placeholder="Digite seu Telefone"
                  />
                </InputMask>
              </div>
            </div>

            <div className="cadeditUser">
              <label for="senha" >Nova Senha*</label>
              <div className="password">
                <div>
                  <input
                    type={typePassword}
                    id="senha"
                    name="senha"
                    placeholder="*******"
                    value={newPasswordEdit}
                    onChange={e => setNewPasswordEdit(e.target.value)}
                  />
                  {erroNewPassEdit &&
                    <span className="form-error ">Insira uma senha com pelo menos 3 dígitos</span>
                  }
                </div>
                <img
                  src={password}
                  alt="icon olho"
                  onClick={() => typePassword === "password" ? setTypePassword("text") : setTypePassword("password")}
                />
              </div>
            </div>
            <div className="cadeditUser">
              <label for="senhaC" >Confirmar senha*</label>
              <div className="password">
                <div className="confirmPass">
                  <input
                    type={typeConfPassword}
                    id="senhaC"
                    name="confirmarSenha"
                    placeholder="*******"
                    value={confirmNewPassEdit}
                    onChange={e => setConfirmNewPassEdit(e.target.value)}
                  />
                  {
                    passwordDifEdit &&
                    <span className="form-error ">Senhas não conferem</span>
                  }
                  {erroConfirmNewPassEditEdit &&
                    <span className="form-error">As senhas devem ser iguais!</span>
                  }
                </div>

                <img
                  src={password}
                  alt="icon olho"
                  onClick={() => typeConfPassword === "password" ? setTypeConfPassword("text") : setTypeConfPassword("password")}
                />
              </div>
            </div>
            <div className="btn-edit-user">
              <ButtonRosa texto="Aplicar" />
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
export default ModalEditUser;


