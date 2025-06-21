import React, { useContext, useEffect } from 'react'
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
import useHookCrud from '../../hooks/HookCrud';
import { ClientesContext } from '../../contextos/ClientesContext';
import { useParams } from 'react-router-dom';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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






const PagePedidoDoCliente = () => {


  const { id, nome } = useParams()
  const { acessarPedidosCliente, deletarPedido } = useHookCrud()
  const { pedidosDoCliente } = useContext(ClientesContext);

  useEffect(() => {
    acessarPedidosCliente(id)
  }, [pedidosDoCliente])


  const deletandoPedido = (idCliente, idPedido) => {
    deletarPedido(idCliente, idPedido)

  }


  return (


    <TableContainer sx={{marginTop: "64px"}}>
      <Table>

        <TableHead>
          <TableRow>

            <StyledTableCell>{nome}</StyledTableCell>
            <StyledTableCell>Quantidade</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
            <StyledTableCell>Data</StyledTableCell>
            <StyledTableCell>Detalhes</StyledTableCell>
            <StyledTableCell>Editar</StyledTableCell>
            <StyledTableCell>Deletar</StyledTableCell>

          </TableRow>
        </TableHead>


        <TableBody>
          {pedidosDoCliente.map((pedido) => (
            <StyledTableRow key={pedido.id}>

              <StyledTableCell>{pedido.produto}</StyledTableCell>
              <StyledTableCell>{pedido.quantidade}</StyledTableCell>
              <StyledTableCell>{pedido.preco}</StyledTableCell>
              <StyledTableCell>{pedido.data}</StyledTableCell>
              <StyledTableCell>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell>
                <IconButton>
                  <ModeIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell>
                <IconButton onClick={() => deletandoPedido(id, pedido.id)} >
                  <DeleteIcon   />
                </IconButton>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>

      </Table>


    </TableContainer>





  )
}

export default PagePedidoDoCliente