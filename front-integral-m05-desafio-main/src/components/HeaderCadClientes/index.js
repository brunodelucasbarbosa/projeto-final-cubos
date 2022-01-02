import './styles.css'
import setaBaixo from '../../assets/setaBaixo.svg'
import useAuthProvider from '../../hooks/useLoginProvider';

function HeaderCadClientes({ onToggleModalCadCliente }) {

  const { dadosUsuario } = useAuthProvider();

  return (
    <div className="containerheaderHome" >
      <div className="headerHome" >
        <h3 className="h3Header">Clientes</h3>
        <div className="headerUsuario">
          <h3 className="h3rUsuario">{`${ dadosUsuario.name[0] }${ dadosUsuario.name[1] }`}</h3>
          <p className="nameHeader">Lorena</p>
          <img src={setaBaixo}
            alt="seta para baixo"
            onClick={onToggleModalCadCliente}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderCadClientes;
