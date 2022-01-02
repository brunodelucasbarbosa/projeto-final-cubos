import lixeira from '../../assets/lixeira.png'
import editar from '../../assets/iconEditar.svg'
import { useState } from 'react'
import ModalEditarCobranca from '../ModalEditarCobranca'
import ModalDescricao from '../ModalDescricao'
import ModalConfirmDel from '../ModalConfirmDel'
import './styles.css'
import useCobrancas from '../../hooks/useCobrancasProvider';


export default function LinhaCobrancasCliente({setCobrançaClientes, id, data_vencimento, valor, status_cobranca, descricao, token, cliente_id }) {
  
  const [openModalDetalhe, setOpenModalDetalhe] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [ detalhesCobranca, setDetalheCobranca] = useState('')
  
  const {openModalEdit, setOpenModalEdit} = useCobrancas();

  function formatData(data) {
    const dia = data.substr(8, 2);
    const mes = data.substr(5, 2);
    const ano = data.substr(0, 4);
    return `${ dia }/${ mes }/${ ano }`
  }


  const handleDetalhe = async () => {
  try {
      const promise = await fetch(`https://back-end-equipe15.herokuapp.com/detalharcobranca/${ id }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      })
      const response = await promise.json();
      return response;
    } catch (error) {
      return error.message;
    }
  };
  const retornoHandleDetalhe = async()=>{
      await handleDetalhe().then(response => setDetalheCobranca(response.cobrancas))
      setOpenModalDetalhe(true)
  }
  
  
  return (
    <>
    <div>
      <div className="elementos_linha_container_cliente-detalhado-cobrancas" >
      <div className='flexIdDate' onClick={retornoHandleDetalhe}>
        <h3>{id}</h3>
      </div>
      <div className='flexIdDate' onClick={retornoHandleDetalhe}>
        <h3>{formatData(data_vencimento)}</h3>
      </div>
      <h3 className='h3CobCli' onClick={retornoHandleDetalhe}>R$ {valor}</h3>
      <h3 id={status_cobranca} className='statuscob' onClick={retornoHandleDetalhe}>{status_cobranca}</h3>
      <h3 className='h3CobCliDesc' onClick={retornoHandleDetalhe}>{descricao}</h3>
      <div className='h3CobCli'>
        <div className='editeDelet' onClick={() => setOpenModalEdit(true)}>
          <img src={editar} alt="editar icone" />
          <p>Editar</p>
        </div>
        <div className='editeDelet' onClick={()=> setOpenModalDelete(true)}>
          <img src={lixeira} alt="lixeira icone"/>
          <p className='lixeira'>Excluir</p>
        </div>
      </div>
    </div>
    </div>
    
    {openModalEdit && <ModalEditarCobranca
        setOpenModalEdit={setOpenModalEdit}
        id={id}
        cliente_id={cliente_id}
        setCobrançaClientes={setCobrançaClientes}
      />}
      {openModalDetalhe && <ModalDescricao
      isOpen={openModalDetalhe}
      onToggleModal = {()=> setOpenModalDetalhe(false)}
      nome = {detalhesCobranca.nome}
      descricao = {detalhesCobranca.descricao}
      valor = {detalhesCobranca.valor}
      id = {detalhesCobranca.id}
      status = {detalhesCobranca.status_cobranca}
      data_vencimento = {formatData(detalhesCobranca.data_vencimento)}
      />}
      {openModalDelete && <ModalConfirmDel
      isOpen = {openModalDelete}
      onToggleModal = {()=> setOpenModalDelete(false)}
      setCobrançaClientes = {setCobrançaClientes}
      setOpenModalDelete = {setOpenModalDelete}
      id = {id}
      token = {token}
      />}
    </>
  )
}
