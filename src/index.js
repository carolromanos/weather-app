function formatDate(date) {
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
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function displayWeatherCondition(response){
  console.log(response.data);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(response.data.main.temp);
  document.querySelector(`#humidity`).innerHTML = Math.round(response.data.main.humidity);
  document.querySelector(`#wind`).innerHTML = Math.round(response.data.wind.speed);
  document.querySelector(`#description`).innerHTML = response.data.weather[0].main;

}

function searchCity(city){
  let apiKey = `86a4983bb39069196d07d3e7feab9d28`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = `86a4983bb39069196d07d3e7feab9d28`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeatherCondition);
}

function getCurrentLocation (event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 28;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 82;
}

let currentTime = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#searchCity-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusLimk = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

celsiusLimk.addEventListener("click", convertToCelsius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentLocationButoon = document.querySelector("#current-location-button");

currentLocationButoon.addEventListener("click", getCurrentLocation);