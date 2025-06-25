import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  InputLabel
} from "@mui/material";
import useHookCrud from "../../hooks/HookCrud";
import { ClientesContext } from "../../contextos/ClientesContext";

const Pedidos = () => {

  const {
    buscarClientePorNome,
    enviarPedidoCliente,
    buscarProdutoNoEstoquePorNome,
  } = useHookCrud();

  const {
    pesquisaFiltrada,
    setPesquisaFiltrada,
    pesquisaFiltradaProduto,
    setPesquisaFiltradaProduto,
  } = useContext(ClientesContext);

  const [pesquisaCliente, setPesquisaCliente] = useState("");
  const [pesquisaProduto, setPesquisaProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [idCliente, setIdCliente] = useState("");

  const buscandoClientePorNome = (e) => {
    const valor = e.target.value;
    setPesquisaCliente(valor);
    buscarClientePorNome(valor);
  };

  const buscandoProdutoPorNome = (e) => {
    const valor = e.target.value;
    setPesquisaProduto(valor);
    buscarProdutoNoEstoquePorNome(valor);
  };

  const preenchendoInputNome = (nomeCliente, idCliente) => {
    setIdCliente(idCliente);
    setPesquisaCliente(nomeCliente);
    setPesquisaFiltrada([]);
  };

  const preenchendoInputProduto = (nomeProduto) => {
    setPesquisaProduto(nomeProduto);
    setPesquisaFiltradaProduto([]);
  };

  const enviandoPedidoCliente = (evento) => {

    evento.preventDefault();
    enviarPedidoCliente(pesquisaProduto, quantidade, idCliente);
    setPesquisaCliente("");
    setPesquisaProduto("");
    setQuantidade("");
    setIdCliente("");
  };

  return (
    <>
      <Box
        sx={{
          width: { xs: "80%", md: "32%" },
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 4,
          alignItems: "center",
          mx: "auto",
          mt: 5,
          borderRadius: "10px",
          bgcolor: "#ffffff",
          marginTop: 18,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          
        }}
        component="form"
        onSubmit={enviandoPedidoCliente}
      >
        <Typography
          sx={{
            display:{ xs: "none", md: "block" },
            color: "#2d2d2f",
            fontFamily: "Poppins semibold",
            textAlign: "center",
            fontSize: 24,
            marginBottom: 3,
          }}
        >
          Cadastre um Novo <span style={{ color: "#3441b1" }}>Pedido</span> no
          Sistema:
        </Typography>

        <Typography
          sx={{
            display:{ xs: "block", md: "none" },
            color: "#2d2d2f",
            fontFamily: "Poppins semibold",
            textAlign: "center",
            fontSize: 24,
            marginBottom: 3,
          }}
        >
          Cadastre um Novo <span style={{ color: "#3441b1" }}>Pedido</span>:
        </Typography>

        {/* Cliente */}
        <InputLabel htmlFor="cliente-input" sx={labelStyle}>
          Cliente:
        </InputLabel>
        <Box sx={{ width: "100%", position: "relative", mb: "25px" }}>
          <TextField
            id="cliente-input"
            fullWidth
            size="small"
            value={pesquisaCliente}
            onFocus={() => {
              if (pesquisaCliente.trim() !== "") {
                buscarClientePorNome(pesquisaCliente);
              }
            }}
            autoComplete="off"
            placeholder="Cliente"
            onChange={buscandoClientePorNome}
            sx={textFieldStyle}
          />
          {pesquisaFiltrada.length > 0 && (
            <Paper sx={dropdownStyle}>
              <List>
                {pesquisaFiltrada.map((item) => (
                  <ListItem

                    key={item.id}
                    onClick={() => preenchendoInputNome(item.nome, item.id)}
                    sx={{
                      cursor: "pointer",
                      '&:hover': {
                        bgcolor: '#e0e0e0a6',
                      }

                    }}
                  >
                    <ListItemText primary={item.nome} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>

        {/* Produto */}
        <InputLabel htmlFor="produto-input" sx={labelStyle}>
          Produto:
        </InputLabel>
        <Box sx={{ width: "100%", position: "relative", mb: "25px" }}>
          <TextField
            id="produto-input"
            fullWidth
            size="small"
            value={pesquisaProduto}
            onChange={buscandoProdutoPorNome}
            onFocus={() => {
              if (pesquisaProduto.trim() !== "") {
                buscarProdutoNoEstoquePorNome(pesquisaProduto);
              }
            }}
            placeholder="Produto"
            autoComplete="off"
            sx={textFieldStyle}
            
          />
          {pesquisaFiltradaProduto.length > 0 && (
            <Paper sx={dropdownStyle}>
              <List>
                {pesquisaFiltradaProduto.map((item) => (
                  <ListItem
                    key={item.id}
                    onClick={() => preenchendoInputProduto(item.produto)}
                    sx={{ cursor: "pointer",
                      '&:hover': {
                        bgcolor: '#e0e0e0a6',
                      }
                     }}
                  >
                    <ListItemText primary={item.produto} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>

         

        {/* Quantidade */}
        <InputLabel htmlFor="quantidade-input" sx={labelStyle}>
          Quantidade:
        </InputLabel>
        <TextField
          id="quantidade-input"
          type="number"
          fullWidth
          size="small"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade"
          sx={{
            mb: "25px",
            "& .MuiOutlinedInput-root": {
              bgcolor: "#f9f9f9",
              "& fieldset": {
                borderRadius: 2,
                borderWidth: "1.5px",
                borderColor: "#c4c4c4",
              },
            },
          }}
        />

        {/* Botão */}
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 3,
            bgcolor: "#3441b1",
            color: "#ffffff",
            fontFamily: "Poppins semibold",
            fontSize: 16,
            width: "80%",
            borderRadius: "8px",
            "&:hover": {
              bgcolor: "#2b305c",
            },
          }}
          disabled={!pesquisaCliente || !pesquisaProduto || !quantidade}
        >
          Enviar
        </Button>
      </Box>
    </>
  );
};

const labelStyle = {
  color: "#2d2d2f",
  mb: "8px",
  fontFamily: "Poppins regular",
  fontSize: 16,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
};

const textFieldStyle = {
  "& .MuiInputLabel-root": {
    color: "black",
    fontFamily: "Poppins regular",
  },
  "& .MuiOutlinedInput-root": {
     bgcolor: "#f9f9f9",
    "& fieldset": {
      borderRadius: 2,
      borderWidth: "1.5px",
      borderColor: "#c4c4c4",
    },
  },
};

const dropdownStyle = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 10,
  maxHeight: 150,
  overflowY: "auto",
  borderRadius: 2,
  mt: "4px",
};

export default Pedidos;
