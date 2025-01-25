const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search input');
const removeIcon = document.querySelector('.remove-icon');
const weatherIcon = document.querySelector('.Weather-icon');
const errorMessage = document.querySelector('.error'); // Assuming you have an error message element

const apikey = 'e6f2345663e2db7fba0369e500485718';
const apiurl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const defaultCity = 'Bangalore';
let isCelsius = true; // Default is Celsius

// Display default weather data on page load
displayWeatherForDefaultCity();

// Function to check weather for a given city
async function checkWeather(city) {
  if (!city) return; // Do nothing if the input is empty

  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    const data = await response.json();
    let shortMessage = '';

    document.querySelector('.city').innerHTML = data.name;
    let temperature = Math.round(data.main.temp);
    document.querySelector('.temp').innerHTML = isCelsius
      ? `${temperature}°C`
      : `${Math.round((temperature * 9) / 5 + 32)}°F`;
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    switch (data.weather[0].main) {
      case 'Clouds':
        weatherIcon.src = 'images/clouds.png';
        shortMessage = "It's a cloudy day!";
        break;
      case 'Clear':
        weatherIcon.src = 'images/clear.png';
        shortMessage = 'Clear weather.';
        break;
      case 'Rain':
        weatherIcon.src = 'images/rain.png';
        shortMessage = "Rainy weather, don't forget your umbrella!";
        break;
      case 'Mist':
        weatherIcon.src = 'images/mist.png';
        shortMessage = 'Misty weather, drive carefully!';
        break;
      case 'Drizzle':
        weatherIcon.src = 'images/drizzle.png';
        shortMessage = 'Light rain, you might want to carry a jacket.';
        break;
      default:
        shortMessage = 'Weather conditions are normal.';
        break;
    }

    document.querySelector('.description').innerHTML =
      data.weather[0].description + ` . ${shortMessage}`;
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
}

searchBtn.addEventListener('click', () => {
  const city = searchBox.value.trim();

  // If search box is empty, show error message
  if (!city) {
    errorMessage.style.display = 'block'; // Show error message
    document.querySelector('.weather').style.display = 'none'; // Hide weather section
  } else {
    checkWeather(city); // Otherwise check weather
    errorMessage.style.display = 'none'; // Hide error message if city is valid
  }
});

searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const city = searchBox.value.trim();

    // If search box is empty, show error message
    if (!city) {
      errorMessage.style.display = 'block'; // Show error message
      document.querySelector('.weather').style.display = 'none'; // Hide weather section
    } else {
      checkWeather(city); // Otherwise check weather
      errorMessage.style.display = 'none'; // Hide error message if city is valid
    }
  }
});

function displayWeatherForDefaultCity() {
  checkWeather(defaultCity); // Display weather for the default city
}

removeIcon.addEventListener('click', () => {
  searchBox.value = '';
  document.querySelector('.city').textContent = '';
  document.querySelector('.temp').textContent = '';
  document.querySelector('.humidity').textContent = '';
  document.querySelector('.wind').textContent = '';
  document.querySelector('.description').textContent = '';
  weatherIcon.src = '';
  document.querySelector('.weather').style.display = 'none';
  document.querySelector('.error').style.display = 'none';
  removeIcon.style.display = 'none';
  // Display the default city data when the remove icon is clicked
  displayWeatherForDefaultCity();
});

searchBox.addEventListener('input', () => {
  if (searchBox.value) {
    removeIcon.style.display = 'block';
  } else {
    removeIcon.style.display = 'none';
  }
});

// Temperature Toggle functionality
const toggleButton = document.querySelector('#toggleTemp');

toggleButton.addEventListener('click', () => {
  const tempElement = document.querySelector('.temp');
  let currentTemp = parseFloat(tempElement.textContent);

  if (isCelsius) {
    // Convert Celsius to Fahrenheit
    const fahrenheitTemp = Math.round((currentTemp * 9) / 5 + 32);
    tempElement.textContent = `${fahrenheitTemp}°F`;
    toggleButton.textContent = 'Change to °C'; // Update button text
  } else {
    // Convert Fahrenheit to Celsius
    const celsiusTemp = Math.round(((currentTemp - 32) * 5) / 9);
    tempElement.textContent = `${celsiusTemp}°C`;
    toggleButton.textContent = 'Change to °F'; // Update button text
  }

  isCelsius = !isCelsius; // Toggle the state
});
