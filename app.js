function defaultSearch(city) {
  let cityValue = document.querySelector("h1");
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;

  cityValue.innerHTML = city;

  axios.get(apiUrl).then(function (response1) {
    // Handle the responses separately in the provided functions
    showTemp(response1);
    displayForecast(response1);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityValue = document.querySelector("h1");
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${key}&units=metric`;

  cityValue.innerHTML = city.value;

  axios
    .get(apiUrl)
    // Add another axios request here as needed

    .then(function (response1) {
      // Handle the responses separately in the provided functions
      showTemp(response1);
      displayForecast(response1);
    });
}
function showTemp(response1) {
  let time = document.querySelector("#time");
  let weatherDescription = document.querySelector("#description");
  let temperature = document.querySelector("#temperature");
  let toFarenheit = document.querySelector("#to-farenheit");
  let toCelcius = document.querySelector("#to-celcius");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  function changeTofarenheit(event) {
    toFarenheit.classList.add("active");
    toCelcius.classList.remove("active");
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML =
      Math.round(Math.round(response1.data.list[0].main.temp) * 1.8) + 32;
  }
  function changeTocelcius(event) {
    event.preventDefault();
    toCelcius.classList.add("active");
    toFarenheit.classList.remove("active");
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(response1.data.list[0].main.temp);
  }

  toCelcius.addEventListener("click", changeTocelcius);
  toFarenheit.addEventListener("click", changeTofarenheit);

  time.innerHTML = dateTime(response1.data.list[0].dt_txt);
  weatherDescription.innerHTML = response1.data.list[0].weather[0].description;
  temperature.innerHTML = Math.round(response1.data.list[0].main.temp);
  humidity.innerHTML = response1.data.list[0].main.humidity;
  wind.innerHTML = Math.round(response1.data.list[0].wind.speed);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response1.data.list[0].weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response1.data.list[0].weather[0].description);
}
function displayForecast(response1) {
  let forecast = response1.data.list;
  //let dayIndex = response.data.list[indexNumber];
  let forecastElement = document.querySelector("#display-forecast");
  let forecastHTML = `<div class="row">`;
  for (index = 0; index < forecast.length; index += 8) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
                    <div class="forecast-day">${countForecastDay(
                      forecast[index].dt * 1000
                    )}</div>
                    <img
                      src="https://openweathermap.org/img/wn/${
                        forecast[index].weather[0].icon
                      }@2x.png"
                      class="forecast-icon"
                      alt="clear-sky"
                    />
                    <div class="forecast-temperatures">
                      <span class="max-temperature">${Math.round(
                        forecast[index].main.temp_max
                      )}º</span
                      ><span class="min-temperature">${Math.round(
                        forecast[index].main.temp_min
                      )}º</span>
                    </div>
                  </div>`;
  }
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function dateTime(timestamp) {
  let today = new Date(timestamp);
  let day = days[today.getDay()];
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes} `;
}
function countForecastDay(timestamp) {
  let currentDay = new Date(timestamp);
  let forecastDay = days[currentDay.getDay() + 1];
  return forecastDay;
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
let key = "9bb3c645e603b5a1074b400fa0498278";
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);

defaultSearch("Tehran");
