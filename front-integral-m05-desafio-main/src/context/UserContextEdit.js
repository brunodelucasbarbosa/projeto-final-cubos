import { createContext } from "react"
import useEditProvider from "../hooks/useEditProvider";

const UserContextEdit = createContext({});

export function UserProviderEdit(props) {
  const userProvider = useEditProvider();

  return (
    <UserContextEdit.Provider value={userProvider}>
      {props.children}
    </UserContextEdit.Provider>
  );
};

export default UserContextEdit;