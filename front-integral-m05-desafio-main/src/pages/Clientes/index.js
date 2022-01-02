import React, { useState } from 'react'
import SideBar from "../../components/SideBar";
import HeaderHome from '../../components/HeaderHome';
import ModalCadastroCliente from '../../components/ModalCadastroCliente'
import user from '../../assets/user.svg'
import noCliCob from '../../assets/nocliCob.svg'
import lupa from '../../assets/lupa.svg'
import SectionClientes from '../../components/SectionClientes';
import ClienteDetalhado from '../../components/ClienteDetalhado';
import useAuth from '../../hooks/useLoginProvider';
import './styles.css'

export default function Cadastro() {
  const [isOpenModalCadCliente, setIsOpenModalCadCliente] = useState(false);
  const [modalEditarClienteOpen, setModalEditarClienteOpen] = useState(false);
  const [detalhandoCliente, setDetalhandoCliente] = useState(false);
  const [buscaCliente, setBuscaCliente] = useState('');
  const [listaCliente, setlistaClientes] = useState([]);
  const [clientesFiltrada, setClientesFiltrada] = useState([]);
  const [openNoneCliente, setOpenNoneCliente] = useState(false);

  const { idClienteDetalhado, setIdClienteDetalhado, token } = useAuth();

  function buscarCliente(e) {
    if (e && e.type === 'keydown') {
      if (e.key !== 'Enter') return;
    }
    const filtro = listaCliente.filter((cliente) => cliente.email.includes(buscaCliente) || cliente.nome.includes(buscaCliente) || cliente.cpf.includes(buscaCliente))

    if (filtro.length === 0 && buscarCliente) {
      setOpenNoneCliente(true)
    } else {
      setOpenNoneCliente(false)
    }

    setClientesFiltrada(filtro)
  }

  const handleToggleModalCadCliente = () => {
    setIsOpenModalCadCliente((prevState) => !prevState);
  };


  return (
    <section className="tela-cadastro">
      <SideBar />
      <main className="main-tela-cadastro">
        <div className="headerCadCli">
          <HeaderHome
            titulo="Clientes"
          />
          {!detalhandoCliente &&
            <div className="containerSectionCadCliente" >
              <div className="sectionCliente">
                <img
                  src={user}
                  alt="icon usuario"
                />
                <h1>Clientes</h1>
              </div>
              <div className="sectionCadCliente">
                <button className="tela_login_direita_botao_login botao"
                  onClick={handleToggleModalCadCliente}>
                  +   Adicionar cliente
                </button>
                <div className="input-lupa">
                  <input
                    id="pesquisa"
                    placeholder="Pesquisa"
                    onKeyDown={buscarCliente}
                    onChange={(e) => setBuscaCliente(e.target.value)}
                  />
                  <img src={lupa} alt="lupa" onClick={buscaCliente} />
                </div>
              </div>
            </div>
          }

          <ModalCadastroCliente
            isOpen={isOpenModalCadCliente}
            onToggleModal={handleToggleModalCadCliente}
          />

          {detalhandoCliente &&
            <ClienteDetalhado
              setDetalhandoCliente={setDetalhandoCliente}
              idClienteDetalhado={idClienteDetalhado}
              setIdClienteDetalhado={setIdClienteDetalhado}
              token={token}
              modalEditarClienteOpen={modalEditarClienteOpen}
              setModalEditarClienteOpen={setModalEditarClienteOpen}
            />}

        </div>
        {openNoneCliente && detalhandoCliente ?
          <div className='noneClienteFind'>
            <img src={noCliCob} />
            <h1>Nenhum resultado foi encontrado!</h1>
            <h2>Verifique se escrita está correta</h2>
          </div> :
          <div style={{display: detalhandoCliente ? 'none' : ''}}>
          <SectionClientes
            detalhandoCliente={detalhandoCliente}
            setDetalhandoCliente={setDetalhandoCliente}
            idClienteDetalhado={idClienteDetalhado}
            setIdClienteDetalhado={setIdClienteDetalhado}
            isOpen={isOpenModalCadCliente}
            buscaCliente={buscaCliente}
            listaClientes={setlistaClientes}
            clientesFiltrados={clientesFiltrada}
          />
          </div>}
      </main>

    </section>
  )
}
