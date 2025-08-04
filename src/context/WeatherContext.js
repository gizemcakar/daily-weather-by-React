import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // You'll need to get a free API key from openweathermap.org
  const API_KEY = 'd6dd1bb82a7cf62917275099f0c2322d'; // Replace with your actual API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeatherData = async (city) => {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      setError('Please add your OpenWeatherMap API key');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `${BASE_URL}/weather?q=${city},TR&appid=${API_KEY}&units=metric`
      );
      
      if (!currentResponse.ok) {
        throw new Error('Failed to fetch current weather');
      }

      const currentData = await currentResponse.json();
      setCurrentWeather(currentData);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${city},TR&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast');
      }

      const forecastData = await forecastResponse.json();
      
      // Process forecast data to get daily forecasts
      const dailyForecasts = processForecastData(forecastData.list);
      setForecast(dailyForecasts);

    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!dailyData[date]) {
        dailyData[date] = {
          date: date,
          temps: [],
          weather: item.weather[0],
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        };
      }
      
      dailyData[date].temps.push(item.main.temp);
    });

    return Object.values(dailyData).slice(0, 5).map(day => ({
      ...day,
      maxTemp: Math.round(Math.max(...day.temps)),
      minTemp: Math.round(Math.min(...day.temps))
    }));
  };

  const value = {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherData
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};
