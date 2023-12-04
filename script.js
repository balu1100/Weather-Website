const apiKey = '743a86e8296e5c3d10c578f3a2819646';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const locationOutput = document.getElementById('location-output');
const temperatureOutput = document.getElementById('temperature');
const humidityOutput = document.getElementById('humidity');
const locationInput = document.getElementById('city');
const searchBtn = document.querySelector('.btn');
const windSpeedOutput = document.getElementById('wind-speed');
const weatherIcon = document.querySelector('.weather-icon');
const errorOutput = document.getElementById('error-message');

async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appId=${apiKey}`);

        if (!response.ok) {
            // Handle non-successful responses
            const errorMessage = await response.text();
            throw new Error(`City not found. ${errorMessage}`);
        }

        const data = await response.json();

        if (!data || !data.weather || !data.weather[0] || !data.weather[0].main) {
            // Handle unexpected or invalid JSON structure
            throw new Error('Invalid response from the server.');
        }

        const temperature = data.main.temp.toFixed(2) + '°C';
        const humidity = data.main.humidity + '%';
        const windSpeed = data.wind.speed + ' mt/sec';
        const location = data.name;
        const weatherImage = data.weather[0].main.toLowerCase();

        temperatureOutput.innerHTML = temperature;
        humidityOutput.innerHTML = humidity;
        windSpeedOutput.innerHTML = windSpeed;
        locationOutput.innerHTML = location;
        weatherIcon.src = `./weather-pack/${weatherImage}.png`;
        errorOutput.style.display = 'none';

    } catch (error) {
        console.error('Error fetching weather data:', error);

        // Display error message
        errorOutput.innerHTML = 'An error occurred while fetching weather data. Please try again with the correct Location.';
        errorOutput.style.display = 'block';

        // Clear weather data
        temperatureOutput.innerHTML = '--°C';
        humidityOutput.innerHTML = '--%';
        windSpeedOutput.innerHTML = '-- mt/sec';
        locationOutput.innerHTML = 'Location';
        weatherIcon.src = ''; // 
    }
}

searchBtn.addEventListener('click', () => {
    getWeather(locationInput.value);
});
