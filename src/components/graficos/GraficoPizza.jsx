import { Box, Card, Grid, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react'

const GraficoPizza = ({ dadosPizza }) => {



    return (
        <>






            <Card
                sx={{
                    backgroundColor: "white",
                    boxShadow: "none",
                    padding: "12px",
                    paddingLeft:"50px" ,
                    minHeight: "300px",
                }}
            >

                <Typography variant="h7" gutterBottom
                sx={{
                    color: "black",
                    fontFamily: "Roboto regular"
                }}
                >
                   Vendas totais por produto 
                </Typography>



                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <PieChart
                        colors={[
                            "rgba(63, 81, 181, 1)",
                            "rgba(33, 150, 243, 1)",
                            "rgba(0, 188, 212, 1)",
                            "rgba(0, 150, 136, 1)",
                            "rgba(103, 58, 183, 1)",
                            "rgba(156, 39, 176, 1)",
                            "rgba(3, 169, 244, 1)",
                            "rgba(0, 131, 143, 1)",
                            "rgba(1, 87, 155, 1)",
                            "rgba(26, 35, 126, 1)"
                        ]}
                        series={[{
                            data: dadosPizza,
                        }]}
                        width={300}
                        height={300}
                        slotProps={{ legend: { hidden: true } }}
                    />
                    {/* LEGENDA GRAFICO PIZZA */}
                    <Grid item xs={12} md={6}>
                        {dadosPizza.map((item, index) => (
                            <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Box sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: [
                                        "rgba(63, 81, 181, 1)",
                                        "rgba(33, 150, 243, 1)",
                                        "rgba(0, 188, 212, 1)",
                                        "rgba(0, 150, 136, 1)",
                                        "rgba(103, 58, 183, 1)",
                                        "rgba(156, 39, 176, 1)",
                                        "rgba(3, 169, 244, 1)",
                                        "rgba(0, 131, 143, 1)",
                                        "rgba(1, 87, 155, 1)",
                                        "rgba(26, 35, 126, 1)"
                                    ][index],
                                    mr: 1,
                                }} />
                                <Typography variant="body2">{item.label}</Typography>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </Card>




        </>
    )
}

export default GraficoPizza