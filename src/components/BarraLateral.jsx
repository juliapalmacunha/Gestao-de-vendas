import React from 'react'
import { Link } from 'react-router-dom'

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import {
  Drawer,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';


import {
  Home as HomeIcon,
  PersonAdd as PersonAddIcon,
  HowToReg as HowToRegIcon,
  ContentPaste as ContentPasteIcon,
  BarChart as BarChartIcon,
  Inventory as InventoryIcon
 
} from '@mui/icons-material';




const BarraLateral = ({ alternarGaveta, estadoGaveta }) => {


  const estiloFonte = {
    fontFamily: 'Gilroy light'
  };
  

  return (

    <nav>

      <Drawer anchor="left" open={estadoGaveta} onClose={alternarGaveta} sx={{fontFamily: "Gilroy ligth"}} >

        <div style={{ width: 250,}}>

          <h2 style={{ 
            textAlign: 'center', 
            fontFamily: 'Be Vietnam Pro, sans-serif', 
            fontWeight: '100', 
            color: '#605f5f', 
            marginBottom: '30px',  
            marginTop: '40px' }}>
            Navegation
          </h2>

          <Divider />

          <ListItemButton onClick={alternarGaveta} component={Link} to='dashboard' >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" primaryTypographyProps={estiloFonte} />
          </ListItemButton>

          <ListItemButton onClick={alternarGaveta} component={Link} to='cadastrocliente' >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Cadastrar Cliente" primaryTypographyProps={estiloFonte} />
          </ListItemButton>

          <ListItemButton onClick={alternarGaveta} component={Link} to='pedidos'>
            <ListItemIcon>
              <ContentPasteIcon />
            </ListItemIcon>
            <ListItemText primary="Saida de Pedido" primaryTypographyProps={estiloFonte} />
          </ListItemButton>

          <ListItemButton onClick={alternarGaveta} component={Link} to='estoque' >
            <ListItemIcon>
              <InventoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Entrada no Estoque" primaryTypographyProps={estiloFonte} />
          </ListItemButton>

          <ListItemButton onClick={alternarGaveta} component={Link} to='clientes'>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Clientes" primaryTypographyProps={estiloFonte} />
          </ListItemButton>

        

      
         

        </div>

      </Drawer>
    </nav>
  )
}

export default BarraLateral