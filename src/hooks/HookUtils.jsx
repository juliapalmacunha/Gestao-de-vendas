import React, { useContext } from 'react'
import { ClientesContext } from '../contextos/ClientesContext'

export default function useHookUtils(){

  const {setQuantEstoqueTotal, estoqueTotal, setTicketMedio, faturamento, vendasTotais } = useContext(ClientesContext)


  //CALCULANDO A QUANTIDADE TOTAL DE ITENS NO ESTOQUE
  const calculandoValorTotalEstoque = () => {

    const somaDoEstoque = estoqueTotal.reduce((acumulador, itemAtual) => {
        return acumulador + Number(itemAtual.quantidade)
    }, 0 )
    setQuantEstoqueTotal(somaDoEstoque)  
  }


   //CALCULANDO O TICKET MEDIO
   const calculandoTicketMedio = () => {
   
    const faturamentoLimpo = typeof faturamento === 'string'
      ? faturamento
          .replace(/\s/g, '')         
          .replace('R$', '')          
          .replace(/\./g, '')        
          .replace(',', '.')          
          .trim()
      : faturamento;
    const faturamentoNumerico = Number(faturamentoLimpo);
    const vendasTotaisNumerico = Number(vendasTotais);
  
    if (vendasTotaisNumerico > 0 && !isNaN(faturamentoNumerico)) {
      const ticketMedioCalculo = faturamentoNumerico / vendasTotaisNumerico;
      setTicketMedio(ticketMedioCalculo);
    } else {
      console.log("Condição falhou. Setando ticket médio como 0");
      setTicketMedio(0);
    }
  };
  
  


    return{
        calculandoValorTotalEstoque,
        calculandoTicketMedio
    }
}