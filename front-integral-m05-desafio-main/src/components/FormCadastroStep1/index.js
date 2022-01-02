import React from 'react'
import { Link } from 'react-router-dom';

export default function FormCadastroStep1({nomeCadastro, setNomeCadastro, emailCadastro, setEmailCadastro, erroNome, erroEmail}) {

  return (
    <div>
      <h2 className="tela_cadastro_direita_titulo">Adicione seus dados</h2>

      <form>
        <div className="form_input nome_cadastro">
          <label htmlFor="input-nome" className="form_label_login">Nome*</label>
          <input
            style={{ borderColor: erroNome ? '#E70000' : '' }}
            className="input_login"
            type="text"
            name="input-nome"
            placeholder="Digite seu nome"
            value={nomeCadastro}
            onChange={e => setNomeCadastro(e.target.value)}
            required />
          {erroNome &&
            <span className="form-error">Este campo deve ser preenchido</span>
          }
        </div>
        <div className="form_input email_cadastro">
          <label htmlFor="input-email" className="form_label_login">E-mail*</label>
          <input
            style={{ borderColor: erroEmail ? '#E70000' : '' }}
            className="input_login"
            type="email"
            name="input-email"
            placeholder="Digite seu e-mail"
            value={emailCadastro}
            onChange={e => setEmailCadastro(e.target.value)}
            required
          />
          {erroEmail &&
            <span className="form-error">Este campo deve ser preenchido</span>
          }
        </div>

        <span className="tela_login_direita_form_nao-possui">Já possui uma conta? Faça seu <Link to="/login"><span className="tela_login_direita_form_nao-possui_cadastre-se botao ">Login</span></Link></span>
      </form>
    </div>
  )
}
