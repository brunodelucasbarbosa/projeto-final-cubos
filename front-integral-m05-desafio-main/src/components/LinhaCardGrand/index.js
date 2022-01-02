import './styles.css'

function LinhaCardGrand ({nome, cpf, id}){
    return(
        <>
        <div className = "estLinha sectionLinhaBig">
         <p className = "pLineBig">{nome}</p>
         <p className = "pLineBig">{id}</p>
         <p className = "pLineBig">{cpf}</p>
       </div>
       </>

    )
}
export default LinhaCardGrand;