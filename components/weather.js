'use client';
import React, { useState, useEffect } from 'react';

export default function Weather({ city }){
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '5f539bcb65ee327cd80d44e5e99b53a0';
      let date = new Date().toISOString().split('T')[0];
      console.log(date);
      const geocoderUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
      const geocoderResponse = await fetch(geocoderUrl);
      const geocoderData = await geocoderResponse.json();
      let latitude, longitude;
      if(geocoderData.length > 0){
        latitude = geocoderData[0].lat;
        longitude = geocoderData[0].lon;
      }
      console.log("latitude: ", latitude, "longitude: ", longitude);
      const url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${latitude}&lon=${longitude}&date=${date}&appid=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Weather data:', data);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  const getFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if(hour < 12 && hour > 5) { return "morning"; }
    if(hour < 17) { return "afternoon"; }
    if(hour < 20) { return "evening"; }
    return "night";
  }

  const getCompass = (dir) => {
    return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(dir / 45) % 8];
  }
  const getWeather = (clouds, precip, wind) => {
    let weather = [];
    if(clouds > 50) { weather.push("Cloudy");}
    else if(clouds > 20) { weather.push("Partly Cloudy");}
    else { weather.push("Clear and Sunny");}
    if(precip > 10) { weather.push("Rainy");}
    if(precip > 50) { weather.push("Stormy");}
    if(wind > 2) { weather.push(`Wind ${wind.speed} mph ${getCompass(wind.direction)}`);}
    return weather.join(", ");
  }
  const renderWeather = () => {
    return(
      <div>
        <p>High temp: {weatherData.temperature ? getFahrenheit(weatherData.temperature.max) : "loading "} °F</p>
        <p>Low temp: {weatherData.temperature ? getFahrenheit(weatherData.temperature.min) : "loading "} °F</p>
        <p>Current: {weatherData.temperature ? getFahrenheit(weatherData.temperature[getTimeOfDay()]) : "loading "} °F</p>
        <p>Weather: {weatherData.date ? getWeather(weatherData.cloud_cover.afternoon, weatherData.precipitation.total, weatherData.wind.max): "loading "}</p>
      </div>
    );
  }

  if (!weatherData) {return(<p>Loading...</p>);}
  return (
    <div className="items-center justify-center">
      <div className="flex w-[50vw] items-center">
      <h2 className="text-left">Weather in: </h2>
      <h2 className="text-right items-end">{" " + city}</h2>
      </div>
      {renderWeather()}
      {/* <p>Temperature: {weatherData.temperature ? "working" : "fail"} °C</p>
      <p>Weather: {weatherData.main ? weatherData.weather[ : "fail"}</p> */}
    </div>
  );
};
