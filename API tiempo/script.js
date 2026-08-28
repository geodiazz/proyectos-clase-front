const inputBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");

const apiKey = "412a7984ab40a2f1136e19c6ab7fa298";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("Ciudad no encontrada");
        }

        var data = await response.json();

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `°C`;
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + `%`;
        document.querySelector(".wind").innerHTML = data.wind.speed + ` km/h`;

        const weatherIcons = {
            "Clear": "images/clear.png",
            "Snow": "images/snow.png",
            "Rain": "images/rain.png",
            "Clouds": "images/clouds.png"
        };

        weatherIcon.src = weatherIcons[data.weather[0].main] || "images/rain.png";

        weather.style.display = "block";
        errorMsg.style.display = "none";

    } catch (error) {
        console.error(error);
        weather.style.display = "none";
        errorMsg.style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});