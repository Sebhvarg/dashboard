
import './App.css'
// Grid version 2
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
{/* Hooks */ }
import { useEffect, useState } from 'react';
interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
     {/* Variable de estado y función de actualización */}
     let [indicators, setIndicators] = useState<Indicator[]>([])
  
     {/* Hook: useEffect */}
     useEffect(()=>{

      let request = async () => {
        

          {/* Request */}
          let API_KEY = "dfd098236efe520ed6dabd68fa36c584"
          let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
          let savedTextXML = await response.text();
             {/* XML Parser */}
             const parser = new DOMParser();
             const xml = parser.parseFromString(savedTextXML, "application/xml");
                 {/* Arreglo para agregar los resultados */}

                 let dataToIndicators : Indicator[] = new Array<Indicator>();

                 {/* 
                     Análisis, extracción y almacenamiento del contenido del XML 
                     en el arreglo de resultados
                 */}
    
                 let name = xml.getElementsByTagName("name")[0].innerHTML || ""
                 dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})
    
                 let location = xml.getElementsByTagName("location")[1]
    
                 let latitude = location.getAttribute("latitude") || ""
                 dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })
    
                 let longitude = location.getAttribute("longitude") || ""
                 dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })
    
                 let altitude = location.getAttribute("altitude") || ""
                 dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })
    
                 console.log( dataToIndicators )

                 setIndicators( dataToIndicators )


      }

      request();

  },[])


  return (

    <Grid container spacing={5}>

      {/* 
<Grid size={{ xs: 12, xl: 3 }} >Elemento: Indicador 1>
        
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }} >Elemento: Indicador 2
        <IndicatorWeather title={'Indicator 2'} subtitle={'Unidad 2'} value={"3.12"} />
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }} >Elemento: Indicador 3
        <IndicatorWeather title={'Indicator 3'} subtitle={'Unidad 3'} value={"2.31"} />
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }} >Elemento: Indicador 4
        <IndicatorWeather title={'Indicator 4'} subtitle={'Unidad 4'} value={"3.21"} />
      </Grid>
       */}{
        indicators
        .map(
            (indicator, idx) => (
                <Grid key={idx} size={{ xs: 12, xl: 3 }}>
                    <IndicatorWeather 
                        title={indicator["title"]} 
                        subtitle={indicator["subtitle"]} 
                        value={indicator["value"]} />
                </Grid>
            )
        )
       }

      {/* Tabla */}
      <Grid size={{ xs: 12, xl: 8 }}>Elemento: Tabla

        {/* Grid Anidado */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 3 }}>
            <ControlWeather />
          </Grid>
          <Grid size={{ xs: 12, xl: 9 }}>
            <TableWeather />
          </Grid>
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, xl: 4 }}>Elemento: Gráfico 1

        <LineChartWeather />

      </Grid>

    </Grid>


  )

}

export default App
