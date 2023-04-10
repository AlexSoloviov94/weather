import React from "react";

const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
};

const WeatherInfo = ({ weatherData }) => {
    if (!weatherData || !weatherData.weather) {
        return <div>Завантаження...</div>;
    }

    const { main, name, weather } = weatherData;
    const currentDate = formatDate();
    return (
        <div className="weather-info">
            <h2>{name}</h2>
            <p>{currentDate}</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt={weather[0].description}
            />
            <h3>{weather[0].description}</h3>
            <p>Температура: {main.temp}°C</p>
            <p>Вологість: {main.humidity}%</p>
            <p>Тиск: {main.pressure} гПа</p>
        </div>
    );
};

export default WeatherInfo;
