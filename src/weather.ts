import { fetchWeatherApi } from "openmeteo";
import { getCityCoordinates } from "./geo";

export async function getDailyWeather(lat: number, lon: number) {
  const params = {
    latitude: lat,
    longitude: lon,
    daily: ["temperature_2m_max", "temperature_2m_min", "precipitation_sum", "weathercode"],
    timezone: "auto",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const weather = responses[0];
  const daily = weather.daily()!;

  const result = {
    maxTemp: daily.variables(0)!.valuesArray()![0],
    minTemp: daily.variables(1)!.valuesArray()![0],
    precipitation: daily.variables(2)!.valuesArray()![0],
    weatherCode: daily.variables(3)!.valuesArray()![0],
  };

  return result;
}

export async function getDailyWeatherByCity(city: string) {
  const { latitude, longitude } = await getCityCoordinates(city);
  return getDailyWeather(latitude, longitude);
}
