import React, { useContext, useState } from "react";
import { Box, TextField, Button, MenuItem, InputLabel, Paper, List, ListItem, ListItemText, Grid, Typography } from "@mui/material";
import useHookCrud from "../../hooks/HookCrud";
import { ClientesContext } from "../../contextos/ClientesContext";
import { pink } from "@mui/material/colors";


const PageEstoqueCadastro = () => {

  const { adicionarProdutoEstoque } = useHookCrud();


  const [quantidadeEstoque, setQuantidadeEstoque] = useState("");
  const [produtoEstoque, setProdutoEstoque] = useState("")

  



  const TiposDeProdutos = [
    ...[
      "Flamengo", "Palmeiras", "São Paulo", "Corinthians", "Santos",
      "Grêmio", "Internacional", "Cruzeiro", "Atlético Mineiro", "Vasco",
      "Fluminense", "Botafogo", "Bahia", "Sport", "Fortaleza", "Ceará",
      "Vitória", "America", "ABC"
    ].map((time, index) => ({
      nome: `${time} Chaveiro`,
      id: 100 + index
    })),

    ...Array.from({ length: 26 }, (_, i) => ({
      nome: `${String.fromCharCode(65 + i)} Letra Feminina`,
      id: 200 + i * 2
    })),

    ...Array.from({ length: 26 }, (_, i) => ({
      nome: `${String.fromCharCode(65 + i)} Letra Masculina`,
      id: 201 + i * 2
    }))
  ];



  const enviandoPedidoCliente = (evento) => {
    evento.preventDefault();
    adicionarProdutoEstoque(produtoEstoque, quantidadeEstoque)
    setProdutoEstoque("");
    setQuantidadeEstoque("");

  };




  return (

    <>


<Box
  sx={{
    minHeight: '100vh',
    bgcolor: '#f2f2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 2,
  }}
>
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      width: '100%',
      maxWidth: 900,
      bgcolor: '#ffffff',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
    }}
  >
  
    <Box
      sx={{
        flex: 1,
        bgcolor: '#d2d8ef',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography sx={{ fontFamily: 'Poppins semibold', fontSize: 24, color: '#3441b1' }}>
        Sistema de Estoque
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins regular', fontSize: 16, color: '#2d2d2f' }}>
        Cadastre os produtos disponíveis com facilidade e mantenha o controle de entradas.
      </Typography>
     
    </Box>

  
    <Box
      component="form"
      onSubmit={enviandoPedidoCliente}
      sx={{
        flex: 1,
        p: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Poppins semibold',
          fontSize: 22,
          color: '#2d2d2f',
          mb: 2,
        }}
      >
        Cadastro de <span style={{ color: '#3441b1' }}>Produto</span>
      </Typography>

      <InputLabel
        htmlFor="produtoEstoque-input"
        sx={{
          color: '#2d2d2f',
          fontFamily: 'Poppins regular',
          fontSize: 16,
        
        
        }}
      >
        Produto:
      </InputLabel>
      <TextField
        id="produtoEstoque-input"
        fullWidth
        size="small"
        value={produtoEstoque}
        onChange={(e) => setProdutoEstoque(e.target.value)}
        placeholder="Selecione o produto"
        select
        SelectProps={{
          MenuProps: {
            PaperProps: { style: { maxHeight: 250 } },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "#f9f9f9",
            "& fieldset": {
              borderColor: "#c4c4c4",
              borderRadius: 2,
              borderWidth: "1.5px",
            },
            "&:hover fieldset": {
              borderColor: "#3441b1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3441b1",
            },
          },
        }}
      >
        {TiposDeProdutos.map(({ id, nome }) => (
          <MenuItem key={id} value={nome}>
            {nome}
          </MenuItem>
        ))}
      </TextField>

      <InputLabel
        htmlFor="quantidade-input"
        sx={{
          color: '#2d2d2f',
          fontFamily: 'Poppins regular',
          fontSize: 16,
        }}
      >
        Quantidade:
      </InputLabel>
      <TextField
        id="quantidade-input"
        fullWidth
        size="small"
        value={quantidadeEstoque}
        onChange={(e) => setQuantidadeEstoque(e.target.value)}
        placeholder="Digite a quantidade"
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "#f9f9f9",
            "& fieldset": {
              borderColor: "#c4c4c4",
              borderRadius: 2,
              borderWidth: "1.5px",
            },
            "&:hover fieldset": {
              borderColor: "#3441b1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3441b1",
            },
          },
        }}
      />

      <Button
        variant="contained"
        type="submit"
        disabled={!produtoEstoque || !quantidadeEstoque}
        sx={{
          height: 40,
          mt: 2,
          py: 1.5,
          fontFamily: 'Poppins semibold',
          fontSize: 16,
          borderRadius: 2,
          textTransform: 'none',
          bgcolor: '#3441b1',
          '&:hover': {
            bgcolor: '#2b359c',
          },
          '&.Mui-disabled': {
            bgcolor: "#bfc3dc",
            color: "#fff",
          },
        }}
      >
        Enviar
      </Button>
    </Box>
  </Box>
</Box>




    </>

  );
};

export default PageEstoqueCadastro;
