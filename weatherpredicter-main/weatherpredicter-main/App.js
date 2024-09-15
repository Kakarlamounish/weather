import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/weather`, {
        params: { location }
      });
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching weather data');
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather">
          <h2>Weather in {weather.city.name}</h2>
          {/* Customize this section to display weather data */}
          <ul>
            {weather.list.map((item) => (
              <li key={item.dt}>
                {item.dt_txt}: {item.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
