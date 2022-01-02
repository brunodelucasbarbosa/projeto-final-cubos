import React from 'react'
import './styles.css'
import ButtonRosa from '../../components/ButtonRosa'
import useUser from '../../hooks/useUser';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const { 
    emailLogin, 
    setEmailLogin, 
    erroEmailLogin, 
    setErroEmailLogin, 
    senhaErroLogin, 
    setSenhaErroLogin, 
    senhaLogin, 
    setSenhaLogin, 
    setToken, 
    setDadosUsuario 
  } = useUser();
  
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    if(!emailLogin) {
      return setErroEmailLogin(true);
    } else {
      setErroEmailLogin(false);
    }

    if(!senhaLogin || senhaLogin.length < 3) {
      return setSenhaErroLogin(true);
    } else {
      setSenhaErroLogin(false);
    }

    const promise = await fetch('https://back-end-equipe15.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailLogin,
        password: senhaLogin,
      })
    });
    const response = await promise.json();

    if(response.status !== 200) {
      return toast.error('E-mail e/ou senha incorretos!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    setDadosUsuario(response.userReturn)
    setToken(response.token);
    history.push('/home');
  }

  return (
    <main className="tela_login">
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
      <section className="tela_login_esquerda">
        <h2 className="tela_login_esquerda_titulo">Gerencia todos os pagamentos da sua empresa em um só lugar.</h2>
      </section>

      <section className="tela_login_direita">
        <h2 className="tela_login_direita_titulo">Faça seu login!</h2>

        <form onSubmit={handleLogin}>
          <div className="form_input email_login">
            <label htmlFor="input-email" className="form_label_login">E-mail</label>
            <input
              style={{ borderColor: erroEmailLogin ? '#E70000' : '' }}
              className="input_login"
              type="email"
              name="input-email"
              placeholder="Digite seu e-mail"
              value={emailLogin}
              onChange={e => setEmailLogin(e.target.value)}
              required />
          </div>

          <div className="form_input senha_login botao">
            <label htmlFor="input-senha" className="form_label_login">Senha</label>
            <input
              style={{ borderColor: senhaErroLogin ? '#E70000' : '' }}
              className="input_login"
              type="password"
              name="input-senha"
              placeholder="Digite sua senha"
              value={senhaLogin}
              onChange={e => setSenhaLogin(e.target.value)}
              required
            />
            {senhaErroLogin &&
              <span className="form-error">Este campo deve ser preenchido corretamente</span>
            }
            <span className="tela_login_direita_esqueceu_senha">
              Esqueceu a senha?
            </span>
          </div>

          <div className="tela_login_direita_div_botao" >
              <ButtonRosa texto={"Entrar"} />
          </div>

          <span className="tela_login_direita_form_nao-possui">Ainda não possui uma conta? <Link to="/cadastro"><span className="tela_login_direita_form_nao-possui_cadastre-se botao ">Cadastre-se</span></Link></span>

        </form>
      </section>
    </main>
  )
}

export default Login;