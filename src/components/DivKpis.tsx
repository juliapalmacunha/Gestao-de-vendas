import { Box } from "@mui/material";
import { ReactElement } from "react"; 
import React from 'react';

interface CaixaDeKpis {
  children: ReactElement;  
}

const DivKpis: React.FC<CaixaDeKpis> = ({ children }) => { 
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "#02172ddb",
        width: "300px", 
        height: "100px", 
        color: "white",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "1px 3px 6px rgba(0, 0, 0, 0.08)",
        fontSize: "18px"
      }}
    >
      {children} 
    </Box>
  );
}

export default DivKpis;
