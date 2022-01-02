import React from 'react'
import successDelete from '../../assets/success-delete.svg'

export default function CobrancaExcluida({onToggleModal, operacao}) {
  return (
    <div className="containerModalDelet">
    <div className='cardModalDelet' >
      <nav className='closeDescricao'>
        <h1 onClick={() => onToggleModal(false)} style={{cursor: 'pointer'}}>X</h1>
      </nav>
      <section className='elementosCardDel'  >
        <div style={{display: 'flex', flexDirection: 'column' ,alignItems: 'center', gap: '2rem'}}>
          <img src={successDelete} alt='excluir' style={{width: '50%', padding: '2rem'}} />
          <h3 className='h3Carddelete' style={{color: '#25AE88'}}>Cobrança {operacao} com sucesso!</h3>
        </div>
      </section>
    </div>
  </div>
  )
}
