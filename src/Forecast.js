import React from "react";

const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    console.log(
        "Unix timestamp:",
        unixTimestamp,
        "Formatted date:",
        formattedDate
    );
    return formattedDate;
};

const groupByDays = (list) => {
    const grouped = list.reduce((acc, item) => {
        const date = formatDate(item.dt);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    const averaged = Object.entries(grouped)
        .slice(0, 5)
        .map(([date, items]) => {
            const tempSum = items.reduce(
                (sum, item) => sum + item.main.temp,
                0
            );
            const humiditySum = items.reduce(
                (sum, item) => sum + item.main.humidity,
                0
            );
            const pressureSum = items.reduce(
                (sum, item) => sum + item.main.pressure,
                0
            );
            const icon = items[0].weather[0].icon;
            const description = items[0].weather[0].description;

            return {
                date,
                temp: tempSum / items.length,
                humidity: humiditySum / items.length,
                pressure: pressureSum / items.length,
                icon,
                description,
            };
        });

    return averaged;
};

const Forecast = ({ forecastData }) => {
    if (!forecastData || !forecastData.list) {
        return <div>Loading...</div>;
    }

    const { list } = forecastData;
    const dailyData = groupByDays(list);

    return (
        <div className="Forecast">
            {dailyData.map((item, index) => (
                <div key={index} className="Forecast-item">
                    <img
                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                        alt={item.description}
                    />
                    <h3 className="Forecast-item-title">{item.description}</h3>
                    <p className="Forecast-item-date">{item.date}</p>
                    <p className="Forecast-item-temp">
                        Температура: {item.temp.toFixed(1)}°C
                    </p>
                    <p className="Forecast-item-humidity">
                        Вологість: {item.humidity.toFixed(1)}%
                    </p>
                    <p className="Forecast-item-pressure">
                        Тиск: {item.pressure.toFixed(1)} гПа
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Forecast;
