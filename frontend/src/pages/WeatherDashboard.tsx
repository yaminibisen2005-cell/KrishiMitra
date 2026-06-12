/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import WeatherCard from '../components/WeatherCard';
import { getWeatherData } from '../services/weatherService';
import { WeatherData } from '../types';
import { CloudRain, Sun, Wind, Droplets, Search, MapPin, Gauge, ShieldAlert, CloudSun, CloudLightning, SunMoon } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function WeatherDashboard() {
  const { t } = useTranslation();

  const [cityInput, setCityInput] = useState('Nagpur, MH');
  const [currentCity, setCurrentCity] = useState('Nagpur, MH');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async (loc: string) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await getWeatherData(loc);
      setWeather(data);
      setCurrentCity(loc);
    } catch (err: any) {
      setErrorMsg(err.message || t('weather.errFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(currentCity);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      fetchWeather(cityInput.trim());
    }
  };

  const getConditionIcon = (cond: string) => {
    switch (cond) {
      case 'Sunny':
        return <Sun className="w-12 h-12 text-amber-500 animate-spin-slow" />;
      case 'Cloudy':
        return <CloudSun className="w-12 h-12 text-emerald-800" />;
      case 'Rainy':
        return <CloudRain className="w-12 h-12 text-emerald-55 text-emerald-600 animate-bounce" />;
      case 'Stormy':
        return <CloudLightning className="w-12 h-12 text-amber-600" />;
      default:
        return <SunMoon className="w-12 h-12 text-amber-500" />;
    }
  };

  const getDayIcon = (cond: string) => {
    switch (cond) {
      case 'Sunny':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'Cloudy':
        return <CloudSun className="w-6 h-6 text-emerald-700" />;
      case 'Rainy':
        return <CloudRain className="w-6 h-6 text-emerald-605 text-emerald-600" />;
      case 'Stormy':
        return <CloudLightning className="w-6 h-6 text-amber-600" />;
      default:
        return <SunMoon className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="bg-emerald-50/20 py-12 md:py-16 min-h-screen" id="weather-dashboard-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12" id="weather-header">
          <div>
            <span className="inline-flex bg-emerald-100 text-emerald-850 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              ⛈️ {t('weather.climateAnalytics')}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight mb-2">
              {t('weather.title')}
            </h1>
            <p className="text-emerald-900/75 text-sm md:text-base max-w-xl">
              {t('weather.subtitle')}
            </p>
          </div>

          {/* Form Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:max-w-md" id="weather-city-search">
            <div className="relative flex-grow flex items-center">
              <MapPin className="absolute left-3 w-4 h-4 text-emerald-75 text-emerald-650" />
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder={t('weather.placeholder')}
                className="w-full bg-white text-emerald-950 border border-emerald-200 pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 hover:border-emerald-300"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-350 text-white font-bold px-5 rounded-xl transition text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{t('weather.btnSearch')}</span>
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="bg-white rounded-3xl border border-emerald-50 shadow-sm p-16 flex justify-center text-center">
            <LoadingSpinner message={`${t('weather.loaderMessage')} ${currentCity}...`} />
          </div>
        )}

        {errorMsg && (
          <ErrorMessage message={errorMsg} onRetry={() => fetchWeather(currentCity)} />
        )}

        {!isLoading && !errorMsg && weather && (
          <div className="space-y-8 animate-fade-in" id="weather-main-analytics">
            
            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Climate Banner details */}
              <div className="lg:col-span-4 bg-gradient-to-br from-emerald-950 to-emerald-900 rounded-3xl p-6 md:p-8 text-white flex flex-col justify-between shadow-md relative overflow-hidden" id="weather-banner-main">
                {/* Decorative bloom */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      {currentCity === 'Nagpur, MH' ? t('weather.cityNagpur') : currentCity}
                    </h2>
                    <span className="text-emerald-300/80 text-xs font-semibold uppercase tracking-widest block mt-1">
                      {t('weather.todayOutlook')}
                    </span>
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-white/5">
                    {t('weather.liveBadge')}
                  </div>
                </div>

                <div className="flex items-center gap-6 my-4 select-none">
                  {getConditionIcon(weather.condition)}
                  <div>
                    <div className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-white">
                      {weather.temp}°C
                    </div>
                    <p className="text-lg font-bold text-emerald-300">
                      {t(`weather.cond.${weather.condition.toLowerCase()}` as any) || weather.condition}
                    </p>
                  </div>
                </div>

                <div className="border-t border-emerald-800/80 pt-6 mt-6 grid grid-cols-2 gap-4 text-xs md:text-sm text-emerald-200/90 font-medium">
                  <div>
                    <span className="text-emerald-400 font-extrabold uppercase tracking-wider text-[10px] block mb-0.5">{t('weather.uvIndex')}</span>
                    <span className="text-white font-bold">{weather.uvIndex} ({t('weather.uvValue')})</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 font-extrabold uppercase tracking-wider text-[10px] block mb-0.5">{t('weather.barometric')}</span>
                    <span className="text-white font-bold">{weather.pressure}</span>
                  </div>
                </div>
              </div>

              {/* Climate parameters card matrix */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6" id="weather-cards-matrix">
                <WeatherCard
                  id="humidity"
                  icon={Droplets}
                  label={t('weather.humidityLabel')}
                  value={`${weather.humidity}%`}
                  description={t('weather.humidityHelp')}
                  colorClass="bg-emerald-50 text-emerald-850"
                />
                
                <WeatherCard
                  id="rainchance"
                  icon={CloudRain}
                  label={t('weather.rainChanceLabel')}
                  value={`${weather.rainChance}%`}
                  description={t('weather.rainChanceHelp')}
                  colorClass="bg-emerald-50 text-emerald-850"
                />

                <WeatherCard
                  id="windspeed"
                  icon={Wind}
                  label={t('weather.windSpeedLabel')}
                  value={`${weather.windSpeed} km/h`}
                  description={t('weather.windSpeedHelp')}
                  colorClass="bg-emerald-50 text-emerald-850"
                />

                <WeatherCard
                  id="soilmoist"
                  icon={Gauge}
                  label={t('weather.soilMoistureLabel')}
                  value={t('weather.soilMoistureValue')}
                  description={t('weather.soilMoistureHelp')}
                  colorClass="bg-emerald-50 text-emerald-850"
                />
              </div>

            </div>

            {/* Weather Alerts / Agronomist Tip */}
            {weather.rainChance >= 75 && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm" id="climate-hazard-alert">
                <div className="bg-amber-100 p-2.5 rounded-xl text-amber-700 flex-shrink-0 animate-bounce">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-amber-950 uppercase tracking-widest mb-1">
                    {t('weather.alertTitle')}
                  </h4>
                  <p className="text-amber-900/80 text-xs md:text-sm leading-relaxed text-justify">
                    {t('weather.alertDesc').replace('{rainChance}', weather.rainChance.toString()).replace('{currentCity}', currentCity === 'Nagpur, MH' ? t('weather.cityNagpur') : currentCity)}
                  </p>
                </div>
              </div>
            )}

            {/* Seven-Day Forecast */}
            <div className="bg-white rounded-3xl border border-emerald-100/70 p-6 md:p-8 shadow-sm" id="weekly-forecast-card">
              <h3 className="text-lg font-bold text-emerald-950 mb-6">
                {t('weather.forecastTitle')}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {weather.weeklyForecast.map((fc, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-emerald-50/20 hover:bg-emerald-50 border border-emerald-100/50 p-4 rounded-2xl text-center transition duration-200"
                    id={`forecast-day-${fc.day.toLowerCase()}`}
                  >
                    <span className="text-xs font-bold text-emerald-950 mb-2 uppercase tracking-wide">
                      {t(`weather.day.${fc.day.toLowerCase()}` as any) || fc.day}
                    </span>
                    
                    <div className="p-2 mb-2 bg-white rounded-xl shadow-sm">
                      {getDayIcon(fc.condition)}
                    </div>

                    <span className="text-base font-extrabold text-emerald-950">
                      {fc.temp}°C
                    </span>

                    <span className="text-[10px] font-semibold text-emerald-900/60 leading-none mt-1">
                      {t(`weather.cond.${fc.condition.toLowerCase()}` as any) || fc.condition}
                    </span>

                    <div className="mt-3 flex items-center gap-0.5 text-[10px] text-emerald-600 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-100/50">
                      <CloudRain className="w-3 h-3 text-emerald-550 text-emerald-500" />
                      <span>{fc.rainChance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
