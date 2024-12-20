import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './indicatorPrincipal.css';
import imagenGYE from '../assets/img/m2000.png';
import imagenUIO from '../assets/img/panQuito.png';
import luna from '../assets/img/luna.png';
import sol from '../assets/img/sol.png';
import { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
  city: string;  // Recibe ciudad como prop
  unit: 'metric' | 'imperial';  // Recibe unidad como prop
  handleCityChange: (newCity: string) => void;  // Función para cambiar ciudad
  handleUnitChange: (newUnit: 'metric' | 'imperial') => void;  // Función para cambiar unidad

}

export default function IndicatorWeather({ title, subtitle, value, city, unit, handleCityChange, handleUnitChange }: Indicator) {
  const [currentTime, setCurrentTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleTimeString(); // Hora inicial
  });

  const [isDayTime, setIsDayTime] = useState<boolean>(true);
  const cityImages: { [key: string]: string } = {
    Guayaquil: imagenGYE,
    Quito: imagenUIO,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());

      // Cambiar si es día o noche según la hora
      const hours = now.getHours();
      setIsDayTime(hours >= 6 && hours < 19); // Día de 6am a 6pm
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(timer); // Limpia el intervalo al desmontar
  }, []);

  return (
    <Paper
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',

        height: '95.5%',
        background: isDayTime
          ? 'linear-gradient(to bottom, #A1CEF5, #2585D9)' 
          : 'linear-gradient(to bottom,rgba(29, 52, 75, 0.64),rgb(9, 37, 65))', 
        borderRadius: '25px 0px 0px 25px',
      }}
    >
      {/* ComboBox para elegir ciudad */}
      <FormControl fullWidth>
        <label htmlFor="city-label" style={{ color: 'white' }}>Ciudad</label>
        <Select
          labelId="city-label"
          value={city}
          onChange={(event) => handleCityChange(event.target.value as string)}

          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '20px', // Bordes redondeados
            marginBottom: '1rem', // Espacio inferior
            paddingRight: '2rem', // Espacio para el ícono
              '& .MuiSelect-select': {
                  paddingLeft: '1rem', // Ajuste para centrar
              },
              height: '2rem', // Altura del campo
            '& .MuiSelect-icon': {
              color: '#08306B'
      
             
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'blue', // Color del borde
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'darkblue', // Color del borde al pasar el mouse
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Color de la etiqueta
            },
            '&:focus .MuiOutlinedInput-notchedOutline': {
              borderColor: 'blue', // Borde en foco
            },
          }}
          inputProps={{
            style: {
              paddingRight: '2rem', // Para dar espacio al ícono
            },
          }}
        >
          <MenuItem value="Guayaquil">Guayaquil</MenuItem>
          <MenuItem value="Quito">Quito</MenuItem>
        </Select>
      </FormControl>
      <label htmlFor="city-label" style={{ color: 'white' }}>Sistema de temperatura</label>

      <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
  <Select
    labelId="unit-label"
    value={unit}
    onChange={(event) => handleUnitChange(event.target.value as 'metric' | 'imperial')}
    sx={{
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '20px', // Bordes redondeados
      paddingRight: '2rem', // Espacio para el ícono
        '& .MuiSelect-select': {
            paddingLeft: '1rem', // Ajuste para centrar
        },
        height: '2rem', // Altura del campo
      '& .MuiSelect-icon': {
        color: '#08306B'

       
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'blue', // Color del borde
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'darkblue', // Color del borde al pasar el mouse
      },
      '& .MuiInputLabel-root': {
        color: 'black', // Color de la etiqueta
      },
      '&:focus .MuiOutlinedInput-notchedOutline': {
        borderColor: 'blue', // Borde en foco
      },
    }}
    inputProps={{
      style: {
        paddingRight: '2rem', // Para dar espacio al ícono
      },
    }}
  >
    <MenuItem value="metric">Celsius (°C)</MenuItem>
    <MenuItem value="imperial">Fahrenheit (°F)</MenuItem>
  </Select>
</FormControl>
<img src={isDayTime ? sol : luna} alt="Day or Night"
        style={{
          width: '2.5rem',
          height: 'auto',
          objectFit: 'cover',
          objectPosition: 'left',
        }}
      />

      <Typography
        component="h2"
        variant="h6"
        style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        gutterBottom
      >
        {title}
      </Typography>
      

      <Typography
        component="h6"
        variant="h4"
        style={{
          color: 'white',
          fontSize: '5rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {value}
      </Typography>



      <Typography
        style={{
          color: 'white',
          fontSize: '1.5rem',
          textAlign: 'center',
        }}
        sx={{ flex: 1 }}
      >
        {subtitle}
      </Typography>

      <img
        src={cityImages[city] || imagenGYE} 
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'fill',
          objectPosition: 'bottom',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        }}
      />
      {/* Mostrar la hora */}
      <Typography
        style={{
          color: 'white',
          fontSize: '1 rem',
          textAlign: 'center',
          marginTop: '1rem',
        }}
      >
        {currentTime}
      </Typography>
    </Paper>
  );
}
