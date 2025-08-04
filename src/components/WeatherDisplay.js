import React, { useEffect } from 'react';
import { useWeatherContext } from '../context/WeatherContext';
import { useCityContext } from '../context/CityContext';
import './WeatherDisplay.css';

const WeatherDisplay = () => {
  const { currentWeather, forecast, loading, error, fetchWeatherData } = useWeatherContext();
  const { selectedCity } = useCityContext();

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity]);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return <div className="weather-loading">Loading weather data...</div>;
  }

  if (error) {
    return (
      <div className="weather-error">
        <h3>Error loading weather data</h3>
        <p>{error}</p>
        {error.includes('API key') && (
          <p>
            <strong>To get weather data:</strong><br/>
            1. Go to <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a><br/>
            2. Sign up for a free account<br/>
            3. Get your API key<br/>
            4. Replace 'YOUR_API_KEY_HERE' in WeatherContext.js
          </p>
        )}
      </div>
    );
  }

  if (!currentWeather) {
    return <div className="weather-placeholder">Select a city to see weather data</div>;
  }

  return (
    <div className="weather-container">
      {/* Current Weather */}
      <div className="current-weather">
        <h2>Current Weather in {selectedCity}</h2>
        <div className="current-weather-content">
          <div className="weather-icon">
            <img 
              src={getWeatherIcon(currentWeather.weather[0].icon)} 
              alt={currentWeather.weather[0].description}
            />
          </div>
          <div className="weather-details">
            <div className="temperature">{Math.round(currentWeather.main.temp)}°C</div>
            <div className="description">{currentWeather.weather[0].description}</div>
            <div className="feels-like">Feels like {Math.round(currentWeather.main.feels_like)}°C</div>
          </div>
          <div className="weather-stats">
            <div className="stat">
              <span className="label">Humidity</span>
              <span className="value">{currentWeather.main.humidity}%</span>
            </div>
            <div className="stat">
              <span className="label">Wind Speed</span>
              <span className="value">{currentWeather.wind.speed} m/s</span>
            </div>
            <div className="stat">
              <span className="label">Pressure</span>
              <span className="value">{currentWeather.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-cards">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="forecast-date">
                {index === 0 ? 'Today' : formatDate(day.date)}
              </div>
              <div className="forecast-icon">
                <img 
                  src={getWeatherIcon(day.weather.icon)} 
                  alt={day.weather.description}
                />
              </div>
              <div className="forecast-temps">
                <span className="max-temp">{day.maxTemp}°</span>
                <span className="min-temp">{day.minTemp}°</span>
              </div>
              <div className="forecast-description">
                {day.weather.main}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
