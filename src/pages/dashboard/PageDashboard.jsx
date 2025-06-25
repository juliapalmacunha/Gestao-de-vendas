import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import 'leaflet/dist/leaflet.css';
import {
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { ClientesContext } from "../../contextos/ClientesContext";
import useHookCrud from "../../hooks/HookCrud";
import DivKpis from "../../components/DivKpis";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RedeemIcon from '@mui/icons-material/Redeem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import useHookGrafico from "../../hooks/HookGraficos";
import GraficoLinha from "../../components/graficos/GraficoLinha";
import GraficoPizza from "../../components/graficos/GraficoPizza";
import GraficoBarraQuant from "../../components/graficos/GraficoBarraQuant";
import GraficoBarraProdutos from "../../components/graficos/GraficoBarraProdutos";
import useHookUtils from "../../hooks/HookUtils";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { se } from "date-fns/locale";


ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Title, Tooltip, Legend);

const Dashboard = () => {




  const { buscarClientes, mostraVendaTotal, mostraFaturamentoTotal, mostraItensMaisVendido, primeirosDezItensMaisVendidos, buscaQuantidadeTotalNoEstoqueUmDeCada, buscandoArquivoCorrespondenteAoMes } = useHookCrud();
  const { atualizarGraficoBarraVertical, atualizarGraficoLine, atualizarGraficoBarraVerticalEstoqueUmDeCada } = useHookGrafico()
  const { calculandoValorTotalEstoque, calculandoTicketMedio } = useHookUtils()
  const { clientes, vendasTotais, ticketMedio, faturamento, estoqueTotal, pedidosAcumulados, pizza, quantEstoqueTotal, dataListMensal } = useContext(ClientesContext);


  const [value, setValue] = React.useState(null);

  const capturaMesFiltragemUpload = (newValue) => {
    setValue(newValue);
    const data = new Date(newValue);
    const numeroDoMes = data.getMonth() + 1;
    buscandoArquivoCorrespondenteAoMes(numeroDoMes);
  }


  const baixandoArquivoJson = () => {
    if (dataListMensal.length === 0) {
      alert("Nenhum dado para baixar. Faça uma filtragem primeiro.");
      return;
    }

    const dataStr = JSON.stringify(dataListMensal, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio_do_mes_${new Date().toISOString()}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };


  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("quantidade");

  const trocarFiltroGraficoBarraQuant = (event) => {
    setFiltro(event.target.value);
  };

  const barChartRef = useRef(null);
  const barChartRefEstoqueUmDeCada = useRef(null);
  const lineChartRef = useRef(null);


  const [meses, setMeses] = useState([
    { nome: "Janeiro", valor: 0 },
    { nome: "Fevereiro", valor: 0 },
    { nome: "Março", valor: 0 },
    { nome: "Abril", valor: 0 },
    { nome: "Maio", valor: 0 },
    { nome: "Junho", valor: 0 },
    { nome: "Julho", valor: 0 },
    { nome: "Agosto", valor: 0 },
    { nome: "Setembro", valor: 0 },
    { nome: "Outubro", valor: 0 },
    { nome: "Novembro", valor: 0 },
    { nome: "Dezembro", valor: 0 }
  ]);





  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const indicadores = [
    { nome: "Vendas Totais", valor: vendasTotais, icone: ShoppingCartIcon },
    {
      nome: "Ticket medio", valor: !isNaN(ticketMedio)
        ? ticketMedio.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        : "R$ 0,00", icone: RedeemIcon
    },
    { nome: "Quantidade no Estoque", valor: quantEstoqueTotal, icone: InventoryIcon },
    { nome: "Faturamento", valor: faturamento, icone: MonetizationOnIcon }
  ]



  // CONFIGURAÇOES GRAFICO BARRA
  const [chartDataBarra, setChartDataBarra] = useState({
    labels: [],
    datasets: [{ label: "", data: [] }],
  });

  const optionsBarras = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "black" } },
    },
    scales: {
      x: { ticks: { color: "gray" } },
      y: { ticks: { color: "gray" } },
    },
  };


  //GRADIENTE GRAFICO BARRA ESTOQUE
  const criarGradienteBarraEstoqueUmDeCada = (context) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) return null;

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "#4b0082");
    gradient.addColorStop(1, "rgba(167, 6, 207, 0.77)");
    return gradient;
  };



  // CONFIGURAÇOES GRAFICO BARRA ESTOQUE
  const [chartDataBarraEstoqueUmDeCada, setChartDataBarraEstoqueUmDeCada] = useState({
    labels: [],
    datasets: [{ label: "", data: [] }],
  });

  const optionsBarrasEstoque = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "black" } },
    },
    scales: {
      x: { ticks: { color: "gray" } },
      y: { ticks: { color: "gray" } },
    },
  };


  //GRADIENTE DEGRADE GRAFICO LINHA
  const criarGradienteLine = (context) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) return null;

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "#16046a");
    gradient.addColorStop(1, "rgba(81, 108, 241, 0.511)");
    return gradient;
  };


  // CONFIGURAÇÕES GRAFICO LINHA
  const [lineChartData, setLineChartData] = useState({
    labels: [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ],
    datasets: [
      {
        label: "Vendas por Mês",
        data: [],
        borderColor: "#00BFFF",
        backgroundColor: criarGradienteLine,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#00BFFF",
        pointBorderColor: "#ffffff",
      },
    ],
  });


  const optionsLine = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "black" } },
    },
    scales: {
      x: { ticks: { color: "gray" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
      y: { ticks: { color: "gray" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
    },
  };


  const memorizedLineChartData = useMemo(() => lineChartData, [lineChartData]);
  const memorizedBarChartData = useMemo(() => chartDataBarra, [chartDataBarra]);
  const memorizedBarChartDataEstoqueUmDeCada = useMemo(() => chartDataBarraEstoqueUmDeCada, [chartDataBarraEstoqueUmDeCada]);



  useEffect(() => {
    calculandoTicketMedio()
  }, [vendasTotais, faturamento]);

  useEffect(() => {
    calculandoValorTotalEstoque();
  }, [estoqueTotal]);


  useEffect(() => {
    atualizarGraficoBarraVertical({ filtro, setChartDataBarra });
  }, [clientes, filtro]);

  useEffect(() => {
    atualizarGraficoBarraVerticalEstoqueUmDeCada(setChartDataBarraEstoqueUmDeCada, criarGradienteBarraEstoqueUmDeCada);
    primeirosDezItensMaisVendidos()
  }, [pedidosAcumulados]);


  useEffect(() => {
    atualizarGraficoLine(meses, setMeses, setLineChartData, criarGradienteLine);
    mostraVendaTotal();
    mostraFaturamentoTotal()
    mostraItensMaisVendido()
  }, [clientes]);


  useEffect(() => {
    const loadData = async () => {
      await buscarClientes();
      await buscaQuantidadeTotalNoEstoqueUmDeCada();
      setLoading(false);
    };
    loadData();
  }, []);


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }




  return (

    <Box style={{ backgroundColor: "#f2f5fa", padding: "40px", paddingTop: "90px" }}>

      <Box sx={{ width: "100%", fontFamily: "Roboto regular", height: "100px", marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {indicadores.map((indicador) => {
          const IconComponent = indicador.icone
          return (
            <DivKpis key={indicador.nome}>
              <Box sx={{ margin: "5px 5px 5px 20px" }}>
                <p>{indicador.nome} </p>
                <p>{indicador.valor}</p>
              </Box>
              <Box sx={{ margin: "18px 18px 6px 6px" }}>
                <IconComponent />
              </Box>
            </DivKpis>
          );
        })}
      </Box>


      <Grid container spacing={4} justifyContent="center">

        <Grid item xs={12} md={7}>
          <GraficoLinha linhaChartRef={lineChartRef} memorizedLinhaChartData={memorizedLineChartData} optionsLinha={optionsLine} />
        </Grid>

        <Grid item xs={12} md={5}>
          <GraficoPizza dadosPizza={pizza} />
        </Grid>

        <Grid item xs={12} md={6}>
          <GraficoBarraQuant barraChartRef={barChartRef} memorizedBarraChartData={memorizedBarChartData} optionsBarra={optionsBarras} filtroBarra={filtro} handleChangeBarra={trocarFiltroGraficoBarraQuant} />
        </Grid>

        <Grid item xs={12} md={6}>
          <GraficoBarraProdutos barraChartRefEstoque={barChartRefEstoqueUmDeCada} memorizedBarraChartDataEstoque={memorizedBarChartDataEstoqueUmDeCada} optionsBarraEstoque={optionsBarrasEstoque} />
        </Grid>

      </Grid>



      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '40px',
          marginBottom: '20px',
          gap: '18px',
        }}
      >


        <LocalizationProvider
          dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data do Pedido"
            slotProps={{
              textField: {
                size: 'small',
                border: 'none',
                variant: 'outlined',
                sx: {
                  width: '165px',
                  height: '40px',
                  backgroundColor: '#2d2d2f29',
                  borderRadius: '4px',

                }
              }
            }}
            onClick={capturaMesFiltragemUpload}
            value={value}
            onChange={(newValue) => capturaMesFiltragemUpload(newValue)}

          />
        </LocalizationProvider>







        <Button
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={baixandoArquivoJson}
        >
          Upload files
        </Button>
      </Box>




    </Box>

  );
};

export default Dashboard;
