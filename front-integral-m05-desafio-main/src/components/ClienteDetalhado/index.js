import React, { useEffect, useState } from 'react'
import iconUser from '../../assets/user.svg'
import iconEdit from '../../assets/icon-edit.svg'
import ModalEditClient from '../ModalEditCliente'
import setas from '../../assets/setas.svg'
import LinhaCobrancasCliente from '../../components/LinhaCobrancasCliente'
import ButtonRosa from '../ButtonRosa';
import ModalCriarCobranca from '../ModalCriarCobranca';
import useCobrancas from '../../hooks/useCobrancasProvider';
import './styles.css'

export default function ClienteDetalhado({ setDetalhandoCliente, idClienteDetalhado, token, setModalEditarClienteOpen, modalEditarClienteOpen }) {
  const [clienteDetalhado, setClienteDetalhado] = useState([]);
  const [cobrancasCliente, setCobrancaCliente] = useState([]);

  const {modalCriarCobranca, setModalCriarCobranca } = useCobrancas();

  async function detalharCliente() {
    try {
      const promise = await fetch(`https://back-end-equipe15.herokuapp.com/clients/${ idClienteDetalhado }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      })
      const response = await promise.json();
      setClienteDetalhado(response.clienteDetalhado[0]);
    } catch (error) {
      return error.message;
    }
  }

  async function listarCobrançaClientes() {
    try {
      const promise = await fetch(`https://back-end-equipe15.herokuapp.com/cobrancas/${ idClienteDetalhado }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      })
      const response = await promise.json();
      setCobrancaCliente(response.cobrancas);
    } catch (error) {
      return error.message;
    }
  }

  async function listarCobrancasCliente() {
    try {
      const promise = await fetch(`https://back-end-equipe15.herokuapp.com/cobrancas/${ idClienteDetalhado }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      })
      const response = await promise.json();
      setCobrancaCliente(response.cobrancas);
    } catch (error) {
      return error.message;
    }
  }

  useEffect(() => {
    detalharCliente();
    listarCobrancasCliente();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    detalharCliente();
    // eslint-disable-next-line
  }, [modalEditarClienteOpen])


  useEffect(() => {
    listarCobrançaClientes();
    // eslint-disable-next-line
  }, [modalCriarCobranca])

  return (
    <>
      <section className="tela_section_clientes-detalhado pushCard">

        <div className="header_navegacao">
          <span style={{ color: '#0E8750', cursor: 'pointer' }} onClick={() => setDetalhandoCliente(false)}>Clientes</span>
          <span> {'>'} </span>
          <span style={{ cursor: 'pointer' }}>Detalhes do Cliente</span>
        </div>
        <div className="header_tela_cliente-detalhado">
          <img src={iconUser} alt="iconeUser" />
          <h1>{clienteDetalhado.nome}</h1>

          <div className="button_editar-cliente botao" onClick={() => setModalEditarClienteOpen(true)}>
            <img src={iconEdit} alt="iconEditar" /> Editar Cliente
          </div>
        </div>

        <article className="container_cliente-detalhado">
          <h2 className="title_cliente-detalhado">Dados do cliente</h2>

          <div className="container_dados_cliente-detalhado">
            <div className="container_dados_superior">
              <div className="dados-cliente-detalhado">
                <span>E-mail</span><br />
                <span>{clienteDetalhado.email}</span>
              </div>
              <div className="dados-cliente-detalhado">
                <span>Telefone</span><br />
                <span>{clienteDetalhado.telefone}</span>
              </div>
              <div className="dados-cliente-detalhado">
                <span>CPF</span><br />
                <span>{clienteDetalhado.cpf}</span>
              </div>
            </div>

            <div className="container_dados_inferior">
              <div className="dados-cliente-detalhado">
                <span>Endereço</span><br />
                <span>{clienteDetalhado.logradouro}</span>
              </div>
              <div className="dados-cliente-detalhado">
                <span>Bairro</span><br />
                <span>{clienteDetalhado.bairro}</span>
              </div>
              <div className="dados-cliente-detalhado">
                <span>Complemento</span><br />
                <span>{clienteDetalhado.complemento}</span>
              </div>
              <div className="dados-cliente-detalhado">
                <span>CEP</span><br />
                <span>{clienteDetalhado.cep}</span>
              </div>
              <div className="dados-cliente-detalhado">
                <span>Cidade</span><br />
                <span>{clienteDetalhado.cidade}</span>
              </div>
              <div className="dados-cliente-detalhado">
                <span>UF</span><br />
                <span>{clienteDetalhado.uf}</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="tela_section_clientes-detalhado">
        <article className="container_cliente-detalhado">
          <div className="header_container_cliente-detalhado">
            <h2 className="title_cliente-detalhado">Cobranças do cliente</h2>

            <div className="botao_nova-cobranca_detalhamento" onClick={() => setModalCriarCobranca(true)}>
              <ButtonRosa texto={"+ Nova Cobrança"} />
            </div>
          </div>
          <div className="header_container_cliente-detalhado-cobrancas">
            <div className="elementos_header_container_cliente-detalhado-cobrancas">
              <div className='flexIdDate'>
                <img src={setas} alt="setas" />
                <h3>ID Cob.</h3>
              </div>
              <div className='flexIdDate'>
                <img src={setas} alt="setas" />
                <h3>Data de venc.</h3>
              </div>
              <h3 className='h3CobCli'>Valor</h3>
              <h3 className='h3CobCli' id = 'pagas'>Status</h3>
              <h3 className='h3CobCliDesc'>Descrição</h3>
              <h3 className='h3CobCli'> </h3>
            </div>
          </div>
          {
            cobrancasCliente.map(cobrancas => {
              return (
                <LinhaCobrancasCliente
                  id={cobrancas.id}
                  cobrancas={cobrancas}
                  data_vencimento={cobrancas.data_vencimento}
                  valor={cobrancas.valor}
                  status_cobranca={cobrancas.status_cobranca}
                  descricao={cobrancas.descricao}
                  token={token}
                  cliente_id={cobrancas.cliente_id}
                  setCobrançaClientes={setCobrancaCliente}
                  listaCobrancas={cobrancasCliente}
                />
              )
            })
          }

        </article>

        {modalEditarClienteOpen &&
          <ModalEditClient
            setModalEditarClienteOpen={setModalEditarClienteOpen}
            clienteDetalhado={clienteDetalhado}
          />}

        {modalCriarCobranca &&
          <ModalCriarCobranca
            setModalCriarCobranca={setModalCriarCobranca}
            nomeCobranca={clienteDetalhado.nome}
            idClienteCobranca={idClienteDetalhado}
          />}
      </section>
    </>
  )
}
