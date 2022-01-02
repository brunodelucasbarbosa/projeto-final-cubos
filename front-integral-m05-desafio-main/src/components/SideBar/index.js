import './styles.css'
import homepink from '../../assets/homepink.svg'
import homeBlack from '../../assets/homeblack.svg'
import imgclientesblack from '../../assets/clienteblack.svg'
import imgclientespink from '../../assets/clientepink.svg'
import imgcobrançaBlack from '../../assets/cobrançasblack.svg'
import imgcobrançapink from '../../assets/cobrançasPink.svg'

import { NavLink} from 'react-router-dom'

function SideBar() {
    return (
      <div className="containersidebar">
        <div className="sidebar">
          <div className = "sidebarHome">
            <NavLink to = "/home">
            <img 
            src = {window.location.pathname === "/home"? homepink: homeBlack}
            alt = "icon home"
            className={window.location.pathname.includes('/home') ? 'active ': '' }
            />
            </NavLink>
            <NavLink to = "/home"> Home</NavLink>
          </div>
          <div className = "sidebarHome">
            <NavLink to = "/clientes/Todos">
            <img 
            src = {window.location.pathname.includes('/clientes/') ?  imgclientespink: imgclientesblack }
            className={window.location.pathname.includes('/clientes/') ? 'active ': '' }
            alt = "icon clientes"
            />
            </NavLink>
            <NavLink to="/clientes/Todos" style={{color: window.location.pathname.includes('/clientes/') ? '#DA0175' : 'black'
            }}>Clientes</NavLink>
          </div>
          <div className = "sidebarHome">
            <NavLink to = "/cobrancas/todas">
            <img 
            src = {window.location.pathname.includes('/cobrancas/') ? imgcobrançapink : imgcobrançaBlack}
            alt = "icon cobranças"
            className={window.location.pathname.includes('/cobrancas/') ? 'active ': '' }
            />
            </NavLink>
            <NavLink
            to = "/cobrancas/todas"
            style={{color: window.location.pathname.includes('/cobrancas/') ? '#DA0175' : 'black'
            }}>Cobranças</NavLink>
          </div>
        </div>
      </div>
    );
  }

  export default SideBar;
  