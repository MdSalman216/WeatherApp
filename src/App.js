import React, { useState } from "react";

const api = {
  key: "ff9115c697d34bb87e5e39370604bfc5",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (d) => {
    if (d.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]; //order matters
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]; // order matters

    let day = days[d.getDay()]; // d.getDay() returns 0 for Sunday, 1 for Monday, etc.
    let date = d.getDate(); // returns current date.
    let month = months[d.getMonth()]; // d.getMonth() returns 0 for January, 1 for February and so on.
    let year = d.getFullYear(); // retuens current year

    // console.log(year);

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search City Name...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>

            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}°c </div>
              <div className="weather"> {weather.weather[0].main} </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
