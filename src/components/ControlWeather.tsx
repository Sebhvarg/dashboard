import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ControlWeather({ onSelectionChange }: { onSelectionChange: (selected: number) => void }) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [, setSelected] = useState(0); // Inicializa con el valor de "Temperatura"

  const items = [
    { name: "Temperatura", description: "Magnitud física que mide el grado de calor o frío de un cuerpo o del ambiente" },
    { name: "Humedad", description: "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje." },
    { name: "Nubosidad", description: "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida." },
  ];

  const options = items.map((item, key) => (
    <MenuItem key={key} value={key}>
      {item.name}
    </MenuItem>
  ));

  const handleChange = (event: SelectChangeEvent) => {
    const idx = parseInt(event.target.value);
    setSelected(idx);
    if (descriptionRef.current !== null) {
      descriptionRef.current.innerHTML = idx >= 0 ? items[idx].description : "";
    }
    onSelectionChange(idx); // Notifica al componente padre
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          defaultValue='-1'

          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "20px",
            marginBottom: "1rem",
            paddingRight: "2rem",
            width: "30vh",
            "& .MuiSelect-select": {
              paddingLeft: "1rem",
            },
            height: "2rem",
            "& .MuiSelect-icon": {
              color: "#08306B",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "blue",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "darkblue",
            },
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "&:focus .MuiOutlinedInput-notchedOutline": {
              borderColor: "blue",
            },
          }}
        >
          <MenuItem key="1" value="-1" disabled>
            Seleccione una variable
          </MenuItem>
          {options}
        </Select>
      </FormControl>
    </Box>
  );
}
