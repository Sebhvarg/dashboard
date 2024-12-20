import React from "react";
import Paper from "@mui/material/Paper";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

interface LineChartProps {
  windSpeeds: number[];
  xLabels: string[];
}

export default function LineChartWeather({ windSpeeds, xLabels }: LineChartProps) {
  return (
    <Paper
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "75%",
        margin: "5px",
        borderRadius: "5px",
        height: "345px",
      }}
    >
        <Typography component="h2" variant="h6"
        color="black" sx={{ fontFamily: 'Helvetica', fontSize: '16px', fontWeight: 'Bold', flex: 1 }} gutterBottom>Gráfica del viento</Typography>
      <LineChart
        width={400}
        height={250}
        series={[
          
          { data: windSpeeds,
            color: "#0570B0",            
          },
          
        ]}
        xAxis={[{ scaleType: "point", data: xLabels, label: "Hora", labelStyle: { fontSize: 12, fontFamily: 'Helvetica', fontWeight:'Bold', marginTop:'5px' } }]}
        yAxis={[
          {
            scaleType: "linear",
            label: "Velocidad del viento (m/s)",
            labelStyle: { fontSize: 12, fontFamily: 'Helvetica', fontWeight:'Bold', marginTop:'5px' },
          },
        ]}
      />
    </Paper>
  );
}
