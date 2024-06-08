import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import "./Forcast.css"; 

function Forcast(props) {
  // State variables to manage query input, error messages, weather data, and theme mode
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to fetch weather data from API
  const search = (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const baseUrl = process.env.REACT_APP_WEATHER_API_BASE_URL;

    axios
      .get(
        `${baseUrl}weather?q=${city !== "[object Object]" ? city : query}&units=metric&APPID=${apiKey}`
      )
      .then((response) => {
        // Update weather state with fetched data
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        // Reset weather data and set error message
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  // Default properties for the animated weather icon
  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  // Initial API call to fetch weather data for a default city (e.g., Delhi) on component mount
  useEffect(() => {
    search("Delhi");
    // eslint-disable-next-line
  }, []);

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`forecast ${isDarkMode ? "light-mode" : "dark-mode"}`}>
      {/* Button to toggle theme mode */}
      <button onClick={toggleTheme} className="theme-toggle-button">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </button>
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                search(query);
              }
            }}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)}
              alt="search"
            />
          </div>
        </div>
        <ul>
          {typeof weather.main !== "undefined" ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </li>
              <li>
                Temperature
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity
                <span className="temp">{Math.round(weather.main.humidity)}%</span>
              </li>
              <li>
                Visibility
                <span className="temp">{Math.round(weather.visibility / 1000)} km</span>
              </li>
              <li >
                Wind Speed
                <span className="temp">{Math.round(weather.wind.speed)} Km/h</span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forcast;
