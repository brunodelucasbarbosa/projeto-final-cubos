import { useContext } from 'react';
import UserContextEdit from '../context/UserContextEdit';

function useUserEdit() {
  return useContext(UserContextEdit);
}

export default useUserEdit;