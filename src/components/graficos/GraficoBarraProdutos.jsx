import { Card } from '@mui/material'
import React from 'react'
import { Bar } from 'react-chartjs-2'

const GraficoBarraProdutos = ({barraChartRefEstoque, memorizedBarraChartDataEstoque, optionsBarraEstoque}) => {
    return (
        <>
            <Card sx={{ backgroundColor: "white", boxShadow: "none", padding: "24px", minHeight: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Bar ref={barraChartRefEstoque} data={memorizedBarraChartDataEstoque} options={optionsBarraEstoque} />
            </Card>
        </>
    )
}

export default GraficoBarraProdutos