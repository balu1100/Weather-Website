async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityInput}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.rapidApiKey,
            'X-RapidAPI-Host': config.rapidApiHost,
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateUI(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const location = document.getElementById('location');

    // Update the elements with data from the API response
    const iconCode = data.current.condition.icon.split('/').pop();
    const iconUrl = `https://weatherapi-com.p.rapidapi.com${iconCode}`;

    weatherIcon.src = iconUrl;
    weatherDescription.textContent = data.current.condition.text;
    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
    location.textContent = `Location: ${data.location.name}, ${data.location.country}`;
}
