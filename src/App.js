import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { CityProvider } from './context/CityContext';
import { WeatherProvider } from './context/WeatherContext';
import CityDropdown from './components/CityDropdown';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  return (
    <CityProvider>
      <WeatherProvider>
        <div className="App">
          <Header />
          <CityDropdown />
          <WeatherDisplay />
        </div>
      </WeatherProvider>
    </CityProvider>
  );
}

export default App;
