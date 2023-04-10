import React, { useState } from "react";

function Search({ onSearch }) {
    const [city, setCity] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(city);
    };

    return (
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Введіть назву міста"
                />

                <button type="submit">Пошук</button>
            </form>
        </div>
    );
}

export default Search;
