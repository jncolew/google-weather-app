//Display current date and time
let currentFullDate = document.querySelector(".date");
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getUTCHours();
let min = now.getUTCMinutes();
let day = days[now.getDay()];
let month = months[now.getMonth()];

currentFullDate.innerHTML = `${hour}:${min} ${day}, ${month} ${date}, ${year}`;

//Search Box and Geolocation, API
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "06a3b326ba50be84866bf0cde1b9a484";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".mainTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".condition").innerHTML =
    response.data.weather[0].main;
}
function searchPlace(city) {
  let apiKey = "06a3b326ba50be84866bf0cde1b9a484";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchPlace(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchPlace("New York");
//Convert Fah. to Cel.
function convertToFah(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".mainTemp");
  let temp = tempElement.innerHTML;
  tempElement.innerHTML = 40;
}
function convertToCel(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".mainTemp");
  let temp = tempElement.innerHTML;
  tempElement.innerHTML = 4;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFah);

let celsiuisLink = document.querySelector("#celsius");
celsiuisLink.addEventListener("click", convertToCel);
