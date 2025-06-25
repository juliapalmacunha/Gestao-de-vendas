import React, { useContext, useEffect, useState } from 'react'
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
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import ContainerSuspensoDeletPedido from '../../components/ContainerSuspensoDeletPedido';






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


  const [value, setValue] = React.useState(null);
  const [openDeletPedido, setOpenDeletPedido] = React.useState(false);
  const [ idPedido, setIdPedido ] = useState("");


  
  

  const abrirContainerSuspensoDeletPedido = (idPedido) => {
    setOpenDeletPedido(true);
    setIdPedido(idPedido);
  };

  const FecharContainerSuspensoDeletPedido = () => {
    setOpenDeletPedido(false);
  };


  return (


    <Box>


      <Box sx={{
        marginTop: '64px',
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
       
      }}>

        <Box
          sx={{
           boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.401)', // sombra suave
           border: '0.5px solid #021b43',
            width: '100%',
            margin: '20px',
            bgcolor: '#c3c4c7',
            borderRadius: '10px',
            display: 'flex',
            padding: 2,
            gap: 2,
          }}>

         

          <LocalizationProvider
            dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data do Pedido"  
              slotProps={{
                textField: {
                  size: 'small',
                  border: 'none',
                  variant: 'outlined',
                  sx: {
                    width: '165px',
                    height: '40px',
                    backgroundColor: '#2d2d2f29',
                    borderRadius: '4px',
                  
                  }}}}
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => <TextField
                {...params} />}
            />
          </LocalizationProvider>

        </Box>

      </Box>








      <TableContainer sx={{ borderTop: '1px solid #021b43' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>{nome}</StyledTableCell>
              <StyledTableCell>Quantidade</StyledTableCell>
              <StyledTableCell>Valor</StyledTableCell>
              <StyledTableCell>Data </StyledTableCell>
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
                  <IconButton onClick={() => abrirContainerSuspensoDeletPedido(pedido.id)} >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



      <ContainerSuspensoDeletPedido
        abrirDeletPedido={openDeletPedido}
        fecharContainerSuspensoDeletPedido={FecharContainerSuspensoDeletPedido}
        idPedidoDeletar={idPedido}
        idClientePedidoDeletar={id}
        
      >

      </ContainerSuspensoDeletPedido>

    </Box>





  )
}

export default PagePedidoDoCliente