
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
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



        {/* 5. Request */ }
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,cloud_cover,visibility,uv_index,sunshine_duration,windspeed_1000hPa,winddirection_1000hPa&daily=temperature_2m_max,temperature_2m_min,uv_index_max,uv_index_clear_sky_max&timezone=auto`)
        let dataJson = await response.json();

      {/* XML Parser 

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");*/}

      {/* Arreglo para agregar los resultados */ }

      let dataToIndicators = new Array()

      {/* 
                 Análisis, extracción y almacenamiento del contenido del XML 
                 en el arreglo de resultados
             */}

      {/*let location = xml.getElementsByTagName("location")[1]

      let geobaseid = location.getAttribute("geobaseid")
      dataToIndicators.push(["Location", "geobaseid", geobaseid])

      let latitude = location.getAttribute("latitude")
      dataToIndicators.push(["Location", "Latitude", latitude])

      let longitude = location.getAttribute("longitude")
      dataToIndicators.push(["Location", "Longitude", longitude]) */}

      //console.log( dataToIndicators )

      let latitud = dataJson.latitude
      dataToIndicators.push(["Location", "Latitude", latitud])
      let longitud = dataJson.longitude
      dataToIndicators.push(["Location", "Longitude", longitud])

      {/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */ }

      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
      )

      
      let hourlyData = dataJson.hourly;

      

      let mappedData = hourlyData.time.map((time, index) => {
        return {
            "time": time.split("T")[1],
            "uv": hourlyData.uv_index[index],
            "windSpeed": hourlyData.windspeed_1000hPa[index] + " " + "km/h",
            "temperature": hourlyData.temperature_2m[index] + " " + "°C"
        };
    });


      {/*let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {

        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]

        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code")

        let clouds = timeElement.getElementsByTagName("clouds")[0].getAttribute("value")

        let precipitation = timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability")

        let humidity = timeElement.getElementsByTagName("humidity")[0].getAttribute("value") + timeElement.getElementsByTagName("humidity")[0].getAttribute("unit")

        return { "rangeHours": rangeHours, "windDirection": windDirection , "clouds": clouds , "precipitation": precipitation , "humidity": humidity}

      })*/}

      {/*arrayObjects = arrayObjects.slice(0, 8)*/}

      setRowsTable(mappedData)
      setIndicators(indicatorsElements)
     

    })()

  }, [])

  {/* JSX */ }

  return (
    <Grid container spacing={5}>

      <Grid xs={6} lg={2}>
        {indicators[0]}
      </Grid>
      
      <Grid xs={6} lg={2}>
        {indicators[1]}
      </Grid>

      <Grid xs={6} md={4} lg={2}>
        {indicators[2]}
      </Grid>

      <Grid xs={6} sm={4} md={3} lg={6}>
        <Summary></Summary>
      </Grid>

      <Grid xs={12} lg={2}>
        <ControlPanel />
      </Grid>

      <Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid>

      <Grid xs={12} lg={12}>
        <BasicTable rows={rowsTable}></BasicTable>
      </Grid>
    </Grid>


  )
}

export default App
