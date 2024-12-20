import { useState } from "react";
import Paper from "@mui/material/Paper";
import { LineChart } from "@mui/x-charts/LineChart";
import { Grid, Typography } from "@mui/material";
import ControlWeather from "./ControlWeather";

interface PrincipalProps {
  title: string;
  temperatureData: number[];
  humidityData: number[];
  cloudinessData: number[];
  xLabels: string[];
}

export default function PrincipalWeather({
  title,
  temperatureData,
  humidityData,
  cloudinessData,
  xLabels,
}: PrincipalProps) {
  const [graphData, setGraphData] = useState({
    data: temperatureData, // Inicia con los datos de temperatura
    labels: xLabels,
    yLabel: "Temperatura",
  });

  const handleSelectionChange = (selected: number) => {
    switch (selected) {
      case 0: // Temperatura
        setGraphData({
          data: temperatureData,
          labels: xLabels,
          yLabel: "Temperatura",
        });
        break;
      case 1: // Humedad
        setGraphData({
          data: humidityData,
          labels: xLabels,
          yLabel: "Humedad (%)",
        });
        break;
      case 2: // Nubosidad
        setGraphData({
          data: cloudinessData,
          labels: xLabels,
          yLabel: "Nubosidad (%)",
        });
        break;
      default: 0;
        break;
    }
  };

  return (
    <Paper
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
        margin: "5px",
        borderRadius: "5px",
        height: "100%",
      }}
    >
      <Typography
        component="h2"
        variant="h6"
        color="black"
        sx={{
          fontFamily: "Helvetica",
          fontSize: "16px",
          fontWeight: "Bold",
          flex: 1,
        }}
        gutterBottom
      >
      {title} hoy:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ControlWeather onSelectionChange={handleSelectionChange} />
        </Grid>
      </Grid>
      <LineChart
        width={900}
        height={400}
        series={[
          {
            data: graphData.data,
            color: "#0570B0",
            area: true,
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: graphData.labels,
            label: "Hora",
            labelStyle: {
              fontSize: 12,
              fontFamily: "Helvetica",
              fontWeight: "Bold",
              marginTop: "5px",
            },
          },
        ]}
        yAxis={[
          {
            scaleType: "linear",
            label: graphData.yLabel,
            labelStyle: {
              fontSize: 12,
              fontFamily: "Helvetica",
              fontWeight: "Bold",
              marginTop: "5px",
            },
          },
        ]}
      />
    </Paper>
  );
}
