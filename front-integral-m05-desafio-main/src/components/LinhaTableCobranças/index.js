import './styles.css'
import { useState } from 'react';
import editar from '../../assets/iconEditar.svg'
import deletar from '../../assets/lixeira.png'
import ModalEditarCobranca from '../ModalEditarCobranca';
import ModalConfirmDel from '../ModalConfirmDel';
import ModalDescricao from '../ModalDescricao';
import useLogin from '../../hooks/useLoginProvider'
import useCobrancas from '../../hooks/useCobrancasProvider'


function LinhaTableCobrança({setCobrançaClientes, clienteNome, status_cobranca, valor, descricao, data_vencimento, id,  cliente_id} ) {

  const {openModalDelete, setOpenModalDelete, setOpenModalEdit, openModalEdit} = useCobrancas();
  const [openModalDetalhe, setOpenModalDetalhe] = useState(false);
  const [ detalhesCobranca, setDetalheCobranca] = useState('')

  const {token} = useLogin();

  function formatData(data) {
    const dia = data.substr(8, 2);
    const mes = data.substr(5, 2);
    const ano = data.substr(0, 4);
    return `${dia}/${mes}/${ano}`
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
      <ul className="Linhacobrança" style={{cursor: 'pointer'}} >
      <li className="ColunCob" onClick={retornoHandleDetalhe}>{clienteNome}</li>
      <li className="ColunCob" onClick={retornoHandleDetalhe}>{id}</li>
      <li className="ColunCob" onClick={retornoHandleDetalhe}>R${valor}</li>
      <li className="ColunCob" onClick={retornoHandleDetalhe}>{formatData(data_vencimento)}</li>
      <li className="ColunCob" id={status_cobranca} onClick={retornoHandleDetalhe}>{status_cobranca}</li>
      <li className="descricaoCob" onClick={retornoHandleDetalhe}>{descricao}</li>
      <li className = "editDelet">
        <div className="editeDelet botao" onClick={() => setOpenModalEdit(true)}>
          <img src = {editar} alt = "editar"/>
          <p>Editar</p>
        </div>
        <div className = "editeDelet botao" onClick={() => setOpenModalDelete(true)}>
          <img src = {deletar} alt = "deletar" />
          <p>Deletar</p>
        </div>
      </li>
     
    </ul>
     {openModalEdit && <ModalEditarCobranca 
      setOpenModalEdit={setOpenModalEdit}
      id={id}
      cliente_id={cliente_id}
      setCobrançaClientes = {setCobrançaClientes}
      />}
      {openModalDelete && <ModalConfirmDel
      isOpen = {openModalDelete}
      onToggleModal = {()=> setOpenModalDelete(false)}
      setCobrançaClientes = {setCobrançaClientes}
      setOpenModalDelete = {setOpenModalDelete}
      id = {id}
      token = {token}
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
    </>
    );
  }
  
  export default LinhaTableCobrança;
  