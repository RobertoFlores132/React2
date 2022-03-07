import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = () => {

    const [ response, setResponse ] = useState ({})
    const [ isCelsius, setIsCelsius ] = useState(true)
    const [ temp, setTemp ] = useState(0)
    const [ feels_like, setFeels_like ] = useState(0)

    
         const success = pos => {
        console.log(pos.coords)
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d71d7a28b79954a0883d2794e3501218`)
        .then(res => {
            setResponse(res.data);
            setTemp(res.data.main.temp);
            setFeels_like(res.data.main.feels_like)
    })}
    
   const like = () => {
       const sense = feels_like - 273.15

       return sense.toFixed(2)
   }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(success)
    }, [])

    const convertCelsius = () => {
        const celsius = temp - 273.15

        return celsius.toFixed(2)
    }

    const convertTemp = () => {

        if(isCelsius){
           setTemp(convertCelsius()*1.8+32)
            setIsCelsius(false)
        }else{
            setTemp(convertCelsius()-32*1.8)
            setIsCelsius(true)
        }
    }

    return (
        <div className='Weather'>
        <div className='Weather-Card'>
            <h1>{response.name}, {response.sys?.country}</h1>
            <p><i className="fas fa-cloud"></i></p>
            <div className='div-temp'>
            <h2>Temperatura Actual: {convertCelsius()} {isCelsius ? '°C' : '°F' }</h2>
            <h2>Sensacion Térmica: {like()} °C</h2>
            <h2>Presión Atmosférica: {response.main?.pressure} hPa</h2>
            <h2>Humedad: {response.main?.humidity}%</h2>
            <h2>Velocidad del Viento: {response.wind?.speed} m/s</h2>
            </div>
            <div className='Button'>
            <button onClick={convertTemp}>Convert to {isCelsius ? '°F' : '°C'}</button>
            </div>
        </div>
        </div>
    );
};

export default Weather;