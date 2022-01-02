import React, { useEffect, useState } from 'react'
import iconCobranca from '../../assets/botao-criar-cobranca.svg'
import iconOrder from '../../assets/icon-order.svg'
import useAuth from '../../hooks/useLoginProvider'

import ModalCriarCobranca from '../ModalCriarCobranca';
import './styles.css'
import {useParams} from 'react-router-dom';
import useCobrancas from '../../hooks/useCobrancasProvider';

export default function SectionClientes({setDetalhandoCliente, isOpen, clientesFiltrados, setIdClienteDetalhado, listaClientes}) {
  const params = useParams();
  const { token } = useAuth();
  const [carregando, setCarregando] = useState(false);
  const {modalCriarCobranca, setModalCriarCobranca} = useCobrancas();
  const [clientesLista, setClientesLista] = useState([]);
  const [idClienteCobranca, setIdClienteCobranca] = useState('');
  const [nomeCobranca, setNomeCobranca] = useState('');
  const [clientesFiltrada, setClientesFiltrada] = useState([]);
  listaClientes(clientesLista)
  
  function handleOpenModalCriarCobranca(e) {
    e.preventDefault();
    const {id, nome} = e.target.dataset;
    setIdClienteCobranca(id)
    setNomeCobranca(nome);
    setModalCriarCobranca(true);
  }

  useEffect(() => {
    async function listarClientes() {
      try {
        setCarregando(true);
        await fetch('https://back-end-equipe15.herokuapp.com/clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`,
          },
        }).then(promise => promise.json()).then(data => {
          if(params.filtro === 'Todos' || !params.filtro) {
            setClientesLista(data.clientes);
          } else if(params.filtro === 'EmDia') {
            setClientesLista(data.clientesEmDia);
          } else if (params.filtro === 'Inadimplente') {
            setClientesLista(data.clientesInadimplentes);
          }
        
        })
        setCarregando(false);
      } catch (error) {
        return error.message;
      }
    }
    listarClientes();
    // eslint-disable-next-line
  }, [isOpen, modalCriarCobranca])

  function list(e) {
    e.preventDefault();
    setIdClienteDetalhado(Number(e.target.id));
    setDetalhandoCliente(true);
  }
  
  

  const ordernarNome = ()=>{
      const ordem = clientesLista.sort(function (a, b) {
        if (a.nome > b.nome) {
          return 1;
        }else
        if (a.nome < b.nome) {
          return -1;
        }
        return 0;
      });
      setClientesFiltrada([])
      setClientesLista(ordem)
  }

  return (
    <section className="tela_section_clientes">
      <div className="header_section_clientes_titles">
        <div className="listagem_clientes">
          <div>
            <img src={iconOrder} alt="icon-order" className="botao"  onClick={ordernarNome}/>
            <span className="elemento_cliente">Cliente</span>
          </div>
        </div>
        <div className="listagem_clientes">
          <span className="listagem_clientes-title">E-mail</span>
        </div>
        <div className="listagem_clientes">
          <span className="listagem_clientes-title">Telefone</span>
        </div>
        <div className="listagem_clientes">
          <span>Status</span>
        </div>
        <div className="listagem_clientes">
          <span>Criar Cobrança</span>
        </div>
      </div>
      <div className="elementos_clientes">
        {clientesFiltrados.length !== 0 ? clientesFiltrados.map((cliente, index) => {
          return (
          <div className="elemento" key={index}>
            <span className="nome_clicavel" onClick={e=>list(e)} id={cliente.id}>{cliente.nome}</span>
            <span className="elemento-email" >{cliente.email}</span>
            <span className="elemento-telefone" >{cliente.telefone}</span>
            <span id={cliente.status_cliente === 'EM DIA' ? 'em_dia' : 'inadimplente'}>{cliente.status_cliente}</span>
            <img src={iconCobranca} alt="icon-criar-cobranca" className="botao_cadastrar_cobranca botao"
            data-id={cliente.id}
            data-nome={cliente.nome}
            onClick={(e) => handleOpenModalCriarCobranca(e)}
            />
        </div>
          );
        }) :clientesLista.map((cliente, index) => {
          return (
          <div className="elemento" key={index}>
            <span className="nome_clicavel" onClick={e=>list(e)} id={cliente.id}>{cliente.nome}</span>
            <span className="elemento-email" >{cliente.email}</span>
            <span className="elemento-telefone" >{cliente.telefone}</span>
            <span id={cliente.status_cliente === 'EM DIA' ? 'em_dia' : 'inadimplente'}>{cliente.status_cliente}</span>
            <img src={iconCobranca} alt="icon-criar-cobranca" className="botao_cadastrar_cobranca botao"
            data-id={cliente.id}
            data-nome={cliente.nome}
            onClick={(e) => handleOpenModalCriarCobranca(e)}
            />
        </div>
          );
        })}
      </div>
        {modalCriarCobranca &&
        <ModalCriarCobranca
          setModalCriarCobranca={setModalCriarCobranca}
          nomeCobranca={nomeCobranca}
          idClienteCobranca={idClienteCobranca}
        />}
    </section>
  )
}