import './App.css';
import Grid from '@mui/material/Grid';
import IndicatorWeather from './components/IndicatorWeather';
import DetailsWeather from './components/DetailsWeather';
import Header from './components/Header';
import TableWeather from './components/TableWeather';
import LineChartWeather from './components/LineChartWeather';
import { useEffect, useState } from 'react';
import Item from './interface/Item';
import Lluvia from './assets/img/lluvia.png';
import Humedad from './assets/img/humedad.png';
import Termico from './assets/img/terMO.png';
import { Typography } from '@mui/material';
import PrincipalWeather from './components/PrincipalWeather';


interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [city, setCity] = useState<string>('Guayaquil');
  let [xMenor, setXMenor] = useState<number>(0);
  let [xMayor, setXMayor] = useState<number>(0);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric'); // Celsius o Fahrenheit
  const [details, setDetails] = useState({
    rainProbability: '0',
    humidity: '0',
    feelsLike: '0',
  });
  const [chartData, setChartData] = useState({
    temperatureData: [] as number[], 
    windSpeeds: [] as number[],      
    humidityData: [] as number[],   
    cloudData: [] as number[],      
    xLabels: [] as string[],         
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = 'dfd098236efe520ed6dabd68fa36c584';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&lang=es&mode=xml&appid=${API_KEY}`
        );
        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");

        if (!response.ok) {
          console.error('Error al obtener los datos de OpenWeatherMap.');
          return;
        }

        // Procesar indicadores del clima
        const weatherStatus = xmlDoc.getElementsByTagName("symbol")[0]?.getAttribute("name") || "";
        const temperature = xmlDoc.getElementsByTagName("temperature")[0]?.getAttribute("value") || "";
        const feelsLike = xmlDoc.getElementsByTagName("feels_like")[0]?.getAttribute("value") || "";
        const humidity = xmlDoc.getElementsByTagName("humidity")[0]?.getAttribute("value") || "";
        const rainProbability = xmlDoc.getElementsByTagName("precipitation")[0]?.getAttribute("probability")?.split('.')[1] || "0";

        const roundedTemperature = Math.round(parseFloat(temperature));
        setIndicators([
          {
            title: city,
            value: `${roundedTemperature} °${unit === 'metric' ? 'C' : 'F'}`,
            subtitle: weatherStatus.charAt(0).toUpperCase() + weatherStatus.slice(1),
          },
        ]);

        // Configurar detalles de clima
        setDetails({
          rainProbability,
          humidity,
          feelsLike,
        });

        // Procesar datos para la tabla y el gráfico
        const dataToItems: Item[] = [];
        const windSpeeds: number[] = [];
        const temperatureData: number[] = [];
        const humidityData: number[] = [];
        const cloudData: number[] = [];
        const xLabels: string[] = [];


        const timeElements = xmlDoc.getElementsByTagName("time");

        for (let i = 0; i < Math.min(5, timeElements.length); i++) {
          const time = timeElements[i];
          const temperature = time.getElementsByTagName("temperature")[0]?.getAttribute("value") || "";
          const windSpeed = time.getElementsByTagName("windSpeed")[0]?.getAttribute("mps") || "";
          const humidity = time.getElementsByTagName("humidity")[0]?.getAttribute("value") || "";
          const clouds = time.getElementsByTagName("clouds")[0]?.getAttribute("all") || "";
          const dateLabel = time.getAttribute("from")?.split("T")[1]?.slice(0, 5) || "";

          const tempValue = parseFloat(temperature);
          const windValue = parseFloat(windSpeed);
          temperatureData.push(parseFloat(temperature));
          windSpeeds.push(parseFloat(windSpeed));
          humidityData.push(parseFloat(humidity));
          cloudData.push(parseFloat(clouds));
          xLabels.push(dateLabel);

          if (tempValue < xMenor) {
            xMenor = tempValue;
          }
          if (tempValue > xMayor) {
            xMayor = tempValue;
          }

          dataToItems.push({
            dateStart: time.getAttribute("from")?.split("T")[1] || "",
            dateEnd: time.getAttribute("to")?.split("T")[1] || "",
            precipitation: String(Math.round(parseFloat(time.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "0") * 100)),
            humidity: time.getElementsByTagName("humidity")[0]?.getAttribute("value") || "",
            clouds: time.getElementsByTagName("clouds")[0]?.getAttribute("all") || "",
          });
          
          
          temperatureData.push(tempValue);
          windSpeeds.push(windValue);
          xLabels.push(dateLabel);
        }

        setXMenor(xMenor);

        setXMayor(xMayor);
        console.log(xMenor, xMayor + "xMenor, xMayor");
        

        setItems(dataToItems);

        // Configurar datos del gráfico
        setChartData({
          temperatureData,
          windSpeeds,
          humidityData,
          cloudData,
          xLabels,
        });
      } catch (error) {
        console.error('Error al procesar los datos:', error);
      }
    };

    fetchData();
  }, [city, unit, xMenor, xMayor]);

  // Función para manejar el cambio de ciudad
  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  // Función para manejar el cambio de unidad (Celsius o Fahrenheit)
  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    setUnit(newUnit);
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Grid container spacing={5}>
          {/* Indicadores del clima */}
          {indicators.map((indicator, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index} sx={{ height: 'auto' }}>
              <IndicatorWeather
                city={city}
                unit={unit}
                handleCityChange={handleCityChange}
                handleUnitChange={handleUnitChange}
                {...indicator}
              />
            </Grid>
          ))}

          {/* Sección de detalles */}
          <Grid
            item
            xs={12}
            sm={6}
            lg={9}
            sx={{
              backgroundColor: '#E4F1FF',
              marginTop: '40px',
              borderRadius: '0px 25px 25px 0px',
              padding: '20px',
              paddingLeft: '40px',
              paddingRight: '40px',
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              width: 'fit-content',
            }}
          >
            <Header name={city} min={xMenor} max={xMayor} />
            <Grid item xs={12} >
              <PrincipalWeather title={city} temperatureData={chartData.temperatureData} humidityData={chartData.humidityData} cloudinessData={chartData.cloudData} xLabels={chartData.xLabels} />
            </Grid>
            <Grid
              item
              xs={12}
              xl={6}
              sx={{ display: 'flex', justifyContent: 'flex-start' }} // Alineado a la izquierda
            >
            </Grid>
            <Grid item
              xs={12}
              xl={6}
              sx={{ display: 'flex', justifyContent: 'flex-start' }}>

              <Typography align='left'>Más información sobre: {city}</Typography>
            </Grid>


            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              sx={{ marginTop: '20px' }}
            >
              {/* Componente LineChartWeather a la izquierda */}
              <Grid
                item
                xs={12}
                xl={6}
                sx={{ display: 'flex', justifyContent: 'flex-start' }} // Alineado a la izquierda
              >
                <LineChartWeather windSpeeds={chartData.windSpeeds} xLabels={chartData.xLabels} />
              </Grid>

              {/* Componente TableWeather a la derecha */}
              <Grid
                item
                xs={12}
                xl={6}
                sx={{ display: 'flex', justifyContent: 'flex-end' }} // Alineado a la derecha
              >
                <TableWeather itemsIn={items} />
              </Grid>
            </Grid>


            {/* Gráfico */}


            {/* Detalles del clima */}
            <Grid container spacing={2} justifyContent="space-between">

              {/* Lluvia */}
              <Grid item xs={12} sm={4} lg={3}>
                <DetailsWeather title="Precipitación" image={Lluvia} value={`${details.rainProbability} %`} />
              </Grid>
              {/* Humedad */}
              <Grid item xs={12} sm={4} lg={3}>
                <DetailsWeather title="Humedad" image={Humedad} value={`${details.humidity} %`} />
              </Grid>
              {/* Sensación Térmica */}
              <Grid item xs={12} sm={4} lg={3}>
                <DetailsWeather
                  title="Sensación Térmica"
                  image={Termico}
                  value={`${details.feelsLike} °${unit === 'metric' ? 'C' : 'F'}`}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
