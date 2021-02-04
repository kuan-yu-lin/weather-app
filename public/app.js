const searchbox = document.querySelector('.search-box');
if (searchbox) {
    searchbox.addEventListener("keypress", setQuery);
};

async function setQuery(evt) {
    if (evt.keyCode == 13) {
        const city = searchbox.value;
        const city_search = `city_search/${city}`;
        const response = await fetch(city_search);
        const city_json = await response.json();
        await displayResults(city_json);
        //console.log(city_json);
    }
};

function displayResults(weather) {
    //console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hiLow = document.querySelector('.current .hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C / ${Math.round(weather.main.temp_max)}&deg;C`;
};

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let date = d.getDate();
    let day = days[d.getDay()];

    return `${year} ${month} ${date} ${day}`;
};

window.addEventListener("load",  () => {
    if('geolocation' in navigator) {
        console.log("geolocation is available");
        navigator.geolocation.getCurrentPosition(async position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const api_url = `weather/${lat},${lon}`;
          const response = await fetch(api_url);
          const json = await response.json();
          await displayResults(json);
          //console.log(json);
        });
    } else {
        console.log("geolocation is not available");
    }
});

defaultWeather();

async function defaultWeather() {
    const default_data = `/default_data`;
    const response = await fetch(default_data);
    const default_json = await response.json();
    console.log(default_json);
    await displayResults(default_json);
};
