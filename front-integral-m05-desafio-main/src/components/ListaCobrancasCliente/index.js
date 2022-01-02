import editar from '../../assets/iconEditar.svg'
import deletar from '../../assets/lixeira.png'

function ListaCobrancasCliente({clienteNome, status_cobranca, valor, descricao, data_vencimento, id}) {

  function formatData(data) {
    const dia = data.substr(5, 2);
    const mes = data.substr(8, 2);
    const ano = data.substr(0, 4);
    return `${dia}/${mes}/${ano}`
  }


    return (
      <ul className="Linhacobrança">
      <li className="ColunCob">{clienteNome}</li>
      <li className="ColunCob">{id}</li>
      <li className="ColunCob">R${valor}</li>
      <li className="ColunCob">{formatData(data_vencimento)}</li>
      <li className="ColunCob">{status_cobranca}</li>
      <li className="descricaoCob">{descricao}</li>
      <li className = "editDelet">
        <div className = "editeDelet">
          <img src = {editar} alt = "editar"/>
          <p>Editar</p>
        </div>
        <div className = "editeDelet">
          <img src = {deletar} alt = "deletar"/>
          <p>Deletar</p>
        </div>
      </li>
    </ul>
    );
  }
  
  export default ListaCobrancasCliente;
  

  // {cobrancasDoCliente.map((cobranca, index) => {
  //   return (
  //     <div>
  //       <span>{cobranca.id}</span>
  //     </div>
  //   );
  // })}