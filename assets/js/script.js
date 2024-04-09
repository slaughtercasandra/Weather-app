const apiKey = '91ddb08cd7e973fd6416621b8fe4b84f';


// Get the form element
const cityForm = document.getElementById('cityform');

// Add event listener for form submission
cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityInput = document.getElementById('cityinput').value;
    getWeather(cityInput);
});

// Function to fetch weather data
const getWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            getForecast(city);
        });
};

const displayWeather = (data) => {
  const weatherContainer = document.querySelector('.weathercontainer');
  // weatherContainer.innerHTML = '';

  const weatherCard = document.createElement('div');
  weatherCard.classList.add('weathercard');

  weatherCard.innerHTML = `
      <h2>${data.name}</h2>
      <div class="weatherdetails">
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
      </div>
  `;

  weatherContainer.appendChild(weatherCard);
};