import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
const Weather = () => {
    const inputref=useRef()
    const [weatherdata,SetWeatherdata]=useState(false)
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon
    }
    const search = async (city)=>{
        if(city==="")
        {
            alert("Enter a city name:");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response=await fetch(url);
            const data=await response.json()
            console.log(data);
            const icon=allIcons[data.weather[0].icon]||clear_icon;
            SetWeatherdata({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location:data.name,
                icons:icon
            })

        }
        catch(error){
            SetWeatherdata(false);
            console.error("error in fetching");
        }
    }
    useEffect(()=>{search("chennai")},[])
  return (
   
    <div  className='weather'>
        <div className="search-bar">
            <input ref={inputref} type='text' placeholder='Search'/>
            <img src={search_icon} alt=''onClick={()=>search(inputref.current.value)}/>
        </div>
        {weatherdata?<>        <img src={weatherdata.icons} alt='' className='weather-icon'/>
        <p className='temperature'>{weatherdata.temperature}°C</p>
        <p className='location'>{weatherdata.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt=''/>
                <div>
                    <p>{weatherdata.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt=''/>
                <div>
                    <p>{weatherdata.windSpeed} km/hr</p>
                    <span>Wind speed</span>
                </div>
            </div>
        </div></>:<></>}
        

       
    </div>
  )
}

export default Weather