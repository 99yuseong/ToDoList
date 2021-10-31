const weatherSection = document.querySelector(".weatherSection");
const weather = document.querySelector(".weatherSection span:first-child");
const city = document.querySelector(".weatherSection span:last-child");
const API_KEY = "471c49127ef18894ae534fcbbfd1652e";

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
            weatherSection.classList.add(`${data.weather[0].main}`);
        });
}

function onGeoError() {
    alert("Can't find you. No weather data");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
