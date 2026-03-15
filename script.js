// Weather App - script.js
// Uses OpenWeatherMap API

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const errorMsg = document.getElementById('errorMsg');
const loadingMsg = document.getElementById('loadingMsg');

const cityNameEl = document.getElementById('cityName');
const countryEl = document.getElementById('country');
const weatherIconEl = document.getElementById('weatherIcon');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const feelsLikeEl = document.getElementById('feelsLike');

const weatherIcons = {
  'Clear': '☀️',
  'Clouds': '☁️',
  'Rain': '🌧️',
  'Drizzle': '🌦️',
  'Thunderstorm': '⛈️',
  'Snow': '🌨️',
  'Mist': '🌫️',
  'Fog': '🌫️',
  'Haze': '🌫️',
};

function showElement(el) { el.classList.remove('hidden'); }
function hideElement(el) { el.classList.add('hidden'); }

async function fetchWeather(city) {
  hideElement(weatherCard);
  hideElement(errorMsg);
  showElement(loadingMsg);

  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=vi`
    );

    const data = await response.json();

    hideElement(loadingMsg);

    if (!response.ok) {
      showElement(errorMsg);
      errorMsg.textContent = data.message === 'city not found'
        ? 'Không tìm thấy thành phố. Vui lòng kiểm tra lại tên!'
        : 'Có lỗi xảy ra. Vui lòng thử lại!';
      return;
    }

    displayWeather(data);
    showElement(weatherCard);

  } catch (error) {
    hideElement(loadingMsg);
    showElement(errorMsg);
    errorMsg.textContent = 'Không thể kết nối. Kiểm tra kết nối mạng!';
  }
}

function displayWeather(data) {
  const { name, sys, main, weather, wind } = data;
  const weatherMain = weather[0].main;

  cityNameEl.textContent = name;
  countryEl.textContent = sys.country;
  weatherIconEl.textContent = weatherIcons[weatherMain] || '🌡️';
  temperatureEl.textContent = `${Math.round(main.temp)}°C`;
  descriptionEl.textContent = weather[0].description;
  humidityEl.textContent = `${main.humidity}%`;
  windSpeedEl.textContent = `${wind.speed} m/s`;
  feelsLikeEl.textContent = `${Math.round(main.feels_like)}°C`;
}

searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) fetchWeather(city);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
  }
});

// Default city on load
fetchWeather('Ho Chi Minh City');
