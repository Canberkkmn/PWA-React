import { useState, useEffect } from "react";
import { fetchWeather } from "./api/fetchWeather";

import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Weather App", {
              body: `Weather in ${data.name} is ${data.main.temp}°C`,
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            });
          });
        }
      });

      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        onKeyDown={search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
