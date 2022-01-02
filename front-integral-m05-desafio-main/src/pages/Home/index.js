import './styles.css'
import { useState, useEffect } from 'react';
import React from 'react'
import SideBar from "../../components/SideBar";
import HeaderHome from '../../components/HeaderHome';
import CardPago from '../../components/CardPago';
import CardVencido from '../../components/CardVencido'
import CardPendente from '../../components/CardPendente';
import CardCobPagas from '../../components/CardcobPagas';
import CardCobPrevistas from '../../components/CardcobPrevistas';
import CardcobVencidas from '../../components/CardcobVencidas';
import CardInadimplenetes from '../../components/CardInadimplenetes';
import CardEmDia from '../../components/CardEmDia';
import ModalConfirmed from '../../components/ModalConfirmed';
import useAuth from '../../hooks/useLoginProvider';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Home() {
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [cobrancasPagas, setCobrancasPagas] = useState([]);
  const [qntdPagas, setQntdPagas] = useState('');
  const [qntdPendentes, setQntdPendentes] = useState('');
  const [qntdVencidas, setQntdVencidas] = useState('');
  const [cobrancasPendentes, setCobrancasPendentes] = useState([]);
  const [cobrancasVencidas, setCobrancasVencidas] = useState([]);

  const [valorPagas, setValorPagas] = useState('');
  const [valorPendentes, setValorPendentes] = useState('');
  const [valorVencidas, setValorVencidas] = useState('');

  const [clientesEmDia, setClientesEmDia] = useState([]);
  const [clientesInadimplentes, setClientesInadimplentes] = useState([]);

  const [qntdClientesEmDia, setQntdClientesEmDia] = useState('');
  const [qntdClientesInadimplentes, setQntdClientesInadimplentes] = useState('');

  const [carregando, setCarregando] = useState(false);

  const { token } = useAuth();

  const handleOffModalConfirm = () => {
    setIsOpenModalConfirm(false);
  }

  useEffect(() => {
    setCarregando(false);
    async function puxarClientesHome() {
      const promise = await fetch('https://back-end-equipe15.herokuapp.com/cobrancas-iniciais', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      })

      const response = await promise.json();
      setQntdPagas(response.qntdCobrancasPagas.count)
      setQntdPendentes(response.qntdCobrancasPendentes.count)
      setQntdVencidas(response.qntdCobrancasVencidas.count)

      setCobrancasPagas(response.cobrancasPagas)
      setCobrancasPendentes(response.cobrancasPendentes)
      setCobrancasVencidas(response.cobrancasVencidas)

      setValorPagas(response.valorCobrancasPagas[0].sum)
      setValorPendentes(response.valorCobrancasPendentes[0].sum)
      setValorVencidas(response.valorCobrancasVencidas[0].sum)

      setClientesEmDia(response.clientesEmDia)
      setClientesInadimplentes(response.clientesInadimplentes)

      setQntdClientesInadimplentes(response.qntdClientesInadimplentes[0].count)
      setQntdClientesEmDia(response.qntdClientesEmDia[0].count)
      setCarregando(true);
    }


    puxarClientesHome();
  }, [])

  return (
    <div className="ContainerHome">
      <SideBar />
      <div className="contHome">
        <HeaderHome
          titulo="Resumo das cobranças"
        />
        {!carregando ? <CircularProgress /> :
          <>
            <div className="main">
              <section className="cardTotais">



                <CardPago valor={valorPagas} />
                <CardVencido valor={valorVencidas} />
                <CardPendente valor={valorPendentes} />

              </section>
              <nav className="cardsection">
                <CardCobPagas cobrancasPagas={cobrancasPagas} qntdPagas={qntdPagas} />
                <CardcobVencidas cobrancasVencidas={cobrancasVencidas} qntdVencidas={qntdVencidas} />
                <CardCobPrevistas cobrancasPendentes={cobrancasPendentes} qntdPendentes={qntdPendentes} />
              </nav>
              <nav className="cardsectionBig">
                <CardInadimplenetes clientesInadimplentes={clientesInadimplentes} qntd={qntdClientesInadimplentes} />

                <CardEmDia clientesEmDia={clientesEmDia} qntd={qntdClientesEmDia} />
              </nav>
            </div>

            <ModalConfirmed
              isOpen={isOpenModalConfirm}
              onToggleModal={handleOffModalConfirm}
            />
          </>
        }
      </div>
    </div >
  )
}
export default Home;