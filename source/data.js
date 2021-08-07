let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

city = prompt("Enter a city...");
city = city.toLowerCase().trim();

if (city === "paris") {
  let degrees = Math.floor(weather["paris"].temp);
  let far = degrees * (9 / 5) + 32;
  let farenheit = Math.floor(far);
  let hum = weather["paris"].humidity;
  city = city.slice(0, 1).toUpperCase() + city.substring(1);
  alert(
    `It is currently ${degrees}°C (${farenheit}°F) in ${city} with a humidity of ${hum}%`
  );
} else if (city === "tokyo") {
  let degrees = Math.floor(weather["tokyo"].temp);
  let far = degrees * (9 / 5) + 32;
  let farenheit = Math.floor(far);
  let hum = weather["tokyo"].humidity;
  city = city.slice(0, 1).toUpperCase() + city.substring(1);
  alert(
    `It is currently ${degrees}°C (${farenheit}°F) in ${city} with a humidity of ${hum}%`
  );
} else if (city === "lisbon") {
  let degrees = Math.floor(weather["lisbon"].temp);
  let far = degrees * (9 / 5) + 32;
  let farenheit = Math.floor(far);
  let hum = weather["lisbon"].humidity;
  city = city.slice(0, 1).toUpperCase() + city.substring(1);
  alert(
    `It is currently ${degrees}°C (${farenheit}°F) in ${city} with a humidity of ${hum}%`
  );
} else if (city === "san francisco") {
  let degrees = Math.floor(weather["san francisco"].temp);
  let far = degrees * (9 / 5) + 32;
  let farenheit = Math.floor(far);
  let hum = weather["san francisco"].humidity;
  city =
    city.slice(0, 1).toUpperCase() +
    city.substring(1, 3) +
    " " +
    city.slice(4, 5).toUpperCase() +
    city.substring(5);
  alert(
    `It is currently ${degrees}°C (${farenheit}°F) in ${city} with a humidity of ${hum}%`
  );
} else if (city === "moscow") {
  let degrees = Math.floor(weather["moscow"].temp);
  let far = degrees * (9 / 5) + 32;
  let farenheit = Math.floor(far);
  let hum = weather["moscow"].humidity;
  city = city.slice(0, 1).toUpperCase() + city.substring(1);
  alert(
    `It is currently ${degrees}°C (${farenheit}°F) in ${city} with a humidity of ${hum}%`
  );
} else {
  alert(
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/"
  );
}
