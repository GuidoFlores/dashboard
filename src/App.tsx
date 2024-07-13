
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
{/*import Summary from './components/Summary';*/ }
import BasicTable from './components/BasicTable';
import WeatherDashboard from './components/WeatherDashboard';
import { useEffect, useState } from 'react';

import './App.css'


function App() {

  {/* Variable de estado y función de actualización */ }

  let [indicators, setIndicators] = useState([])
  let [rowsTable, setRowsTable] = useState([])


  {/* Hook: useEffect */ }

  {/* Función para el efecto secundario a ejecutar y Arreglo de dependencias */ }

  {/*useEffect(() => {
    (async () => {

    })()
  },[])*/}


  useEffect(() => {

    (async () => {

      {/* 1. Comente el código anterior con el Request */ }

      {/*Petición asincrónica a OpenWeatherMap*/}
      let API_KEY = "b219edf6dd38676f8fcbfb53deb5e83e"
      let responseOpenWeather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      let savedTextXML = await responseOpenWeather.text();
      {/*XML Parser*/ }
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      {/*Petición asíncrónica a OpenMeteo*/}
      let responseOpenMeteo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,cloud_cover,visibility,uv_index,sunshine_duration,windspeed_1000hPa,winddirection_1000hPa&daily=temperature_2m_max,temperature_2m_min,uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`)
      let dataJson = await responseOpenMeteo.json();

      {/* Arreglo para agregar los resultados del XML */ }

      let dataToIndicators = new Array()

      {/*Extracción y procesamiento de datos para agregarlos al arreglo de resultados*/}
      let location = xml.getElementsByTagName("location")[1]
      let geobaseid = location.getAttribute("geobaseid")
      let latitude = location.getAttribute("latitude")
      let longitude = location.getAttribute("longitude")

      let temperatureTag = xml.getElementsByTagName("temperature")
      let temp_max = Number(temperatureTag[0].getAttribute("max"))
      let temp_min = Number(temperatureTag[0].getAttribute("min"))
      let temp_prom = (temp_max + temp_min) / 2

      let windDirectionTag = xml.getElementsByTagName("windDirection")
      let WindDirection = windDirectionTag[0].getAttribute("deg") + "° (" + windDirectionTag[0].getAttribute("code") + ")"
      let windSpeedTag = xml.getElementsByTagName("windSpeed")
      let windSpeed = windSpeedTag[0].getAttribute("mps") + windSpeedTag[0].getAttribute("unit") + " (" + windSpeedTag[0].getAttribute("name") + ")"
      let windGustTag = xml.getElementsByTagName("windGust")
      let windGust = windGustTag[0].getAttribute("gust") + windGustTag[0].getAttribute("unit")

      let cityName = xml.getElementsByTagName("name")[0].textContent
      let country = xml.getElementsByTagName("country")[0].textContent
      let timezoneTag = xml.getElementsByTagName("timezone")[0].textContent
      let timezone = Number(timezoneTag) / 3600

      dataToIndicators.push(["Location", "Latitude: " + latitude, "Longitude: " + longitude, "Geobase: " + geobaseid])
      dataToIndicators.push(["Temperature", "Max: " + temp_max + "°C", "Min: " + temp_min + "°C", "Avg: " + Math.round(temp_prom) + "°C"])
      dataToIndicators.push(["Wind", "Direction: " + WindDirection, "Speed: " + windSpeed, "Gust: " + windGust])
      dataToIndicators.push(["Info", "City: " + cityName, "Country: " + country, "Time zone: " + "UTC" + timezone])

      {/* Renderizando el arreglo de resultados en un arreglo de elementos Indicator */ }
      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} value2={element[3]} />
      )

      {/*Renderizando valores obtenidos de OpenMeteo pque serán agregados a la tabla */}
      let hourlyData = dataJson.hourly;

      let mappedData = hourlyData.time.map((time, index) => {
        return {
          "time": time.split("T")[1],
          "uv": hourlyData.uv_index[index],
          "windSpeed": hourlyData.windspeed_1000hPa[index] + " " + "km/h",
          "temperature": hourlyData.temperature_2m[index] + " " + "°C"
        };
      });

      {/*Actualizando el estado el los componentes*/ }

      setRowsTable(mappedData)
      setIndicators(indicatorsElements)


    })()

  }, [])

  {/* JSX */ }

  return (
    <Grid container spacing={5}>

      <Grid xs={6} md={4} lg={3}>
        {indicators[3]}
      </Grid>

      <Grid xs={6} lg={3}>
        {indicators[0]}
      </Grid>

      <Grid xs={6} lg={3}>
        {indicators[1]}
      </Grid>

      <Grid xs={6} md={4} lg={3}>
        {indicators[2]}
      </Grid>

      <Grid xs={12} lg={12}>
        <WeatherDashboard></WeatherDashboard>
      </Grid>

      <Grid xs={12} lg={12}>
        <BasicTable rows={rowsTable}></BasicTable>
      </Grid>
    </Grid>


  )
}

export default App
