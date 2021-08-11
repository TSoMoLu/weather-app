function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#main-temperature");
  temp.innerHTML = `${currentTemp}°C`;
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
}

let dateTime = document.querySelector("#date-time");
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  dateTime.innerHTML = `${day} ${hour}:0${minutes}`;
} else if (hour < 10) {
  dateTime.innerHTML = `${day} 0${hour}:${minutes}`;
} else {
  dateTime.innerHTML = `${day} ${hour}:${minutes}`;
}

navigator.geolocation.getCurrentPosition(showPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityChange);

let button = document.querySelector("#current-btn");
button.addEventListener("click", showPositionEvent);
