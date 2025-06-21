import { createContext, useState } from "react";

//criando um contexto para que eu possa compartilhar meu armazenamento de clientes
export const ClientesContext = createContext()
ClientesContext.displayName = "Contexto Clientes";


export default function ClientesProvider({ children }) {



    const [faturamento, setFaturamento] = useState()
    const [vendasTotais, setVendasTotais] = useState(0);
    const [ticketMedio, setTicketMedio] = useState(0);
    const [estoqueTotal, setEstoqueTotal] = useState([]);
    const [quantEstoqueTotal, setQuantEstoqueTotal] = useState()

    const [clientes, setClientes] = useState([])
    const [pesquisaFiltrada, setPesquisaFiltrada] = useState([])
    const [pesquisaFiltradaProduto, setPesquisaFiltradaProduto] = useState([])
    const [pedidosDoCliente, setPedidosDoCliente] = useState([])
    const [pedidosAcumulados, setPedidosAcumulados] = useState([])
    const [pizza, setPizza] = useState([])


    return (


        <ClientesContext.Provider value={{
            clientes,
            pesquisaFiltrada,
            pedidosDoCliente,
            faturamento,
            vendasTotais,
            ticketMedio,
            estoqueTotal,
            quantEstoqueTotal,
            pesquisaFiltradaProduto,
            pedidosAcumulados,
            pizza,
            setClientes, 
            setPesquisaFiltrada, 
            setPedidosDoCliente,
            setFaturamento,
            setVendasTotais,
            setTicketMedio,
            setEstoqueTotal,
            setQuantEstoqueTotal,
            setPesquisaFiltradaProduto,
            setPedidosAcumulados,
            setPizza,

        }} >
            {children}
        </ClientesContext.Provider>



    )


}