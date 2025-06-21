import { useContext, useState } from "react";
import { Box, TextField, InputLabel, Button } from "@mui/material";
import Rodape from "../../components/Rodape";
import useHookCrud from "../../hooks/HookCrud";
import { AuthContext } from "../../contextos/AuthContext";
import useHookAutenticacao from "../../hooks/HookAutenticacao";



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
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    paddingBottom: "40px",
                    marginBottom: 20,
                    marginTop: 25
                }}
                display="flex"
                flexDirection="column"
                bgcolor="white"
                width="600px"
                height="250px"
                borderRadius="10px"
                justifyContent="center"
                alignItems="center"
                mx="auto"
                p={2}
            >


                <Box
                    component="form"
                    width="100%"
                    p={2}
                    bgcolor="white"
                    display="flex"
                    gap={1}
                    onSubmit={autenticacaoDoUsuario}
                >

                    <Box
                        display="flex"
                        flexDirection="column"
                        width="60%"
                        gap={1}
                        paddingInline={7}
                    >
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
                            disabled={!emailUsuario || !senhaUsuario}
                        >
                            Enviar
                        </Button>

                    </Box>


                </Box>


            </Box>

            <Rodape>
                <p>Fale conosco | Termos de uso | Segurança e privacidade</p>
            </Rodape>


        </>
    );



}


export default AuthUsuario;