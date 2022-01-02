import {useState } from 'react';

function useEditProvider() {
  
  const [emailEdit, setEmailEdit] = useState('');
  const [erroEmailEdit, setErroEmailEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState('');
  const [erroNameEdit, setErroNameEdit] = useState(false);
  const [cpfEdit, setCpfEdit] = useState('');
  const [erroCpfEdit, setErroCpfEdit] = useState(false);
  const [tellEdit, setTellEdit] = useState('');
  const [newPasswordEdit, setNewPasswordEdit] = useState('');
  const [erroNewPassEdit, setErroNewPassEdit] = useState(false);
  const [confirmNewPassEdit, setConfirmNewPassEdit] = useState('');
  const [erroConfirmNewPassEditEdit, setErroConfirmNewPassEditEdit] = useState(false);
  const [passwordDifEdit, setErroPassworDifEdit] = useState(false);

  return {
    emailEdit, 
    setEmailEdit,
    erroEmailEdit, 
    setErroEmailEdit,
    nameEdit, 
    setNameEdit,
    erroNameEdit, 
    setErroNameEdit,
    cpfEdit, 
    setCpfEdit,
    erroCpfEdit, 
    setErroCpfEdit,
    tellEdit, 
    setTellEdit, 
    newPasswordEdit, 
    setNewPasswordEdit, 
    erroNewPassEdit, 
    setErroNewPassEdit, 
    confirmNewPassEdit, 
    setConfirmNewPassEdit, 
    erroConfirmNewPassEditEdit, 
    setErroConfirmNewPassEditEdit,
    passwordDifEdit, 
    setErroPassworDifEdit
  }
}

export default useEditProvider;