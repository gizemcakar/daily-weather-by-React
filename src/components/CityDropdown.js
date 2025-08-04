import React from 'react';
import { useCityContext } from '../context/CityContext';
import './CityDropdown.css';

const CityDropdown = () => {
  const { selectedCity, setSelectedCity, turkishCities } = useCityContext();

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="city-dropdown">
      <label htmlFor="city-select">Select City:</label>
      <select 
        id="city-select"
        value={selectedCity}
        onChange={handleCityChange}
        className="city-select"
      >
        {turkishCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdown;
