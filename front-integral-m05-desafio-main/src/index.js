import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {UserProvider} from './context/UserContext';
import {UserProviderEdit} from './context/UserContextEdit'
import {UserProviderCadCliente} from './context/UserContextCadCliente'
import {UserProviderCobrancas} from './context/UserCobrancas'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <UserProviderEdit>
        <UserProviderCadCliente>
          <UserProviderCobrancas>
            <App />
          </UserProviderCobrancas>
       </UserProviderCadCliente>
      </UserProviderEdit>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

