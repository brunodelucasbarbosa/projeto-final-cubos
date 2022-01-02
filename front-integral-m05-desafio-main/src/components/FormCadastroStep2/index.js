import React, { useState } from 'react'
import iconEyes from '../../assets/icon-eyes-password.svg';
import { Link } from 'react-router-dom';
import './styles.css'


export default function FormCadastroStep1({senhaCadastro, setSenhaCadastro, confirmaSenhaCadastro, setConfirmaSenhaCadastro, erroSenha, erroConfirmaSenha}) {

  const [visibilidadeSenha, setVisibilidadeSenha] = useState('password');

  function handleTrocarSenha() {
    const atual = visibilidadeSenha === 'password' ? 'text' : 'password';
    setVisibilidadeSenha(atual);
  }

  return (
    <div>
      <h2 className="tela_cadastro_direita_titulo">Escolha uma senha</h2>

      <form>
        <div className="form_input nome_cadastro">
          <label htmlFor="input-senha" className="form_label_login">Senha*</label>
          <input
            className="input_login"
            style={{ borderColor: erroSenha ? '#E70000' : '' }}
            type={visibilidadeSenha}
            name="input-senha"
            placeholder="Digite sua senha"
            value={senhaCadastro}
            onChange={e => setSenhaCadastro(e.target.value)}
            required />
          <img src={iconEyes}
            alt="icon-show-password"
            className="icone_mostrar_senha botao"
            onClick={handleTrocarSenha}
          />

        </div>

        <div className="form_input nome_cadastro">
          <label htmlFor="input-senha-confirma" className="form_label_login">Repita a senha* 
          </label>
          <input
            className="input_login input_senha_cadastro"
            style={{ borderColor: erroConfirmaSenha ? '#E70000' : '' }}
            type={visibilidadeSenha}
            name="input-senha-confirma"
            placeholder="Repita sua senha"
            value={confirmaSenhaCadastro}
            onChange={e => setConfirmaSenhaCadastro(e.target.value)}
            required
          />
          <img src={iconEyes}
            alt="icon-show-password"
            className="icone_mostrar_senha botao"
            onClick={handleTrocarSenha}
          />

        </div>


        <span className="tela_login_direita_form_nao-possui">Já possui uma conta? Faça seu <Link to="/login"><span className="tela_login_direita_form_nao-possui_cadastre-se botao ">Login</span></Link></span>
      </form>
    </div>
  )
}
