import { useContext, useState } from "react";
import { Box, TextField, InputLabel, Button } from "@mui/material";
import Rodape from "../../components/Rodape";
import useHookAutenticacao from "../../hooks/HookAutenticacao";
import imageAuth from "../../assets/imagens/imageAuth.png";



const AuthUsuario = () => {


    const [emailUsuario, setEmailUsuario] = useState("");
    const [senhaUsuario, setSenhaUsuario] = useState("");



    const { autenticandoCliente } = useHookAutenticacao();

    const autenticacaoDoUsuario = (evento) => {
        evento.preventDefault()
        autenticandoCliente(emailUsuario, senhaUsuario)
        setEmailUsuario("")
        setSenhaUsuario("")

    }

    return (
        <>

            <Box
                sx={{
                    width: { xs: '400px', md: '880px' },
                  
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    marginBottom: 17,
                    marginTop: 17
                }}
                display="flex"
                bgcolor="white"
               
                height="400px"
                borderRadius="10px"
                justifyContent="center"
                alignItems="center"
                mx="auto"
                component="form"
                onSubmit={autenticacaoDoUsuario}
                overflow="hidden"
            >




                <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                }}
                    bgcolor="#3441b1"
                    width="60%"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="30%"
                        color="white"
                        gap="10px"
                    >
                        <h2
                            style={{
                                margin: "2px",
                                fontFamily: "Poppins semibold",
                                fontSize: "24px",
                                textAlign: "center"
                            }}
                        >Welcome back</h2>
                        <p
                            style={{
                                margin: "2px",
                                fontFamily: "Poppins regular",
                                fontSize: "14px",
                                textAlign: "center"
                            }}
                        >Entre com suas credenciais para um acesso seguro.</p>
                    </Box>

                    <img
                        width="250px"
                        height="250px"
                        src={imageAuth}
                        alt="imagem" />

                </Box>
                

                <Box

                sx={{
                    width: { xs: '100%', md: '40%' },
                    padding: { xs: 4, md: 10}
                    
                }}
                    backgroundColor="white"
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    padding={10}
                    gap={1}

                >


                     <Box
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                    }}
                    >
                        <h2
                            style={{
                                marginBottom: "20px",
                                fontFamily: "Poppins semibold",
                                fontSize: "24px",
                                textAlign: "center",
                                color: "#3441b1"
                            }}
                        >Acesse sua conta</h2>
                    </Box>

                   

                    <InputLabel
                        htmlFor="email-input" sx={{ color: "#444141", mt: "5px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                        Email:
                    </InputLabel>
                    <TextField
                        type="email"
                        id="email-input"
                        fullWidth size="small"
                        value={emailUsuario}
                        onChange={(e) => setEmailUsuario(e.target.value)}
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


                    <InputLabel htmlFor="senha-input" sx={{ color: "#444141", mt: "5px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                        Senha:
                    </InputLabel>
                    <TextField
                        type="password"
                        id="senha-input"
                        fullWidth size="small"
                        value={senhaUsuario}
                        onChange={(e) => setSenhaUsuario(e.target.value)}
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


                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            bgcolor: "#3441b1",
                            color: "#ffffff",
                            fontFamily: "Poppins semibold",
                            fontSize: 16,
                            width: "100%",
                            borderRadius: "5px",
                            '&:hover': { bgcolor: '#2b305c' },
                            '&.Mui-disabled': {
                                bgcolor: "#3441b1",
                                color: "#ffffff",
                                pointerEvents: "auto", // opcional
                            }
                        }}
                        type="submit"
                        disabled={!emailUsuario || !senhaUsuario}
                    >
                        Enviar
                    </Button>

                </Box>





            </Box>

            <Rodape>
                <p>Fale conosco | Termos de uso | Segurança e privacidade</p>
            </Rodape>


        </>
    );



}


export default AuthUsuario;