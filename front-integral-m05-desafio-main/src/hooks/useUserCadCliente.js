import { useContext } from 'react';
import UserContextCadCliente from '../context/UserContextCadCliente';

function useUserCadCliente() {
  return useContext(UserContextCadCliente);
}

export default useUserCadCliente;