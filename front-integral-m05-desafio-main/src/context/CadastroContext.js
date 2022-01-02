import { createContext } from "react"
import useCadastroProvider from '../hooks/useCadastroProvider';
const UserStepsContext = createContext({});

export function CadastroContext(props) {
  const userCadastro = useCadastroProvider();
  
  return (
    <UserStepsContext.Provider value={userCadastro}>
      {props.children}
    </UserStepsContext.Provider>
  );
};

export default UserStepsContext;