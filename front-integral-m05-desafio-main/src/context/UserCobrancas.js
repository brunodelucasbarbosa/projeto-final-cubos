import { createContext } from "react"
import useCobrancasProvider from "../hooks/useCobrancasProvider";

const UserContextCobrancas = createContext({});

export function UserProviderCobrancas(props) {
  const userProvider = useCobrancasProvider();

  return (
    <UserContextCobrancas.Provider value={userProvider}>
      {props.children}
    </UserContextCobrancas.Provider>
  );
};

export default UserContextCobrancas;