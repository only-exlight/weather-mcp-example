# Weather Microservice

This project implements a Model Context Protocol (MCP) server that exposes a tool to retrieve the daily weather forecast for a specified city. It leverages external APIs (Open-Meteo) to get geographical coordinates and then fetch weather data.

## ✨ Features

*   **Weather Forecasting:** Provides daily weather details (max/min temperature, precipitation, weather code) for any given city.
*   **Geocoding:** Uses an external service to resolve city names to precise latitude and longitude coordinates.
*   **MCP Integration:** Exposes functionality via the Model Context Protocol for easy integration with AI agents.

## 🚀 Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed on your system.

### Running the Service

The server runs on port 3300 by default, using the Model Context Protocol endpoint `/mcp`.

```bash
npm start
# or
yarn start
```

You should see the following output:
```
Demo MCP Server running on http://localhost:3300/mcp
```

## Usage

For using with Continue CLI see `./continue/README.md`