import { Request, Response } from 'express';
import axios from 'axios';
import { constructWeatherData } from '../services/weatherService';
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const getWeather = async (req: Request, res: Response): Promise<void> => {
    const { city } = req.query;
    if (!city) res.status(400).json({ error: 'City is required' });
    else{
        try {
            const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&cnt=1`);
            const weatherData = constructWeatherData(response.data)
            res.status(200).json(weatherData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
};

export { getWeather };