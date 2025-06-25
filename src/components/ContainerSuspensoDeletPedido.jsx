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

const ContainerSuspensoDeletPedido = ({ abrirDeletPedido, fecharContainerSuspensoDeletPedido, idPedidoDeletar, idClientePedidoDeletar }) => {

    const { deletarPedido } = useHookCrud()

    const deletandoPedidoCliente = () => {
        deletarPedido(idClientePedidoDeletar, idPedidoDeletar);
        fecharContainerSuspensoDeletPedido();
    };

    const theme = useTheme();
    const modalRef = useRef(null);

    useEffect(() => {
        if (abrirDeletPedido && modalRef.current) {
            modalRef.current.focus();
        }
    }, [abrirDeletPedido]);

    const dialogTitleId = "delete-dialog-title";
    const dialogDescriptionId = "delete-dialog-description";


     

    return (

        <React.Fragment>
            <Dialog
               
                open={abrirDeletPedido}
                onClose={fecharContainerSuspensoDeletPedido}
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
                    onClick={fecharContainerSuspensoDeletPedido}
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
                    Deletar pedido
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
                        Isso irá deletar o pedido de forma definitiva.
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ padding: '20px 24px', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={fecharContainerSuspensoDeletPedido}
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
                        onClick={deletandoPedidoCliente}
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

export default ContainerSuspensoDeletPedido;