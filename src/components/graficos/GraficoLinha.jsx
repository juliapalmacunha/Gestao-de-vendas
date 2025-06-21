import { Card } from '@mui/material';
import React, { useRef, useState } from 'react'
import { Line } from 'react-chartjs-2';

const GraficoLinha = ({linhaChartRef, memorizedLinhaChartData, optionsLinha}) => {

    return (
        

            <Card
            sx={{
                backgroundColor: "white",
                boxShadow: "none",
                padding: "24px",
                height: "300px",
              }}
            >
                <Line ref={linhaChartRef} data={memorizedLinhaChartData} options={optionsLinha} />
            </Card>
        
    )
}

export default GraficoLinha