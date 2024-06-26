import { useState } from 'react'
import { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import './App.css'

function App() {

  {/* Hook: useEffect */ }

  useEffect(()=>{

    (async ()=>{

        {/* Request */}

        let API_KEY = "b219edf6dd38676f8fcbfb53deb5e83e"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
        let savedTextXML = await response.text();

        {/* XML Parser */}

        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        {/* Arreglo para agregar los resultados */}

        let dataToIndicators = new Array()

        {/* 
            Análisis, extracción y almacenamiento del contenido del XML 
            en el arreglo de resultados
        */}

        let location = xml.getElementsByTagName("location")[1]

        let geobaseid = location.getAttribute("geobaseid")
        dataToIndicators.push(["Location","geobaseid", geobaseid])

        let latitude = location.getAttribute("latitude")
        dataToIndicators.push(["Location","Latitude", latitude])

        let longitude = location.getAttribute("longitude")
        dataToIndicators.push(["Location","Longitude", longitude])

        console.log( dataToIndicators )
    })()

},[])




  {/* JSX */ }

  return (

    <><Grid container spacing={5}>
      <Grid xs={12} sm={4} md={3} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>
        <Summary></Summary>
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
      <Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
      <Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
      <Grid xs={6} sm={4} md={6} lg={2}>6</Grid>

      <Grid xs={12} md={6} lg={9}>
        <BasicTable />
      </Grid>
    </Grid><Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid><Grid xs={12} lg={2}>
        <ControlPanel />
      </Grid><Grid xs={12} lg={10}>
        <WeatherChart></WeatherChart>
      </Grid></>


  )


}

export default App
