import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";

export default function WeatherChart() {
    const [values, setValues] = useState([["Hora", "Precipitación", "Humedad", "Nubosidad"]]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,cloud_cover,uv_index');
                const data = await response.json();

                // Transformar los datos
                const times = data.hourly.time;
                const precipitation = data.hourly.precipitation_probability; // Ajusta esto si la clave es diferente
                const humidity = data.hourly.relative_humidity_2m; // Ajusta esto si la clave es diferente
                const cloudCover = data.hourly.cloud_cover; // Ajusta esto si la clave es diferente

                const formattedData = times.map((time, index) => {
                    const hora = new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                    return [hora, precipitation[index], humidity[index], cloudCover[index]];
                });

                setValues(prevValues => [...prevValues, ...formattedData]);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        }

        fetchData();
    }, []);

    const options = {
        title: "Precipitación, Humedad y Nubosidad vs Hora",
        curveType: "function",
        legend: { position: "right" },
    }

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Chart
                chartType="LineChart"
                data={values}
                width="100%"
                height="400px"
                options={options}
            />
        </Paper>
    )
}
