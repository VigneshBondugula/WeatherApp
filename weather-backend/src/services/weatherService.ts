import { WeatherData } from '../models/weather';

// Parses API response and constructs Weather data
const constructWeatherData = (apiResponse: any) => {
    const { main, weather, wind } = apiResponse.list[0];

    const weatherData: WeatherData = {
        temperature: main.temp,
        humidity: main.humidity,
        windspeed: wind.speed,
        description: weather[0].description,
    };

    return weatherData;
}

export { constructWeatherData };