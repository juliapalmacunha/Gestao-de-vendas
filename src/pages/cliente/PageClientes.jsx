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




const Clientes = () => {

  const { buscarClientes } = useHookCrud()
  const { clientes } = useContext(ClientesContext);

  
  useEffect(() => {
    buscarClientes()
  }, [])


  const [nomeTemp, setNomeTemp] = useState("")
  const [telefoneTemp, setTelefoneTemp] = useState("")
  const [cidadeTemp, setCidadeTemp] = useState("")
  const [estadoTemp, setEstadoTemp] = useState("")
  const [idTemp, setIdTemp] = useState("")


  const { editarCliente, deletarCliente } = useHookCrud()


  const editandoCliente = () => {
    editarCliente(
      nomeTemp,
      telefoneTemp,
      cidadeTemp,
      estadoTemp,
      idTemp
    )
  }


  const deletandoCliente = (id) => {
    deletarCliente(id)
  }



  const [open, setOpen] = React.useState(false);


  const abrirContainerSuspenso = (cliente) => {
    setOpen(true);
    setNomeTemp(cliente.nome);
    setTelefoneTemp(cliente.telefone);
    setCidadeTemp(cliente.cidade);
    setEstadoTemp(cliente.estado);
    setIdTemp(cliente.id)
  };


  const FecharContainerSuspenso = () => {
    setOpen(false);
  };

  const navigate = useNavigate();



  return (
    <TableContainer sx={{marginTop: "64px"}}>
      <Table>

        <TableHead>
          <TableRow>

            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Telefone</StyledTableCell>
            <StyledTableCell>Cidade</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Editar</StyledTableCell>
            <StyledTableCell>Pedidos</StyledTableCell>
            <StyledTableCell>Lixeira</StyledTableCell> 


          </TableRow>
        </TableHead>


        <TableBody>
          {clientes.map((cliente) => (
            <StyledTableRow key={cliente.id}>

              <StyledTableCell>{cliente.nome}</StyledTableCell>
              <StyledTableCell>{cliente.telefone}</StyledTableCell>
              <StyledTableCell>{cliente.cidade}</StyledTableCell>
              <StyledTableCell>{cliente.estado}</StyledTableCell>
              <StyledTableCell>
                <IconButton onClick={() => abrirContainerSuspenso(cliente)}>
                  <ModeIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell>
                <IconButton  onClick={() => navigate(`/pedidoDoCliente/${cliente.id}/${cliente.nome}`)} >
                  <VisibilityIcon/>
                </IconButton>
              </StyledTableCell>
              <StyledTableCell>
                <IconButton  onClick={() => deletandoCliente(cliente.id)} >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>

      </Table>

      <ContainerSuspenso 
      abrir={open} 
      fecharContainerSuspenso={FecharContainerSuspenso} 
      editandoCliente={editandoCliente} 

      nome={nomeTemp} 
      telefone={telefoneTemp} 
      cidade={cidadeTemp} 
      estado={estadoTemp} 
      idCliente={idTemp} 
      
      setNomeTemp={setNomeTemp} 
      setTelefoneTemp={setTelefoneTemp} 
      setCidadeTemp={setCidadeTemp} 
      setEstadoTemp={setEstadoTemp}>

      </ContainerSuspenso>

    </TableContainer>
  );
};

export default Clientes;
