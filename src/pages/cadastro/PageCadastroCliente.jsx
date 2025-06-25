import React, { useState } from "react";
import { Box, TextField, Typography, InputLabel, Button, MenuItem } from "@mui/material";
import useHookCrud from "../../hooks/HookCrud";
import Rodape from "../../components/Rodape";

const CadastroCliente = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const { adicionarCliente } = useHookCrud();

  const adicionandoCliente = (evento) => {
    evento.preventDefault();

    if (!nome || !telefone || !cidade || !estado) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    adicionarCliente({ nome, telefone, cidade, estado });

    setNome("");
    setTelefone("");
    setCidade("");
    setEstado("");
  };

  const estadosNordeste = [
    { nome: "Alagoas", sigla: "AL" },
    { nome: "Bahia", sigla: "BA" },
    { nome: "Ceará", sigla: "CE" },
    { nome: "Maranhão", sigla: "MA" },
    { nome: "Paraíba", sigla: "PB" },
    { nome: "Pernambuco", sigla: "PE" },
    { nome: "Piauí", sigla: "PI" },
    { nome: "Rio Grande do Norte", sigla: "RN" },
    { nome: "Sergipe", sigla: "SE" },
  ];

  const cidadesNordeste = [
    { nome: "Natal" },
    { nome: "Fortaleza" },
    { nome: "Pipa" },
    { nome: "João Pessoa" },
    { nome: "Recife" },
    { nome: "Porto de Galinhas" },
    { nome: "São Miguel do Gostoso" },
  ];

  return (

    <Box

    >





      <Box
        sx={{

          width: { xs: '400px', md: '900px' },
          height: { xs: '500px', md: '450px' },
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          paddingBottom: "40px",
          marginTop: 13
        }}
        display="flex"
        flexDirection="column"
        bgcolor="white"
        borderRadius="10px"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        p={2}
      >


        <Box
          overflow={"hidden"} 
          component="form"
          width="100%"
          p={2}
          bgcolor="white"
          display="flex"
          gap={1}
          onSubmit={adicionandoCliente}
        >



          <Box
            sx={{ width: { xs: '100%', md: '60%' } }}
            display="flex"
            flexDirection="column"
            gap={1}
            paddingInline={7}
           
          >

            <Box>
              <h2 style={{ fontFamily: "Poppins semibold", color: "#3441b1", fontSize: "24px", textAlign: "center" }}>
                Cadastre seu cliente</h2>
            </Box>

            <InputLabel htmlFor="nome-input" sx={{ color: "#444141", mt: "5px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
              Nome:
            </InputLabel>
            <TextField
              id="nome-input"
              fullWidth size="small"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="off"
              slotProps={{
                inputLabel: { shrink: false }
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "black",
                  fontFamily: "Poppins regular"
                },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#eaedf4",
                  "& fieldset": {
                    borderRadius: 2,
                    borderWidth: "0",
                    borderColor: "#b7b4b4",
                  },
                }
              }}
            />


            <InputLabel htmlFor="telefone-input" sx={{ color: "#444141", mt: "5px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
              Telefone:
            </InputLabel>
            <TextField
              id="telefone-input"
              fullWidth size="small"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              autoComplete="off"
              slotProps={{
                inputLabel: { shrink: false }
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "black",
                  fontFamily: "Poppins regular"
                },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#eaedf4",
                  "& fieldset": {
                    borderRadius: 2,
                    borderWidth: "0",
                    borderColor: "#b7b4b4",
                  },
                }
              }}
            />


            <InputLabel htmlFor="cidade-input" sx={{ color: "#444141", mt: "5px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
              Cidade:
            </InputLabel>
            <TextField
              id="cidade-input"
              fullWidth size="small"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)} autoComplete="off"
              select
              slotProps={{
                inputLabel: { shrink: false }
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "black",
                  fontFamily: "Poppins regular"
                },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#eaedf4",
                  "& fieldset": {
                    borderRadius: 2,
                    borderWidth: "0",
                    borderColor: "#b7b4b4",
                  },
                }
              }}
            >

              {cidadesNordeste.map((cidade) => (
                <MenuItem key={cidade.nome} value={cidade.nome}>
                  {cidade.nome}
                </MenuItem>
              ))}
            </TextField>


            <InputLabel htmlFor="estado-input" sx={{ color: "#444141", mt: "5px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
              Estado:
            </InputLabel>
            <TextField
              id="estado-input"
              fullWidth size="small"
              value={estado}
              select
              onChange={(e) => setEstado(e.target.value)}
              autoComplete="off"
              slotProps={{
                inputLabel: { shrink: false }
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: "black",
                  fontFamily: "Poppins regular"
                },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  bgcolor: "#eaedf4",
                  "& fieldset": {
                    borderRadius: 2,
                    borderWidth: "0",
                    borderColor: "#b7b4b4",
                  },
                }
              }}
            >

              {estadosNordeste.map((estado) => (
                <MenuItem key={estado.sigla} value={estado.sigla}>
                  {estado.nome}
                </MenuItem>
              ))}

            </TextField>






            <Button
              variant="contained"
              sx={{
                mt: 3,
                '&.Mui-disabled': {
                  bgcolor: "#3441b1",
                  color: "#ffffff",
                  fontFamily: "Poppins semibold",
                  fontSize: 16,
                  pointerEvents: "auto",
                  '&:hover': { bgcolor: '#2b305c' },
                  width: "100%",
                  borderRadius: "5px"
                }
              }}
              type="submit"
              disabled={!nome || !telefone || !cidade || !estado}
            >
              Enviar
            </Button>

          </Box>


          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            width: '4.5px',
            height: '100%',
            backgroundColor: "#f7f7f7",
            borderRadius: '10px',
            margin: '100',

          }} />


          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              gap: "60px"

            }}
          >

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                textAlign: "left",
                height: "80px",
                width: "60%",
                bgcolor: '#d2d8ef',
                p: 4,
                borderRadius: "10px",
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 1.5,
              }}
            >
              <Typography sx={{ fontFamily: 'Poppins semibold', fontSize: 22, color: '#3441b1' }}>
                Cadastro de Cliente
              </Typography>
              <Typography sx={{ fontFamily: 'Poppins regular', fontSize: 16, color: '#2d2d2f' }}>
                Use nomes completos e padronizados para facilitar buscas futuras.
              </Typography>
            </Box>
            <Box
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <figure style={{ margin: "auto" }}>
                <img
                  style={{ width: "80px", height: "80px" }}
                  src="public/imagens/imagens/assistencia-social.png"
                  alt="Ícone animado"
                />
              </figure>
            </Box>
          </Box>

        </Box>


      </Box>

      <Rodape>
        <p>Fale conosco | Termos de uso | Segurança e privacidade</p>
      </Rodape>


    </Box>
  );
};

export default CadastroCliente;
