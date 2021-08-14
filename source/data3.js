function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function showDate(response) {
  let date = document.querySelector("#date-time");
  date.innerHTML = formatDate(response.data.dt * 1000);
}

function showForecast(response) {
  let forecastArray = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastArray.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `     <div class="col-2">
              <div class="week-day">${formatDay(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt=${forecastDay.weather[0].description} class="sun" />
              <div class="forecast-temp">
                <span class="max-temp"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="min-temp"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
            </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ffeb16c2d5b651aa562f048e606b7089";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showMainWeatherImage(response) {
  let weatherIcon = document.querySelector("#main-weather-image");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let currentTemp = Math.round(celsiusTemperature);
  let temp = document.querySelector("#main-temperature");
  temp.innerHTML = currentTemp;
}

function showCity(response) {
  let currentCity = response.data.name;
  let city = document.querySelector("#main-city");
  city.innerHTML = currentCity;
}

function weatherDescription(response) {
  let weather = response.data.weather[0].description;
  let conditions = document.querySelector("#conditions");
  conditions.innerHTML = weather;
}

function showPosition(position) {
  let apiKey = "ffeb16c2d5b651aa562f048e606b7089";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showCity);
  axios.get(apiUrl).then(weatherDescription);
  axios.get(apiUrl).then(showDate);
  axios.get(apiUrl).then(showMainWeatherImage);
}

function showPositionEvent() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function cityChange() {
  event.preventDefault();
  let apiKey = "ffeb16c2d5b651aa562f048e606b7089";
  let city = document.querySelector("#enter-city");
  let cityValue = city.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showCity);
  axios.get(apiUrl).then(weatherDescription);
  axios.get(apiUrl).then(showDate);
  axios.get(apiUrl).then(showMainWeatherImage);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showCity);
  axios.get(apiUrl).then(weatherDescription);
  axios.get(apiUrl).then(showDate);
  axios.get(apiUrl).then(showMainWeatherImage);
}

search("Lagos");

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityChange);

let button = document.querySelector("#current-btn");
button.addEventListener("click", showPositionEvent);
