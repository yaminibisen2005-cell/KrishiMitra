import api from "./api";
import { MarketPrice } from "../types";

export const getMarketPrices = async (): Promise<MarketPrice[]> => {
  const response = await api.get("/api/market");
  return response.data;
};

export const saveMarketPrice = async (price: Omit<MarketPrice, "id">) => {
  const response = await api.post("/api/market", price);
  return response.data;
};

export const updateMarketPrice = async (id: string, price: Omit<MarketPrice, "id">) => {
  const response = await api.put(`/api/market/${id}`, price);
  return response.data;
};

export const deleteMarketPrice = async (id: string) => {
  const response = await api.delete(`/api/market/${id}`);
  return response.data;
};