import { createContext } from "react"
import useCadCliente from "../hooks/useCadClienteProvider";

const UserContextCadCliente = createContext({});

export function UserProviderCadCliente(props) {
  const userProvider = useCadCliente();   

  return (
    <UserContextCadCliente.Provider value={userProvider}>
      {props.children}
    </UserContextCadCliente.Provider>
  );
};

export default UserContextCadCliente;