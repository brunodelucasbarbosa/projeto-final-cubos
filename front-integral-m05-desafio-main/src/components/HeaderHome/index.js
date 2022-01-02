import { useState } from 'react';
import './styles.css'
import setaBaixo from '../../assets/setaBaixo.svg'
import useAuthProvider from '../../hooks/useLoginProvider';
import CardConfig from '../../components/CardConfig';
import ModalEditUser from '../../components/ModalEditUser/ModalEditUser';

function HeaderHome({ titulo, detalhesCliente }) {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalConf, setIsOpenModalConf] = useState(false);
  const { dadosUsuario } = useAuthProvider();

  const handleToggleModalConf = () => {
    setIsOpenModalConf((prevState) => !prevState);
  };
  const handleToggleModalEdit = () => {
    setIsOpenModalEdit((prevState) => !prevState);
  };

  return (
    <div className="containerheaderHome" >
      <div className="headerHome">
        <div className="headerDetClient">
          <h1 className={window.location.pathname === "/home" ? "h1Header" : "h1cobCli"}>{titulo}</h1>
          <p>{detalhesCliente}</p>
        </div>

        <div className="headerUsuario">
          <h3 className="h3rUsuario">{`${ dadosUsuario.name[0] }${ dadosUsuario.name[1] }`}</h3>
          <p className="nameHeader">{`${ dadosUsuario.name }`}</p>

          <div className="modalConfigurar botao">
            <img src={setaBaixo}
              alt="seta pra baixo"
              onClick={handleToggleModalConf}
            />
          <CardConfig
            isOpen={isOpenModalConf}
            onToggleModal={handleToggleModalEdit}
            onToggleModalConf={handleToggleModalConf}
            />
          </div>
          <ModalEditUser
            isOpen={isOpenModalEdit}
            onToggleModal={handleToggleModalEdit}
          />

        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
