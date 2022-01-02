import iconeOkCadastro from '../../assets/icon-okay-cadastro.svg'
import './styles.css'

export default function CadastroRealizado() {

  return (
    <div className="tela_cadastro_direita_container">
      <img src={iconeOkCadastro} alt="iconeOkayCadastro" className="tela_cadastro_direita_container_imagem-ok-cadastro" />
      <h2 className="tela_cadastro_direita_titulo">Cadastro Realizado com sucesso!</h2>
    </div>
  )
}
