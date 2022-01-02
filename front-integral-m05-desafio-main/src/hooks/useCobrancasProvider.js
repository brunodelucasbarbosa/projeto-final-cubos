import {useState} from 'react';

function useCobrancasProvider() {
  
  const [modalCriarCobranca, setModalCriarCobranca] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  
  return {
    modalCriarCobranca, setModalCriarCobranca, openModalEdit, setOpenModalEdit, openModalDelete, setOpenModalDelete
  }
}

export default useCobrancasProvider;