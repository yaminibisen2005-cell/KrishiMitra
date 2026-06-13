// src/services/cropService.ts

import api from "./api";

export const getRecommendations = async (
  soilType: string,
  pH: number,
  temp: number,
  rainfall: number,
  location: string
) => {
  const response = await api.post("/api/crop/recommend", {
    soilType, pH, temp, rainfall, location
  });
  return response.data;
};