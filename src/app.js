
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
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    celsiusTemperature = response.data.main.temp;
}

function search(city) {
    let apiKey = "9f19ccbb495d9cacd63f236963dafe78";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
   let units = "metric";
  let apiUrlLink = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "9f19ccbb495d9cacd63f236963dafe78";
  let apiUrl = `${apiUrlLink}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let buttonLocation = document.querySelector("#button-location");
buttonLocation.addEventListener("click", currentLocation);

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrnheit(event) {
    event.preventDefault();
    let fahrnheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrnheitTemperature);
}
function displayCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}


let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrnheitUnit = document.querySelector("#fahrnheit-unit");
fahrnheitUnit.addEventListener("click", displayFahrnheit);
let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", displayCelsius);

let celsiusTemperature = null;

search("Mariupol");