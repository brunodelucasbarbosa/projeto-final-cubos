import Home from './pages/Home'
import React from "react";
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Clientes from './pages/Clientes';
import useUser from './hooks/useUser';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Cobranças from './pages/Cobranças';


function App() {
  const { token } = useUser();

  function RotasProtegidas(props) {
    return (
      <Route
        render={() => token ? (props.children) : (<Redirect to="/" />)}
      />
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/login" component={token ? Home : Login} />
        <Route path="/" exact component={token ? Home : Login} />
        <RotasProtegidas>
          <Route path="/clientes/:filtro" component={Clientes} />
          <Route path="/cobrancas/:filtro" component={Cobranças} />
          <Route path="/home" component={Home} />
        </RotasProtegidas>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
