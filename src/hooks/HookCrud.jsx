import { useContext, useState } from "react";
import { ClientesContext } from "../contextos/ClientesContext";
import { getDocs, collection, doc, updateDoc, addDoc, deleteDoc, query, where, getDoc } from "firebase/firestore";
import {  db } from "../Firebase/firebaseConfig";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

// Hook personalizado com funcionalidades CRUD
export default function useHookCrud() {


    const navigate = useNavigate();

    const { clientes, setClientes, setProdutosDoEstoque, pesquisaFiltrada, setPesquisaFiltrada, setPesquisaFiltradaProduto, setPedidosDoCliente, setVendasTotais, setFaturamento, setPedidosAcumulados, pedidosAcumulados, setEstoqueTotal, setPizza, setDataListMensal } = useContext(ClientesContext);



    //BUSCAR CLIENTE VIA FIRESTORE
    const buscarClientes = async () => {
        try {
            const buscandoDados = await getDocs(collection(db, "clientes"));
            const dadosCliente = buscandoDados.docs.map((cliente) => ({
                id: cliente.id,
                ...cliente.data(),
            }));

            setClientes(dadosCliente);


        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };


    //BUSCAR PRODUTOS NO ESTOQUE
    const buscarProdutosNoEstoque = async () => {
        try {
            const buscandoDados = await getDocs(collection(db, "estoque"));
            const dadosProduto = buscandoDados.docs.map((produto) => ({
                id: produto.id,
                ...produto.data(),
            }));

            setProdutosDoEstoque(dadosProduto);


        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };

    //EDITAR CLIENTE VIA FIRESTORE
    const editarCliente = async (nome, telefone, cidade, estado, id) => {

        try {
            const IdCliente = doc(db, "clientes", id);
            const novosDados = {
                nome,
                telefone,
                cidade,
                estado,
            };

            await updateDoc(IdCliente, novosDados);

            toast.success("Cliente atualizado com sucesso!");
            buscarClientes();

        } catch {
            console.error("Erro ao atualizar cliente");
            toast.error("Erro ao atualizar cliente");
        }
    };



    //ADICIONAR CLIENTE VIA FIRESTORE
    const adicionarCliente = async ({ nome, telefone, cidade, estado }) => {

        console.log(nome, telefone, cidade, estado)

        try {
            await addDoc(collection(db, "clientes"), {
                nome,
                telefone,
                cidade,
                estado,
            });

            toast.success("Cliente cadastrado com sucesso!");

        } catch (e) {
            console.error("Erro ao enviar dados", e.message);
            toast.error(`Erro ao cadastrar cliente: ${e.message}`);
        }
    };




    //DELETAR CLIENTE
    const deletarCliente = async (id) => {

        try {
            // Referência ao cliente
            const clienteRef = doc(db, "clientes", id);

            const pedidosRef = collection(clienteRef, "pedidos");
            const pedidosSnapshot = await getDocs(pedidosRef);

            for (const pedidoDoc of pedidosSnapshot.docs) {
                await deleteDoc(doc(pedidosRef, pedidoDoc.id))
            }

            await deleteDoc(clienteRef);

            buscarClientes();

            toast.success("Cliente e seus pedidos foram deletados com sucesso!");

        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            toast.error("Erro ao deletar cliente!");
        }
    };


    //DELETAR PEDIDO ESPECIFICO DO CLIENTE
    const deletarPedido = async (idDoCliente, idDoPedido) => {
        


        try {

            const clienteRef = doc(db, "clientes", idDoCliente);

            const pedidosRef = doc(clienteRef, "pedidos", idDoPedido);

            await deleteDoc(pedidosRef);
            toast.success("Pedido deletado com sucesso")
        } catch (error) {
            toast.error("Erro ao deletar pedido:", error)
        }
    }




    //FORMATANDO PALAVRA
    const capitalizarPrimeiraLetra = (texto) => {
        if (!texto) return ""; // Verifica se o texto é vazio
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    };



    //PROCURANDO O CLIENTE COM BASE NO NOME
    const buscarClientePorNome = async (pesquisa) => {

        try {

            if (!pesquisa.trim()) {
                setPesquisaFiltrada([]);
                return;
            }

            const pesquisaFormatada = capitalizarPrimeiraLetra(pesquisa.trim());

            const q = query(
                collection(db, "clientes"),
                where("nome", ">=", pesquisaFormatada),
                where("nome", "<=", pesquisaFormatada + "\uf8ff")
            );

            const resultado = await getDocs(q)
            const filtrandoPesquisa = resultado.docs.map((cliente) => ({
                id: cliente.id,
                ...cliente.data(),
            }))

            setPesquisaFiltrada(filtrandoPesquisa)


        } catch (error) {
            console.error("Erro ao buscar clientes por nome:", error);
            setPesquisaFiltrada([])

        }

    }




    //PROCURANDO O PRODUTO DO ESTOQUE POR NOME 
    const buscarProdutoNoEstoquePorNome = async (pesquisa) => {

        try {

            if (!pesquisa.trim()) {
                setPesquisaFiltradaProduto([]);
                return;
            }

            const pesquisaFormatada = capitalizarPrimeiraLetra(pesquisa.trim());

            const q = query(
                collection(db, "estoque"),
                where("produto", ">=", pesquisaFormatada),
                where("produto", "<=", pesquisaFormatada + "\uf8ff")
            );

            const resultado = await getDocs(q)
            const filtrandoPesquisa = resultado.docs.map((produto) => ({
                id: produto.id,
                ...produto.data(),
            }))



            setPesquisaFiltradaProduto(filtrandoPesquisa)

        } catch (error) {
            console.error("Erro ao buscar produto no estoque por nome:", error);
            setPesquisaFiltradaProduto([])

        }

    }




    //ENVIANDO PEDIDO PARA UMA SUBCOLEÇÃO CRIADA DE ACORDO COM O CLIENTE, E SUBTRAINDO DO ESTOQUE
    const enviarPedidoCliente = async (produto, quantidade, id) => {
        try {
            // Consulta o estoque e traz apenas o primeiro produto correspondente
            const q = query(
                collection(db, "estoque"),
                where("produto", "==", produto),
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast.warn('Produto não encontrado no estoque');
                return;
            }

            const documento = querySnapshot.docs[0];
            const produtoDocRef = documento.ref;
            const produtoData = documento.data();

            if (produtoData.quantidade < Number(quantidade)) {
                toast.warn(`Quantidade insuficiente no estoque. Apenas ${produtoData.quantidade} unidades disponíveis.`);
                return;
            }

            // Atualiza o estoque
            const novaQuantidade = produtoData.quantidade - Number(quantidade);
            await updateDoc(produtoDocRef, { quantidade: novaQuantidade });

            // Adiciona o pedido direto no cliente
            const pedidosRef = collection(doc(db, 'clientes', id), 'pedidos');
            const precoUnitario = 1.50;
            const pedido = {
                produto,
                quantidade,
                data: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-'),
                preco: (quantidade * precoUnitario).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            };

            await addDoc(pedidosRef, pedido);
            toast.success('Pedido cadastrado com sucesso');

        } catch (error) {
            console.error('Erro ao cadastrar o pedido: ', error);
            toast.error('Erro ao cadastrar o pedido');
        }
    };



    ///BUSCANDO OS PEDIDOS DO CLIENTE
    const acessarPedidosCliente = async (id) => {
        try {

            const clienteRef = doc(db, "clientes", id);
            const pedidosRef = collection(clienteRef, "pedidos");
            const pedidosSnapshot = await getDocs(pedidosRef);

            const pedidos = pedidosSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPedidosDoCliente(pedidos)
            return pedidos;
        } catch (error) {
            console.error("Erro ao acessar pedidos do cliente:", error);
        }
    };




    //ADICIONAR PRODUTO AO ESTOQUE VIA FIRESTORE
    const adicionarProdutoEstoque = async (produto, quantidade) => {
        try {

            const q = query(
                collection(db, "estoque"),
                where("produto", "==", produto)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    const produtoDocRef = doc.ref;
                    const produtoData = doc.data();
                    const novaQuantidade = Number(produtoData.quantidade) + Number(quantidade);

                    await updateDoc(produtoDocRef, { quantidade: novaQuantidade });

                    toast.info("Quantidade atualizada no estoque!");
                });
            } else {

                await addDoc(collection(db, "estoque"), {
                    produto,
                    quantidade: quantidade
                });

                toast.success("Produto cadastrado no estoque com sucesso!");
            }

        } catch (e) {
            console.error("Erro ao enviar dados", e.message);
            toast.error(`Erro ao cadastrar ou atualizar produto no estoque: ${e.message}`);
        }
    };




    //CALCULO DO TOTAL DE ITENS VENDIDOS
    const mostraVendaTotal = async () => {
        const novoDadosGrafico = await Promise.all(
            clientes.map(async (cliente) => {
                const pedidosDoCliente = await acessarPedidosCliente(cliente.id);
                return pedidosDoCliente.reduce((acumulador, pedido) => {
                    return acumulador + Number(pedido.quantidade);
                }, 0);
            })
        );

        const somaTotal = novoDadosGrafico.reduce((acumulador, valor) => acumulador + valor, 0);
        return setVendasTotais(somaTotal);

    };




    //CALCULO DE FATURAMENTO TOTAL
    const mostraFaturamentoTotal = async () => {

        const novoDadosGrafico = await Promise.all(
            clientes.map(async (cliente) => {
                const pedidosDoCliente = await acessarPedidosCliente(cliente.id);
                return pedidosDoCliente.reduce((acumulador, pedido) => {
                    const precoNumerico = parseFloat(pedido.preco.replace(/[R$\s.]/g, "").replace(",", "."));
                    return acumulador + precoNumerico;
                }, 0);
            })
        );

        const somaTotal = novoDadosGrafico.reduce((acumulador, valor) => acumulador + valor, 0);
        return setFaturamento(
            somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        );
    };



    //CALCULO DE ITENS MAIS VENDIDOS DE FORMA ACUMULADA, PREPARANDO...
    const mostraItensMaisVendido = async () => {

        const provisoria = [];

        const listaDeItensTemp = await Promise.all(
            clientes.map(async (cliente) => {
                const pedidosDeUmCliente = await acessarPedidosCliente(cliente.id);
                return pedidosDeUmCliente.map((pedido) => ({
                    produto: pedido.produto,
                    quantidade: pedido.quantidade
                }));
            })
        );

        provisoria.push(...listaDeItensTemp.flat());

        const itensAgrupados = provisoria.reduce((acumulado, item) => {
            if (acumulado[item.produto]) {
                acumulado[item.produto] += Number(item.quantidade);
            } else {
                acumulado[item.produto] = Number(item.quantidade);
            }
            return acumulado;
        }, {});

        const listaFinal = Object.entries(itensAgrupados).map(([produto, quantidade]) => ({
            produto,
            quantidade
        }));

        setPedidosAcumulados(listaFinal);
    };


    //CALCULO DOS 10 ITENS MAIS VENDIDOS
    const primeirosDezItensMaisVendidos = () => {
        const totalDeItensVendidosOrdemCrescente = pedidosAcumulados
            .sort((a, b) => b.quantidade - a.quantidade);

        const top10 = totalDeItensVendidosOrdemCrescente.slice(0, 10);

        const novoArray = top10.map((item, index) => {
            return {
                id: index,
                value: item.quantidade,
                label: item.produto
            };
        });

        setPizza(novoArray);
    };


    //CALCULO DA QUANTIDADE TOTAL NO ESTOQUE 
    const buscaQuantidadeTotalNoEstoqueUmDeCada = async () => {

        try {

            const buscandoDadosEstoque = await getDocs(collection(db, "estoque"));
            const dadosEstoque = buscandoDadosEstoque.docs.map((produto) => ({
                id: produto.id,
                ...produto.data(),
            }));
            setEstoqueTotal(dadosEstoque)
        } catch (e) {
            console.error("Erro ao enviar dados", e.message);

        }

    }



    //BUSCANDO DADOS CORRESPONDENTE AO MES
    const buscandoArquivoCorrespondenteAoMes = async (mesParametro) => {

        const formatarDataParaDate = (dataInput) => {
            if (!dataInput) return null;

            if (dataInput instanceof Date) {
                return dataInput;
            }

            if (typeof dataInput.toDate === "function") {
                return dataInput.toDate();
            }

            if (typeof dataInput === "string") {
                return new Date(dataInput);
            }

            return null;
        };

        const clientesSnapshot = await getDocs(collection(db, "clientes"));

        const lista = []

        for (const clienteDoc of clientesSnapshot.docs) {
            const nomeDoCliente = clienteDoc.data().nome;
            const clienteId = clienteDoc.id;
            const clienteData = clienteDoc.data();

            // Subcoleção de pedidos
            const pedidosRef = collection(db, "clientes", clienteId, "pedidos");
            const pedidosSnapshot = await getDocs(pedidosRef);

            
            const pedidosDoMes = [];


            pedidosSnapshot.forEach((pedidoDoc) => {
                const pedidoData = pedidoDoc.data();

                const dataPedido = formatarDataParaDate(pedidoData.data);

                if (dataPedido) {
                    const mesPedido = dataPedido.getMonth() + 1;

                    if (mesPedido === mesParametro) {
                        pedidosDoMes.push({
                            pedidoId: pedidoDoc.id,
                            clienteNome: clienteData.nome,
                            ...pedidoData,
                        });
                    }
                }
            });



            lista.push({
                clienteId,
                clienteData,
                clienteNome: nomeDoCliente,
                mesParametro,
                pedidos: pedidosDoMes,
            });
    
        }


       setDataListMensal(lista);
    
    };





















    return {
        buscarClientes,
        buscarProdutosNoEstoque,
        adicionarCliente,
        editarCliente,
        deletarCliente,
        deletarPedido,
        buscarClientePorNome,
        enviarPedidoCliente,
        acessarPedidosCliente,
        pesquisaFiltrada,
        setPesquisaFiltrada,
        clientes,
        setClientes,
        mostraVendaTotal,
        mostraFaturamentoTotal,
        adicionarProdutoEstoque,
        buscarProdutoNoEstoquePorNome,
        mostraItensMaisVendido,
        primeirosDezItensMaisVendidos,
        buscaQuantidadeTotalNoEstoqueUmDeCada,
        buscandoArquivoCorrespondenteAoMes

    };






}





