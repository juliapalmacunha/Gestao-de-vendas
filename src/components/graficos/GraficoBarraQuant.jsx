import { Box, Card, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { Bar } from 'react-chartjs-2'

const GraficoBarraQuant = ({barraChartRef, memorizedBarraChartData, optionsBarra, filtroBarra, handleChangeBarra}) => {
    return (
        <>
            <Card sx={{ padding: "24px", height: "328px", boxShadow: "none" }}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px", fontFamily: "Gilroy semibold", color: "#555151" }}>
                    <span>Faça a análise do Ranking de Vendas por:</span>
                    <FormControl variant="outlined" sx={{ marginLeft: '18px', width: "20%" }}>
                        <Select
                            value={filtroBarra}
                            onChange={handleChangeBarra}
                            aria-label="Filtrar por"
                            sx={{
                                height: '30px',
                                fontSize: '14px',
                                color: "gray",
                                fontFamily: "Gilroy semibold"
                            }}
                        >
                            <MenuItem value="preco">preço</MenuItem>
                            <MenuItem value="quantidade">quantidade</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Bar ref={barraChartRef} data={memorizedBarraChartData} options={optionsBarra} />
            </Card>
        </>
    )
}

export default GraficoBarraQuant