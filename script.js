const apiKey = '5303d271498c134548465ba93965c316';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.createElement('img'); 

weatherIconElement.id = 'weatherIcon';
document.querySelector('.weather-info').appendChild(weatherIconElement);

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
    locationInput.value = ''
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            const iconCode = data.weather[0].icon; 
            weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; 
            weatherIconElement.alt = data.weather[0].description; 
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
