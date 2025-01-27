"use client";
// Import necessary hooks and types from React
import { useState, ChangeEvent, FormEvent } from "react";

// Import custom UI components from the UI directory
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Import icons from the Lucide React library
import { CloudIcon, DropletIcon, ThermometerIcon, WindIcon } from "lucide-react";

import { WeatherData } from "@/types/weather";
import axios from 'axios';

export default function WeatherComponent() {
    // State hooks for managing location input, weather data, error messages, and loading state
    const [location, setLocation] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchWeather = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/api/weather?city=${location}`);
            setWeather(response.data);
            setError('')
        } catch (e : any) {
            const error = e?.response?.data?.error
            if (error) {
                setError(error)
            }
            else{
                setError('Failed to fetch weather data')
            }
        }
        setIsLoading(false)
    };

    // JSX return statement rendering the weather app UI
    return (
        <div className="flex justify-center items-center h-screen">
            {/* Center the card within the screen */}
            <Card className="w-full max-w-md mx-auto text-center">
                {/* Card header with title and description */}
                <CardHeader>
                    <CardTitle>Weather App</CardTitle>
                    <CardDescription>
                        Search for the current weather conditions in your city.
                    </CardDescription>
                </CardHeader>
                {/* Card content including the search form and weather display */}
                <CardContent>
                    {/* Form to input and submit the location */}
                    <form onSubmit={fetchWeather} className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Enter a city name"
                            value={location}
                            onChange={
                                (e: ChangeEvent<HTMLInputElement>) =>
                                    setLocation(e.target.value) // Update location state on input change
                            }
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Search"}{" "}
                            {/* Show "Loading..." text while fetching data */}
                        </Button>
                    </form>
                    {/* Display error message if any */}
                    {error && <div className="mt-4 text-red-500">{error}</div>}
                    {/* Display weather data if available */}
                    {weather && !error && (
                        <div className="mt-4 grid gap-2">
                            {/* Display temperature message with icon */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <ThermometerIcon className="w-6 h-6" />
                                    {weather.temperature}
                                </div>
                            </div>
                            {/* Display humidity message with icon */}
                            <div className="flex items-center gap-2">
                                <DropletIcon className="w-6 h-6 " />
                                <div>{weather.humidity}</div>
                            </div>
                            {/* Display windspeed message with icon */}
                            <div className="flex items-center gap-2">
                                <WindIcon className="w-6 h-6 " />
                                <div>{weather.windspeed}</div>
                            </div>
                            {/* Display weather description message with icon */}
                            <div className="flex items-center gap-2">
                                <CloudIcon className="w-6 h-6 " />
                                <div>{weather.description}</div>
                            </div>

                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}