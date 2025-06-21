import React, { useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Box, InputLabel } from "@mui/material";

const ContainerSuspenso = ({
    abrir,
    fecharContainerSuspenso,
    editandoCliente,

    nome,
    telefone,
    cidade,
    estado,

    setNomeTemp,
    setTelefoneTemp,
    setCidadeTemp,
    setEstadoTemp }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const modalRef = useRef(null);


    useEffect(() => {
        if (abrir && modalRef.current) {
            modalRef.current.focus();
        }
    }, [abrir]);




    return (
        <React.Fragment>

            <Dialog
                fullScreen={fullScreen}
                open={abrir}
                onClose={fecharContainerSuspenso}
                aria-labelledby="responsive-dialog-title"
                aria-hidden={false}
                PaperProps={{
                    sx: {
                      borderRadius: "10px",
                    },
                  }}
            >

                <IconButton
                    aria-label="close"
                    onClick={fecharContainerSuspenso}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    }}
                >
                    <ClearIcon />
                </IconButton>

                <DialogTitle id="responsive-dialog-title">
                    {"Editar dados do cliente:"}
                </DialogTitle>

                <DialogContent
                    style={{
                        width: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}

                >

                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            editandoCliente()
                        }}
                    >


                        <InputLabel htmlFor="nome-input" sx={{mb:"5px", color: "black", mt: "10px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                            Nome:
                        </InputLabel>
                        <TextField
                            id="nome-input"
                            fullWidth size="small"
                            value={nome}
                            onChange={(e) => setNomeTemp(e.target.value)}
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
                                    "& fieldset": {
                                        borderRadius: 2,
                                        borderWidth: "2px",
                                        borderColor: "#b7b4b4",
                                    },
                                }
                            }}
                        />


                        <InputLabel htmlFor="telefone-input" sx={{mb:"5px", color: "black", mt: "10px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                            Telefone:
                        </InputLabel>
                        <TextField
                            id="nome-input"
                            fullWidth size="small"
                            value={telefone}
                            onChange={(e) => setTelefoneTemp(e.target.value)}
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
                                    "& fieldset": {
                                        borderRadius: 2,
                                        borderWidth: "2px",
                                        borderColor: "#b7b4b4",
                                    },
                                }
                            }}
                        />


                        <InputLabel htmlFor="cidade-input" sx={{mb:"5px", color: "black", mt: "10px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                            Cidade:
                        </InputLabel>
                        <TextField
                            id="cidade-input"
                            fullWidth size="small"
                            value={cidade}
                            onChange={(e) => setCidadeTemp(e.target.value)}
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
                                    "& fieldset": {
                                        borderRadius: 2,
                                        borderWidth: "2px",
                                        borderColor: "#b7b4b4",
                                    },
                                }
                            }}
                        />


                        <InputLabel htmlFor="estado-input" sx={{mb:"5px", color: "black", mt: "10px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
                            Estado:
                        </InputLabel>
                        <TextField
                            id="estado-input"
                            fullWidth size="small"
                            value={estado}
                            onChange={(e) => setEstadoTemp(e.target.value)}
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
                                    "& fieldset": {
                                        borderRadius: 2,
                                        borderWidth: "2px",
                                        borderColor: "#b7b4b4",
                                    },
                                }
                            }}
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            onClick={fecharContainerSuspenso}
                            sx={{
                                mt: 3,
                                bgcolor: "#3441b1",
                                color: "#ffffff",
                                fontFamily: "Poppins semibold",
                                fontSize: 16,
                                pointerEvents: "auto",
                                '&:hover': { bgcolor: '#2230ad' },
                                width: "100%",
                                borderRadius: "5px"

                            }}
                        >
                            Atualizar
                        </Button>

                    </Box>


                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default ContainerSuspenso;
