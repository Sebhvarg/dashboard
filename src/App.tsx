
import './App.css'
// Grid version 2
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import Item from './interface/Item';
{/* Hooks */ }
import { useEffect, useState } from 'react';
interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}


function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"));

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = "dfd098236efe520ed6dabd68fa36c584";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Quevedo&mode=xml&appid=${API_KEY}`);
      const xmlString = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      // Indicadores
      const dataToIndicators: Indicator[] = [];
      const name = xmlDoc.getElementsByTagName("name")[0]?.textContent || "";
      dataToIndicators.push({ title: "Location", subtitle: "City", value: name });

      const location = xmlDoc.getElementsByTagName("location")[0];
      if (location) {
        dataToIndicators.push({ title: "Latitude", value: location.getAttribute("latitude") || "" });
        dataToIndicators.push({ title: "Longitude", value: location.getAttribute("longitude") || "" });
        dataToIndicators.push({ title: "Altitude", value: location.getAttribute("altitude") || "" });
      }
      setIndicators(dataToIndicators);

      // Items
      const dataToItems: Item[] = [];
      const timeElements = xmlDoc.getElementsByTagName("time");
      for (let i = 0; i < Math.min(6, timeElements.length); i++) {
        const time = timeElements[i];
        dataToItems.push({
          dateStart: time.getAttribute("from") || "",
          dateEnd: time.getAttribute("to") || "",
          precipitation: time.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "",
          humidity: time.getElementsByTagName("humidity")[0]?.getAttribute("value") || "",
          clouds: time.getElementsByTagName("clouds")[0]?.getAttribute("all") || ""
        });
      }
      setItems(dataToItems);
    };
    const dataToItems: Item[] = [];
    const parser = new DOMParser();
    const xmlString = localStorage.getItem("openWeatherMap") || "";
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    const timeElements = xmlDoc.getElementsByTagName("time");
    for (let i = 0; i < Math.min(6, timeElements.length); i++) {
      const time = timeElements[i];
      const dateStart = time.getAttribute("from") || "";
      const dateEnd = time.getAttribute("to") || "";

      const precipitationElement = time.getElementsByTagName("precipitation")[0];
      const precipitation = precipitationElement?.getAttribute("probability") || "";

      const humidityElement = time.getElementsByTagName("humidity")[0];
      const humidity = humidityElement?.getAttribute("value") || "";

      const cloudsElement = time.getElementsByTagName("clouds")[0];
      const clouds = cloudsElement?.getAttribute("all") || "";

      dataToItems.push({ dateStart, dateEnd, precipitation, humidity, clouds });

    
    }
    fetchData();
    setItems(dataToItems);
  }, [owm]);

  return (
    <Grid container spacing={5}>
      {indicators.map((indicator, idx) => (
        <Grid key={idx} size={{ xs: 12, xl: 3 }}>
          <IndicatorWeather
            title={indicator.title}
            subtitle={indicator.subtitle}
            value={indicator.value}
          />
        </Grid>
      ))}
      <Grid size={{ xs: 12, xl: 8 }}>
        {items.length > 0 ? <TableWeather itemsIn={items} /> : <div>Cargando datos...</div>}
      </Grid>
      <Grid size={{ xs: 12, xl: 4 }}>
        <LineChartWeather />
      </Grid>
    </Grid>
  );
}


export default App
