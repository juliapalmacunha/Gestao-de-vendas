import { useContext, useState } from "react";
import { ClientesContext } from "../contextos/ClientesContext";
import useHookCrud from "./HookCrud";




export default function useHookGrafico() {



    const { clientes, estoqueTotal } = useContext(ClientesContext);
    const { acessarPedidosCliente } = useHookCrud()



    //ATUALIZANDO GRAFICO BARRA LATERAL
    const atualizarGraficoBarraLateral = async ({ cidades, setCidades }) => {

        const cidadesAtualizadas = cidades.map(cidade => ({ ...cidade, valor: 0 }));

        await Promise.all(
            clientes.map(async (cliente) => {
                const cidadeDoCliente = cliente.cidade
                const pedidosDoCliente = await acessarPedidosCliente(cliente.id);
                const quantidadePedidosDoCliente = pedidosDoCliente.length
                const cidadeEncontrada = cidadesAtualizadas.find(linhaDoArray => linhaDoArray.nome === cidadeDoCliente)

                if (cidadeEncontrada) {
                    cidadeEncontrada.valor += quantidadePedidosDoCliente
                }
            })
        );
        setCidades(cidadesAtualizadas)
    };



    //ATUALIZANDO GRAFICO BARRA VERTICAL
    const atualizarGraficoBarraVertical = async ({ filtro, setChartDataBarra }) => {

        const novoDadosGrafico = await Promise.all(
            clientes.map(async (cliente) => {
                const pedidosDoCliente = await acessarPedidosCliente(cliente.id);
                return pedidosDoCliente.reduce((acumulador, pedido) => {
                    if (filtro === "quantidade") return acumulador + Number(pedido.quantidade);
                    if (filtro === "preco") {
                        const precoNumerico = parseFloat(pedido.preco.replace(/[R$\s.]/g, "").replace(",", "."));
                        return acumulador + precoNumerico;
                    }
                    return 0;
                }, 0);
            })
        );

        setChartDataBarra({
            labels: clientes.map((cliente) => cliente.nome),
            datasets: [{ label:`${filtro} por cliente`, data: novoDadosGrafico, backgroundColor: "rgba(81, 108, 241, 0.599)" }],
        });
    };




    //ATUALIZANDO GRAFICO LINHA
    const atualizarGraficoLine = async (meses, setMeses, setLineChartData, criarGradiente) => {

        const mesesAtualizados = meses.map(mes => ({ ...mes, valor: 0 }));
        const novoDadosGrafico = await Promise.all(
            clientes.map(async (cliente) => {
                const pedidosDoCliente = await acessarPedidosCliente(cliente.id);

                pedidosDoCliente.forEach((pedido) => {
                    const data = new Date(pedido.data);
                    const numeroMes = data.getMonth();

                    if (numeroMes >= 0 && numeroMes < 12) {
                        mesesAtualizados[numeroMes].valor++;
                    }
                });

                return { nome: cliente.nome };
            })
        );
        setMeses(mesesAtualizados);
        setLineChartData({
            labels: mesesAtualizados.map((mes) => mes.nome),
            datasets: [
                {
                    label: "Vendas por Mês",
                    data: mesesAtualizados.map((mes) => mes.valor),
                    tension: 0.4,
                    fill: true,
                    backgroundColor: criarGradiente,
                    borderColor: "#16046a",
                    pointBackgroundColor: "#0046a0",
                    pointBorderColor: "#2be9f7",
                },
            ],
        });
    };




    //ATUALIZAR GRAFICO BARRA VERTICAL ESTOQUE
    const atualizarGraficoBarraVerticalEstoqueUmDeCada = async (setChartDataBarraEstoqueUmDeCada, criarGradienteBarraEstoqueUmDeCada) => {

        const novosDadosGrafico = estoqueTotal.map((produto) => {
            return produto.quantidade
        })

        setChartDataBarraEstoqueUmDeCada({
            labels: estoqueTotal.map((produto) => produto.produto),
            datasets: [{ label: "Quantidade de Produtos no Estoque", data: novosDadosGrafico, backgroundColor: criarGradienteBarraEstoqueUmDeCada }],
        });
    };


    return {

        atualizarGraficoBarraLateral,
        atualizarGraficoBarraVertical,
        atualizarGraficoLine,
        atualizarGraficoBarraVerticalEstoqueUmDeCada

    };
}
