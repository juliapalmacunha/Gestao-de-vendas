import React, { useState } from 'react'
import Rodape from '../components/Rodape';
import BarraLateral from '../components/BarraLateral';
import Cabecalho from '../components/Cabecalho';
import { Box } from '@mui/material';



const LayoutPrincipal = ({ children }) => {

  //estado do drawer que se espalha pelo header e drawer
  const [estadoGaveta, setEstadoGaveta] = useState(false)
  
  const alternarGaveta = () => {
    setEstadoGaveta(!estadoGaveta)
  }

  return (

    <Box id="CONTAINERLAYOUT" sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      <BarraLateral alternarGaveta={alternarGaveta} estadoGaveta={estadoGaveta}/>

      <Cabecalho alternarGaveta={alternarGaveta}/>

      <Box id="ENGLOBAPAGES" sx={{ flex: "1" }} >{children}</Box>
      

      

    </Box>
  )
}

export default LayoutPrincipal