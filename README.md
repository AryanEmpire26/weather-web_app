# Weather App

## Introduction
This is a weather application built using React.js. It provides real-time weather information based on the user's geolocation or a default location. The application displays the current temperature, weather condition, and a forecast for the selected location. It also features dynamic weather icons and a live clock.

## Technologies Used
- **React.js**: Used for building the user interface and managing state.
- **React Live Clock**: Library for displaying a live clock.
- **React Animated Weather**: Library for displaying animated weather icons.
- **Axios**: HTTP client for fetching weather data from the OpenWeather API.
- **CSS**: Styling the application components.
- **Geolocation API**: Used to fetch the user's current location for weather data.
- **OpenWeather API**: Provides real-time weather data for locations.

## Live Demo
[Click here to view the live demo](https://react-weather-oy3dxvfb3-aryan-ranjans-projects.vercel.app/)

## Instructions to Run Locally
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install --legacy-peer-deps`.
4. Create a `.env` file in the project root and add your OpenWeather API key:
5. Run the application locally by running `npm start`.
6. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Known Issues/Limitations
- The application may not work properly if geolocation is disabled in the user's browser.
- The default location (Delhi) is used if geolocation is denied by the user.
- Limited support for older browsers, as the application utilizes modern JavaScript features and APIs.

