/**
 * Represents information about a city.
 */
export interface ICityInfo {
  id?: number;
  name: string;
  country: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  population?: number;
}

/**
 * Retrieves the coordinates of a city.
 * @param {string} city The name of the city to search for.
 * @returns {Promise&lt;CityInfo&gt;} A promise that resolves to the city's coordinates and information.
 * @throws {Error} If the city is not found or if there is an error fetching the data.
 */
export async function getCityCoordinates(city: string): Promise<ICityInfo> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();

  if (!data.results?.length) {
    throw new Error(`City "${city}" not found`);
  }

  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}
