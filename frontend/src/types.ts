/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CropRecommendationResult {
  id: string;
  name: string;
  suitabilityScore: number;
  expectedYield: string;
  profitability: 'High' | 'Medium' | 'Low';
  description: string;
  image: string;
  idealConditions: string;
}

export interface DiseaseDetectionResult {
  disease: string;
  confidence: number;
  cause: string;
  treatment: string;
  notes: string;
}

export interface ForecastDay {
  day: string;
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  rainChance: number;
  humidity: number;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainChance: number;
  windSpeed: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  uvIndex: number;
  pressure: string;
  weeklyForecast: ForecastDay[];
}

export interface MarketPrice {
  id: string;
  crop: string;
  price: number; // in ₹ per quintal
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  hub: string;
  state: string;
  category: 'Vegetables' | 'Grains' | 'Cash Crops';
}
