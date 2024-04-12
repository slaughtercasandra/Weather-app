const apiKey = '91ddb08cd7e973fd6416621b8fe4b84f';

// Get the form element
const cityForm = document.getElementById('cityForm');

// Add event listener for form submission
cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityInput = document.getElementById('cityinput').value;
    getData(cityInput);
});

// Function to get weather data
const getData = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            getWeather(data);
            getForecast(city); // Call getForecast after getting weather data
        });
};

const getWeather = (data) => {
    const weatherContainer = document.querySelector('.weatherContainer'); // Corrected class name
    // weatherContainer.innerHTML = ''
  
    const weatherCard = document.createElement('div')
    weatherCard.classList.add('weatherCard'); // Corrected class name
  
    weatherCard.innerHTML = `
        <h2>${data.name}</h2>
        <div class="weathercard">
            <p>Temperature: ${data.main.temp}°</p>
            <p>Humidity: ${data.main.humidity}</p>
            <p>Wind Speed: ${data.wind.speed} </p>
        </div>
    `
  
    weatherContainer.appendChild(weatherCard)
};

const getForecast = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        });
};

const displayForecast = (data) => {
    const forecastContainer = document.querySelector('.forecastContainer'); // Corrected class name
    forecastContainer.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecastCard'); // Corrected class name

        forecastCard.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            <p>${date.toDateString()}</p>
            <p>Temperature: ${forecast.main.temp}°C</p>
            <p>Wind Speed: ${forecast.wind.speed} m/s</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
        `;
      
        forecastContainer.appendChild(forecastCard);
    }
};
