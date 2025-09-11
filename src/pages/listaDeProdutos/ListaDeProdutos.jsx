import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useState, useEffect, useContext } from 'react';
import ContainerSuspenso from '../../components/ContainerSuspenso';
import useHookCrud from '../../hooks/HookCrud';
import { ClientesContext } from '../../contextos/ClientesContext';
import { useNavigate } from 'react-router-dom';
import ContainerSuspensoDeletClient from '../../components/ContainerSuspensoDeletClient';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontFamily: 'Gilroy regular',
        fontSize: 18
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        fontFamily: 'Gilroy semibold'
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




const ListaDeProdutos = () => {

    const { buscarProdutosNoEstoque } = useHookCrud()
    const { produtosDoEstoque } = useContext(ClientesContext);





    const [nomeTemp, setNomeTemp] = useState("")
    const [telefoneTemp, setTelefoneTemp] = useState("")
    const [cidadeTemp, setCidadeTemp] = useState("")
    const [estadoTemp, setEstadoTemp] = useState("")
    const [idTemp, setIdTemp] = useState("")





    const [produtos, setProdutos] = useState([]);





   










    const navigate = useNavigate();


    useEffect(() => {
        buscarProdutosNoEstoque()
    }, [])



    return (
        <TableContainer sx={{ marginTop: "64px" }}>
            <Table>

                <TableHead>
                    <TableRow>

                        <StyledTableCell>Produto</StyledTableCell>
                        <StyledTableCell>Quantidade</StyledTableCell>
                        <StyledTableCell>Editar</StyledTableCell>
                        <StyledTableCell>Excluir</StyledTableCell>
                     
                    </TableRow>
                </TableHead>


                <TableBody>
                    {produtosDoEstoque.map((produto) => (
                        <StyledTableRow key={produto.id}>

                            <StyledTableCell>{produto.produto}</StyledTableCell>
                            <StyledTableCell>{produto.quantidade}</StyledTableCell>

                            <StyledTableCell>
                                <IconButton>
                                    <ModeIcon />
                                </IconButton>
                            </StyledTableCell>
                          
                            <StyledTableCell>
                                <IconButton  >
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>

            </Table>







        </TableContainer>
    );
};

export default ListaDeProdutos;
