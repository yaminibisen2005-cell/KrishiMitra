import api from "./api";

export const getWeatherData = async (city: string) => {
  const response = await api.get(
    "/api/weather/current",
    {
      params: { city }
    }
  );

  const data = response.data;

  return {
    city: data.city,
    temp: data.temperature,
    humidity: data.humidity,
    condition:
      data.condition === "Clouds" ? "Cloudy" : data.condition,

    advisory: data.advisory,

    // Dynamically pull values or fallback
    windSpeed: data.windSpeed || 0,
    rainChance: data.rainChance || 0,
    pressure: data.pressure || "N/A",
    uvIndex: data.uvIndex || 0,

    weeklyForecast: data.weeklyForecast || [
      {
        day: "Mon",
        temp: data.temperature,
        condition: data.condition === "Clouds" ? "Cloudy" : data.condition,
        rainChance: 0
      }
    ]
  };
};