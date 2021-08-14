function chooseIcon(icon) {
  switch (icon) {
    case "01d":
    case "01n":
      return "./images/01.png";
      break;
    case "02d":
    case "02n":
      return "./images/02.png";
      break;
    case "03d":
    case "03n":
    case "04n":
    case "04d":
      return "./images/03.png";
      break;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return "./images/04.png";
      break;
    case "11d":
    case "11n":
      return "./images/05.png";
      break;
    case "13d":
    case "13n":
      return "./images/06.png";
      break;
    case "50d":
    case "50n":
      return "./images/07.png";
      break;
    default:
      return "./images/01.png";
      break;
  }
}

//Convert current date and time
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

//Convert dt to day of the week for forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//HTML in JS to create forecast in a loop
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
              <img src=${chooseIcon(forecastDay.weather[0].icon)} alt=${
          forecastDay.weather[0].description
        } class="forecast-image" />
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

//API call for daily forecast using function above
function getForecast(coordinates) {
  let apiKey = "ffeb16c2d5b651aa562f048e606b7089";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

//Show weather details / get forecast
function showWeatherDetails(response) {
  celsiusTemperature = response.data.main.temp;
  let currentCity = response.data.name;
  let weather = response.data.weather[0].description;

  let temp = document.querySelector("#main-temperature");
  let city = document.querySelector("#main-city");
  let conditions = document.querySelector("#conditions");
  let date = document.querySelector("#date-time");
  let weatherIcon = document.querySelector("#main-weather-image");

  temp.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = currentCity;
  conditions.innerHTML = weather;
  date.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute("src", chooseIcon(response.data.weather[0].icon));
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//Show all weather details for current location
function showPosition(position) {
  let apiKey = "ffeb16c2d5b651aa562f048e606b7089";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherDetails);
}

//Implement above function at the click of current button
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
  axios.get(apiUrl).then(showWeatherDetails);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherDetails);
}

search("Lagos");

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityChange);

let button = document.querySelector("#current-btn");
button.addEventListener("click", showPositionEvent);
