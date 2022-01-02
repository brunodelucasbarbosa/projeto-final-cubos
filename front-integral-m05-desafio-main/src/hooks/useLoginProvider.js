import { useState } from 'react';
import {useLocalStorage} from 'react-use';
import { ToastContainer, toast } from 'react-toastify';

function useLoginProvider() {
  const [emailLogin, setEmailLogin] = useState('');
  const [erroEmailLogin, setErroEmailLogin] = useState(false);
  const [senhaErroLogin, setSenhaErroLogin] = useState(false);
  const [senhaLogin, setSenhaLogin] = useState('');
  const [token, setToken, removeToken] = useLocalStorage('token', '')
  const [dadosUsuario, setDadosUsuario, removeDadosUsuario] = useLocalStorage('dados', '');
  const [idClienteDetalhado, setIdClienteDetalhado] = useState();
  const [filtro, setFiltro] = useState('');

  function handleLogout(e) {
    e.preventDefault();
    removeDadosUsuario('dados', '');
    return removeToken('token', '');    
  }

  return {
    emailLogin,
    setEmailLogin,
    erroEmailLogin,
    setErroEmailLogin,
    senhaErroLogin,
    setSenhaErroLogin,
    senhaLogin,
    setSenhaLogin,
    token,
    setToken,
    removeToken,
    ToastContainer,
    toast,
    handleLogout,
    setDadosUsuario,
    dadosUsuario,
    idClienteDetalhado,
    setIdClienteDetalhado,
    filtro,
    setFiltro

  }
}

export default useLoginProvider;