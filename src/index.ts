import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { z } from "zod";
import { getDailyWeatherByCity } from "./weather";

const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});

server.registerTool(
  "get-weather-in-city",
  {
    title: "Get weather",
    description:
      "Allows you to get the weather forecast for the next day. Name of city must be in english language, if user use another language, translate it!",
    inputSchema: { city: z.string() },
    outputSchema: {
      result: z.object({
        maxTemp: z.number({ description: "Maximum temperature" }),
        minTemp: z.number({ description: "Minimum temperature" }),
        weatherCode: z.number({
          description: "WMO Weather interpretation codes",
        }),
        precipitation: z.number({
          description: "The amount of impurities measured in millimeters",
        }),
      }),
    },
  },
  async ({ city }) => {
    const result = await getDailyWeatherByCity(city);
    console.log(result);

    return {
      content: [{ type: "text", text: JSON.stringify({ result }) }],
      structuredContent: { result },
    };
  }
);

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  res.on("close", () => {
    transport.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

const port = parseInt(process.env.PORT || "3300");
app
  .listen(port, () => {
    console.log(`Demo MCP Server running on http://localhost:${port}/mcp`);
  })
  .on("error", (error) => {
    console.error("Server error:", error);
    process.exit(1);
  });
