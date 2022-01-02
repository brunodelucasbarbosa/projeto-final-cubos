import { useState} from 'react';

function useCadClienteProvider() {
  const [emailCadCliente, setEmailCadCliente] = useState('');
  const [erroEmailCadCliente, setErroEmailCadCliente] = useState(false);
  const [nameCadCliente, setNameCadCliente] = useState('');
  const [erroNameCadCliente, setErroNameCadCliente] = useState(false);
  const [cpfCadCliente, setCpfCadCliente] = useState('');
  const [erroCpfCadCliente, setErroCpfCadCliente] = useState(false);
  const [tellCadCliente, setTellCadCliente] = useState('');
  const [erroTellCadCliente, setErroTellCadCliente] = useState(false);
  const [enderecoCadCliente, setEnderecoCadCliente] = useState('')
  const [ComplementoCadCliente, setComplementoCadCliente] = useState('')
  const [cepCadCliente, setCepCadCliente] = useState('')
  const [bairroCadCliente, setBairroCadCliente] = useState('')
  const [cidadeCadCliente, setCidadeCadCliente] = useState('')
  const [ufCadCliente, setUfCadCliente] = useState('')

  
    


  return {
    emailCadCliente, 
    setEmailCadCliente,
    erroEmailCadCliente, 
    setErroEmailCadCliente,
    nameCadCliente, 
    setNameCadCliente,
    erroNameCadCliente, 
    setErroNameCadCliente,
    cpfCadCliente, 
    setCpfCadCliente,
    erroCpfCadCliente, 
    setErroCpfCadCliente,
    tellCadCliente, 
    setTellCadCliente, 
    erroTellCadCliente, 
    setErroTellCadCliente,
    enderecoCadCliente,
    setEnderecoCadCliente,
    ComplementoCadCliente,
    setComplementoCadCliente,
    cepCadCliente,
    setCepCadCliente,
    bairroCadCliente,
    setBairroCadCliente,
    cidadeCadCliente,
    setCidadeCadCliente,
    ufCadCliente,
    setUfCadCliente
  }
}

export default useCadClienteProvider;