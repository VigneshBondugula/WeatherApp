import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { WeatherData } from "@/types/weather";
import WeatherComponent from "@/components/weather";

// Mock axios
jest.mock("axios");

// Component test
describe("WeatherComponent", () => {
    it("renders the input field and search button", () => {
        render(<WeatherComponent/>);

        // Check if the input field is present
        const input = screen.getByPlaceholderText(/Enter a city name/i);
        expect(input).toBeInTheDocument();

        // Check if the button is present
        const button = screen.getByRole("button", { name: /search/i });
        expect(button).toBeInTheDocument();
    });
});