
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from '@mui/material';

import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import BotaoDeslogar from './BotaoDeslogar';



const Cabecalho = ({ alternarGaveta}) => {

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

            <Typography variant="h6"  sx={{fontFamily:"Gilroy light", color: "white"}}>
              Jr Chaveiros
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: "center" }}>
            <IconButton>
              <HomeIcon sx={{ color: 'white' }}/>
            </IconButton>

              <BotaoDeslogar/>
          </Box>



        </Toolbar>
      </AppBar>
    </Box>


  );
};

export default Cabecalho;
