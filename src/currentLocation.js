import React from "react";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

// Function to build a readable date string from a Date object
const dateBuilder = (d) => {
  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

// Default properties for the animated weather icon
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
  // State variables to manage location, weather data, and error messages
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  };

  componentDidMount() {
    // Check if geolocation is available and get the user's position
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          // Default location if user denies geolocation
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating real-time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    // Set an interval to refresh the weather data every 10 minutes
    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Function to get the current position of the user
  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  // Function to fetch weather data from the API
  getWeather = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const baseUrl = process.env.REACT_APP_WEATHER_API_BASE_URL;

    try {
      const api_call = await fetch(
        `${baseUrl}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`
      );
      if (!api_call.ok) {
        throw new Error(`HTTP error! status: ${api_call.status}`);
      }
      const data = await api_call.json();
      this.setState({
        lat: lat,
        lon: lon,
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        country: data.sys.country,
      });
      this.setWeatherIcon(data.weather[0].main);
    } catch (error) {
      console.error("Failed to fetch weather data: ", error);
    }
  };

  // Function to set the appropriate weather icon based on the weather description
  setWeatherIcon = (main) => {
    let icon;
    switch (main) {
      case "Haze":
        icon = "CLEAR_DAY";
        break;
      case "Clouds":
        icon = "CLOUDY";
        break;
      case "Rain":
        icon = "RAIN";
        break;
      case "Snow":
        icon = "SNOW";
        break;
      case "Dust":
        icon = "WIND";
        break;
      case "Drizzle":
        icon = "SLEET";
        break;
      case "Fog":
        icon = "FOG";
        break;
      case "Smoke":
        icon = "FOG";
        break;
      case "Tornado":
        icon = "WIND";
        break;
      default:
        icon = "CLEAR_DAY";
    }
    this.setState({ icon: icon });
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
              <ReactAnimatedWeather
                icon={this.state.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {this.state.temperatureC}°<span>C</span>
                </p>
              </div>
            </div>
          </div>
          <Forcast icon={this.state.icon} weather={this.state.main} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {/* Loader component to indicate that the location is being detected */}
          <div className="loading-container">
            <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} alt="loading" />
            <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
              Detecting your location
            </h3>
            <h3 style={{ color: "white", marginTop: "10px" }}>
              Your current location will be displayed on the App <br /> & used for
              calculating real-time weather.
            </h3>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
