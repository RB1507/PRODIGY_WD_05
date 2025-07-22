const apiKey = "01df6f9a9a33bb826441feb4aa5a3cb2";

document.getElementById("cityInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherInfo = document.getElementById("weatherInfo");

    if (city === "") {
        weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    weatherInfo.innerHTML = `<p>Fetching weather for <strong>${city}</strong>...</p>`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const tempC = data.main.temp;
            const tempF = (tempC * 9 / 5 + 32).toFixed(1);
            const humidity = data.main.humidity;
            const condition = data.weather[0].description;

            weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p><strong>Temperature:</strong> ${tempC}°C / ${tempF}°F</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Condition:</strong> ${condition}</p>
      `;
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}