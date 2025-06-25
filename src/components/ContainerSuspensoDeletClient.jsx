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
import useHookCrud from '../hooks/HookCrud';

const ContainerSuspensoDeletClient = ({ abrirDeletClient, fecharContainerSuspensoDeletClient, idClienteDeletar }) => {
    const { deletarCliente } = useHookCrud();

    const deletandoCliente = () => {
        deletarCliente(idClienteDeletar);
        fecharContainerSuspensoDeletClient();
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const modalRef = useRef(null);

    useEffect(() => {
        if (abrirDeletClient && modalRef.current) {
            modalRef.current.focus();
        }
    }, [abrirDeletClient]);

    const dialogTitleId = "delete-dialog-title";
    const dialogDescriptionId = "delete-dialog-description";

    return (
        <React.Fragment>
            <Dialog
               
                open={abrirDeletClient}
                onClose={fecharContainerSuspensoDeletClient}
                aria-labelledby={dialogTitleId}
                aria-describedby={dialogDescriptionId}
                aria-hidden={false}
                PaperProps={{
                    sx: {
                        borderRadius: "10px",
                        maxWidth: { xs: '50%%', sm: '300px', md: '450px' },
                        margin: { xs: '30px', sm: '32px' }
                    },
                }}
                ref={modalRef}
            >
                <IconButton
                    aria-label="close"
                    onClick={fecharContainerSuspensoDeletClient}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    }}
                >
                    <ClearIcon />
                </IconButton>

                <DialogTitle
                    id={dialogTitleId}
                    sx={{ fontFamily: "Poppins semibold" }}
                >
                    Deletar cliente
                </DialogTitle>

                <DialogContent>
                    <DialogContentText
                        id={dialogDescriptionId}
                        sx={{
                            fontFamily: "Poppins regular",
                            fontSize: "16px",
                            mb: "20px",
                        }}
                    >
                        Isso irá deletar o cliente juntamente com todos os pedidos relacionados a ele.
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ padding: '20px 24px', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={fecharContainerSuspensoDeletClient}
                        sx={{
                            color: theme.palette.grey[700],
                            borderColor: theme.palette.grey[700],
                            '&:hover': {
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[900],
                                color: theme.palette.grey[900],
                            },
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={deletandoCliente}
                        sx={{
                            color: theme.palette.error.main,
                            borderColor: theme.palette.error.main,
                            '&:hover': {
                                backgroundColor: theme.palette.error.light + '14',
                                borderColor: theme.palette.error.dark,
                                color: theme.palette.error.dark,
                            },
                        }}
                    >
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ContainerSuspensoDeletClient;