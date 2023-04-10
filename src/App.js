import React, { Component } from "react";
import Search from "./Search";
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";
import "./style.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
            forecastData: null,
        };
    }

    handleSearch = async (city) => {
        const apiKey = "9820a83cdc1697e38aeca69152a311f8";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.setState({ weatherData: data });

            // Викличіть метод handleForecast після успішного виконання handleSearch
            this.handleForecast(city);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    handleForecast = async (city) => {
        const apiKey = "9820a83cdc1697e38aeca69152a311f8";
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ua`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.setState({ forecastData: data });
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    };

    render() {
        const { weatherData, forecastData } = this.state;
        return (
            <div className="App">
                <Search onSearch={this.handleSearch} />
                <WeatherInfo weatherData={weatherData} />
                <Forecast forecastData={forecastData} />
            </div>
        );
    }
}

export default App;
