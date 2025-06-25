
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip
} from '@mui/material';

import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import BotaoDeslogar from './BotaoDeslogar';
import { Link } from 'react-router-dom';




const Cabecalho = ({ alternarGaveta }) => {

  return (

    <Box  >
      <AppBar position="fixed" >

        <Toolbar sx={{ backgroundColor: "#021b43", display: "flex", justifyContent: "space-between" }}>


          <Box sx={{ display: 'flex', alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={alternarGaveta}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ fontFamily: "Gilroy light", color: "white" }}>
              Jr Chaveiros
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <img src="/imagens/flor-da-vida.png" alt="logo flor da vida" 
              style={{ width: '30px', height: '30px', marginLeft: '10px' }}
              />
            </Box>


          </Box>

          <Box sx={{ display: 'flex', alignItems: "center" }}>

            <Tooltip
              title="Voltar ao Dashboard">
              <IconButton component={Link} to='dashboard'>
                <HomeIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
            <BotaoDeslogar />
          </Box>



        </Toolbar>
      </AppBar>
    </Box>


  );
};

export default Cabecalho;
