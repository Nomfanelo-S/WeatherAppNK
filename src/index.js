function refreshWeather(response) {
  let currentTemperatureElement = document.querySelector(
    `#current-temperature-value`
  );
  console.log(response.data);
  let currentCityElement = document.querySelector(`#current-city`);
  let temperature = response.data.temperature.current;
  let weatherDescription = document.querySelector(`#weather-description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windSpeedElement = document.querySelector(`#wind`);
  let currentDateElement = document.querySelector(`#current-date`);
  let date = new Date(response.data.time * 1000);
  let iconImageElement = document.querySelector(`#icon`);

  currentDateElement.innerHTML = formateDate(date);
  currentCityElement.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  iconImageElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="current-temperature-icon" id="current-temperature-icon">`;

  currentTemperatureElement.innerHTML = Math.round(temperature);
}
function formateDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = `083bfotb109a4cdefa3925a78a10a2f3`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function searchEngine(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let currentCityElement = document.querySelector("#current-city");

  searchCity(searchInputElement.value);
}
function forecastDisplay() {
  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-details">
   <div class="forecast-day">${day}</div>
    <div class="forecast-icon">🌤️</div>
    <div class="forecast-temperatures"><strong>15</strong>14</div>
    </div>
    `;
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchEngine);

searchCity("Johannesburg");
forecastDisplay();
