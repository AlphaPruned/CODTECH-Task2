document.getElementById('searchBtn').addEventListener('click', getWeather);
document.getElementById('anotherCityBtn').addEventListener('click', resetApp);

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        showError('Please enter a city name.');
        return;
    }
    
    const apiKey = await fetchApiKey();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';
            if (data.cod === 200) {
                updateWeatherInfo(data);
                document.querySelector('.search').style.display = 'none';
                document.getElementById('weatherInfo').style.display = 'grid';
                document.getElementById('anotherCityBtn').style.display = 'block';
            } else {
                showError(data.message);
            }
        })
        .catch(() => {
            document.getElementById('loading').style.display = 'none';
            showError('An error occurred while fetching the data.');
        });
}

async function fetchApiKey() {
    const response = await fetch('/getApiKey');
    const data = await response.json();
    return data.apiKey;
}

function updateWeatherInfo(data) {
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const descriptionIcon = document.getElementById('descriptionIcon');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const pressure = document.getElementById('pressure');

    if (cityName) cityName.innerText = data.name;
    if (temperature) temperature.innerText = `Temperature: ${data.main.temp}°C`;
    if (description) description.innerText = `Description: ${data.weather[0].description}`;
    if (descriptionIcon) descriptionIcon.className = getWeatherIcon(data.weather[0].main);
    if (humidity) humidity.innerHTML = `<i class="fas fa-tint"></i> ${data.main.humidity}%`;
    if (wind) wind.innerHTML = `<i class="fas fa-wind"></i> ${data.wind.speed} m/s`;
    if (pressure) pressure.innerHTML = `<i class="fas fa-tachometer-alt"></i> ${data.main.pressure} hPa`;
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
}

function getWeatherIcon(weatherType) {
    switch (weatherType) {
        case 'Clear':
            return 'fas fa-sun';
        case 'Clouds':
            return 'fas fa-cloud';
        case 'Rain':
            return 'fas fa-cloud-rain';
        case 'Snow':
            return 'fas fa-snowflake';
        case 'Thunderstorm':
            return 'fas fa-poo-storm';
        case 'Drizzle':
            return 'fas fa-cloud-showers-heavy';
        case 'Atmosphere':
            return 'fas fa-smog';
        default:
            return 'fas fa-cloud';
    }
}

function resetApp() {
    document.querySelector('.search').style.display = 'flex';
    document.getElementById('weatherInfo').style.display = 'none';
    document.getElementById('anotherCityBtn').style.display = 'none';
    document.getElementById('city').value = '';
}
