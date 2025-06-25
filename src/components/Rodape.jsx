import React from 'react'
import { Box , Typography} from '@mui/material'

const Rodape = ({children}) => {
  return (
    
    <Box  
    marginTop="40px"

    sx={{
      backgroundColor: "#f2f5fa",
      width: '100%',
      color: 'white',
      display:"flex",
      textAlign: 'center'
    }}
    >
     <Typography variant='h2' fontSize="14px" sx={{margin:"auto",fontFamily:"Poppins regular", color: "gray"}}>
        {children}
      </Typography>
    </Box>
  )
}

export default Rodape