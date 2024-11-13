import { useState } from 'react'
import './App.css'
// Grid version 2
import Grid from '@mui/material/Grid2'


function App() {

  return (
    <>
      <Grid>

        {/* Indicadores */}
        <Grid>Elemento: Indicador 1</Grid>
        <Grid>Elemento: Indicador 2</Grid>
        <Grid>Elemento: Indicador 3</Grid>
        <Grid>Elemento: Indicador 4</Grid>

        {/* Tabla */}
        <Grid>Elemento: Tabla</Grid>

        {/* Gráfico */}
        <Grid>Elemento: Gráfico 1</Grid>

      </Grid>
    </>
  )
}

export default App