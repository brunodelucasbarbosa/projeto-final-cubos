import './styles.css'

function LinhaClientes ({clienteNome, idCob, valor}){
    return(
        <>
        <div className = "estLinha sectionLinhaUser">
         <p className = "pLine">{clienteNome}</p>
         <p className = "pLine">{idCob}</p>
         <p className = "pLine">R$ {valor}</p>
       </div>
       </>
    )
}
export default LinhaClientes;