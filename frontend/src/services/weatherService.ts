/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WeatherData } from '../types';

export async function getWeatherData(location: string = 'Nagpur, MH'): Promise<WeatherData> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!location.trim()) {
    throw new Error('Please enter a valid location to see current crop conditions.');
  }

  // Consistent mock weather based on input location name hash or static real-feel
  const hash = location.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const tempOffset = (hash % 7) - 3; // -3 to +3 variation
  const rainOffset = (hash % 30) - 15; // -15 to +15% variation

  const baseTemp = 32 + tempOffset;
  const baseHumidity = Math.max(40, Math.min(95, 70 + (hash % 15)));
  const baseRainChance = Math.max(0, Math.min(100, 80 + rainOffset));
  const baseWind = Math.max(4, Math.min(25, 10 + (hash % 8)));

  const listConditions: Array<'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy'> = ['Sunny', 'Cloudy', 'Rainy', 'Stormy'];
  const conditionIndex = Math.abs(hash) % listConditions.length;
  const currentCondition = listConditions[conditionIndex];

  return {
    temp: baseTemp,
    humidity: baseHumidity,
    rainChance: baseRainChance,
    windSpeed: baseWind,
    condition: currentCondition,
    uvIndex: 6 + (hash % 4),
    pressure: '1012 hPa',
    weeklyForecast: [
      { day: 'Mon', temp: baseTemp - 1, condition: 'Rainy', rainChance: 85, humidity: baseHumidity + 2 },
      { day: 'Tue', temp: baseTemp, condition: 'Stormy', rainChance: baseRainChance, humidity: baseHumidity },
      { day: 'Wed', temp: baseTemp + 1, condition: 'Cloudy', rainChance: 40, humidity: baseHumidity - 5 },
      { day: 'Thu', temp: baseTemp + 2, condition: 'Sunny', rainChance: 10, humidity: baseHumidity - 12 },
      { day: 'Fri', temp: baseTemp + 1, condition: 'Sunny', rainChance: 15, humidity: baseHumidity - 8 },
      { day: 'Sat', temp: baseTemp - 2, condition: 'Rainy', rainChance: 90, humidity: baseHumidity + 6 },
      { day: 'Sun', temp: baseTemp - 1, condition: 'Cloudy', rainChance: 50, humidity: baseHumidity },
    ]
  };
}
