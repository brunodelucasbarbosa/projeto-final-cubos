import './styles.css'
import { useState, useEffect } from 'react';
import React from 'react'
import SideBar from "../../components/SideBar";
import HeaderHome from '../../components/HeaderHome';
import ModalEditUser from '../../components/ModalEditUser/ModalEditUser';
import HeaderTableCobrança from '../../components/HeaderTabelaCobranças'
import LinhaTableCobrança from '../../components/LinhaTableCobranças';
import useAuth from '../../hooks/useLoginProvider';
import {useParams} from 'react-router-dom';
import cobrança from '../../assets/cobrançasblack.svg'
import filtro from '../../assets/filtro.svg'
import lupa from '../../assets/lupa.svg'
import noCliCob from '../../assets/nocliCob.svg'

function Cobranças() {
  const params = useParams();
  const {token} = useAuth();
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [cobrancas, setCobrancas] = useState([]);
  const [cobrancasFiltrada, setCobrancasFiltrada] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [buscarFiltro, setBuscarFiltro] = useState('')
  const [openNoneCobranca, setOpenNoneCobranca] = useState(false);
 

    function buscarCobrança(e){
      if(e && e.type === 'keydown'){
        if(e.key !== 'Enter') return;
      }
      const filtro = cobrancas.filter((cobranca)=> cobranca.id === Number(buscarFiltro) || cobranca.nome.includes(buscarFiltro))
      
       if(filtro.length === 0 && buscarFiltro){
        setOpenNoneCobranca(true)
      }else{
        setOpenNoneCobranca(false)
      }

      setCobrancasFiltrada(filtro)
    }

    const ordenarId = ()=>{
         const ordem = cobrancas.sort((a, b) =>{
           return a.id - b.id
         } );
         setCobrancasFiltrada([])
         setCobrancas(ordem)
    }

    const odernarNome = ()=>{
        const ordem = cobrancas.sort(function (a, b) {
          if (a.nome > b.nome) {
            return 1;
          }
          if (a.nome < b.nome) {
            return -1;
          }
          return 0;
        });
        setCobrancasFiltrada([])
        setCobrancas(ordem)
    }

    

  const handleToggleModalEdit = () => {
    setIsOpenModalEdit((prevState) => !prevState);
  };

  async function listarCobrancas() {
    try {
      setCarregando(true);
      const promise = await fetch('https://back-end-equipe15.herokuapp.com/cobrancas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      })
      const response = await promise.json();
      if (params.filtro === 'todas' || !params.filtro) {
        setCobrancas(response.cobrancas);
      } else if (params.filtro === 'Pagas') {
        setCobrancas(response.cobrancasPagas);
      } else if (params.filtro === 'Pendentes') {
        setCobrancas(response.cobrancasPendentes);
      } else if (params.filtro === 'Vencidas') {
        setCobrancas(response.cobrancasVencidas);
      }
      setCarregando(false);
    } catch (error) {
      return console.log(error.message);
    }
  }
  
  useEffect(() => {
    listarCobrancas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="ContainerHome">
      <SideBar />
      <div className="contHome">
        <HeaderHome
          titulo="Cobranças"
        />

        <ModalEditUser
          isOpen={isOpenModalEdit}
          onToggleModal={handleToggleModalEdit}
        />
        <div className = "containerHeaderTable" >
        <div className = "subHeader">
          <img src = {cobrança} alt = "icon cobrança"/>
          <h1>Cobranças</h1>
        </div>
        <div className = "subHeader2">
          <img src = {filtro} alt = "icon-filtro"/>
          <div className = "input-lupaCob">
            <input id = "pesquisa" placeholder = "Pesquisa" onKeyDown={buscarCobrança} onChange={(e)=> setBuscarFiltro(e.target.value)}/>
            <img src = {lupa} alt = "lupa" onClick={buscarCobrança}/>
          </div>
        </div>
      </div>
        <div className = "tableCobrança">
        <HeaderTableCobrança
        ordemID = {ordenarId}
        odernarNome = {odernarNome}
        />
        {
      openNoneCobranca ? 
      (<div className='noneCobrancaFind'>
        <img src={noCliCob} alt="nenhum resultado"/>
        <h1>Nenhum resultado foi encontrado!</h1>
        <h2>Verifique se escrita está correta</h2>
      </div>) : 
        cobrancasFiltrada.length !== 0? cobrancasFiltrada.map((cobranca,index) => {
          return (
            <div key={index}>
              <LinhaTableCobrança 
              clienteNome={cobranca.nome}
              status_cobranca={cobranca.status_cobranca}
              valor={cobranca.valor}
              descricao={cobranca.descricao}
              data_vencimento={cobranca.data_vencimento}
              id={cobranca.id}
              cliente_id={cobranca.cliente_id}
              listaCobrancas = {cobrancas}
              setCobrançaClientes={setCobrancas}
              />
            </div>
          )
        }) : cobrancas.map((cobranca,index) => {
          return (
            <div key={index}>
              <LinhaTableCobrança 
              clienteNome={cobranca.nome}
              status_cobranca={cobranca.status_cobranca}
              valor={cobranca.valor}
              descricao={cobranca.descricao}
              data_vencimento={cobranca.data_vencimento}
              id={cobranca.id}
              cliente_id={cobranca.cliente_id}
              listaCobrancas = {cobrancas}
              setCobrançaClientes={setCobrancas}
              />
            </div>
          )
        })}
        </div>
      </div>
      
    </div>
  )
}
export default Cobranças;