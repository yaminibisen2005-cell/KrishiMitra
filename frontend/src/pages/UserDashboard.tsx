import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { useTranslation, LanguageType } from '../context/LanguageContext';
import { getWeatherData } from '../services/weatherService';
import { getMarketPrices } from '../services/marketService';
import { getRecommendations } from '../services/cropService';
import { getTickets } from '../services/ticketService';
import { MarketPrice, WeatherData, CropRecommendationResult } from '../types';
import MarketCard from '../components/MarketCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  Bell, 
  MapPin, 
  Phone, 
  Calendar, 
  ArrowRight, 
  Wheat, 
  LogOut,
  HelpCircle,
  Languages,
  Check,
  Bot,
  Sparkles
} from 'lucide-react';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();

  // Dashboard states
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [profile, setProfile] = useState<{ village?: string; district?: string; state?: string } | null>(null);
  const [cropPreviews, setCropPreviews] = useState<CropRecommendationResult[]>([]);
  const [topPrices, setTopPrices] = useState<MarketPrice[]>([]);
  const [notifications, setNotifications] = useState<Array<{ id: string; type: string; title: string; body: string; date: string }>>([]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch full farmer profile from local storage
      let city = 'Nagpur, MH';
      let soil = 'Loamy Soil';
      
      if (user) {
        setProfile({
          village: user.village,
          district: user.district,
          state: user.state
        });
        if (user.district) {
          city = `${user.district}, ${user.state ? user.state.substring(0, 2).toUpperCase() : 'IN'}`;
        }
      }

      // 2. Fetch weather diagnostics for the farmer's district
      try {
        const weatherData = await getWeatherData(city);
        setWeather(weatherData);
      } catch (e) {
        try {
          // Fallback to Nagpur weather
          const fallbackWeather = await getWeatherData('Nagpur, MH');
          setWeather(fallbackWeather);
        } catch (innerErr) {
          console.error("Weather completely failed", innerErr);
        }
      }

      // 3. Fetch crop recommendations preview
      try {
        const crops = await getRecommendations(soil, 6.5, 28, 750, city);
        setCropPreviews(crops.slice(0, 2)); // Show top 2 recommendations
      } catch (e) {
        console.error(e);
      }

      // 4. Fetch top 3 market prices
      try {
        const prices = await getMarketPrices();
        setTopPrices(prices.slice(0, 3));
      } catch (e) {
        console.error("Failed to pull market API index", e);
      }

      // 5. Construct custom system alerts and agronomist helpline notifications
      let alerts = [
        {
          id: 'n-001',
          type: 'alert',
          title: t('dashboard.notifSowingTitle'),
          body: t('dashboard.notifSowingBody'),
          date: t('dashboard.today')
        },
        {
          id: 'n-002',
          type: 'tip',
          title: t('dashboard.notifFertilizerTitle'),
          body: t('dashboard.notifFertilizerBody'),
          date: t('dashboard.yesterday')
        }
      ];

      try {
        const tickets = await getTickets();
        const userTickets = tickets.filter(tItem => tItem.farmerName === user?.name || tItem.phone === user?.mobile);
        const solvedInquiries = userTickets.filter(tItem => tItem.status === 'Resolved');

        if (solvedInquiries.length > 0) {
          alerts.unshift({
            id: 'n-reply',
            type: 'support',
            title: t('dashboard.notifReplyTitle'),
            body: t('dashboard.notifReplyBody').replace('{subject}', solvedInquiries[0].subject),
            date: t('dashboard.justNow')
          });
        }
      } catch (err) {
        console.error("Failed to fetch tickets feed", err);
      }

      setNotifications(alerts);

    } catch (error) {
      console.error('Failed to load farmer dashboard indices', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user, language]); // Added language so that static values in lists align smoothly when toggled.

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50/10 flex items-center justify-center font-sans">
        <LoadingSpinner message={t('cropRec.loaderMessage')} size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-emerald-50/20 py-10 md:py-14 min-h-screen font-sans" id="user-dashboard-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header Card */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative overflow-hidden">
          {/* Botanical artistic background */}
          <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none flex items-center">
            <Wheat className="w-80 h-80 rotate-12 translate-x-20" />
          </div>

          <div className="relative z-10 flex-1 min-w-0">
            <span className="bg-emerald-600/60 border border-emerald-500/40 text-emerald-100 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2.5 inline-block">
              🌾 {t('farmerWorkspaceActive')}
            </span>
            <h1 className="text-3xl font-black tracking-tight flex flex-wrap items-center gap-2 break-words">
              <span>{t('namaste')}, {user?.name || 'Kisan Mitra'}!</span>
            </h1>
            <p className="text-emerald-200/80 text-xs md:text-sm mt-1 max-w-xl break-words">
              {t('dashboardSub')}
            </p>

            {/* Profile summary badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4 text-xs font-semibold text-emerald-100/90">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="break-words">{profile?.village || 'Agronomic Hub'}, {profile?.district || 'Nagpur'}, {profile?.state || 'Maharashtra'}</span>
              </span>
              <span className="text-emerald-500/65 hidden sm:inline font-normal">●</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{user?.mobile || '9876543210'}</span>
              </span>
              <span className="text-emerald-500/65 hidden sm:inline font-normal">●</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{user?.loginTime ? new Date(user.loginTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Today'}</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 flex gap-2 relative z-10">
            <button
              onClick={() => {
                logout();
                navigate('/auth');
              }}
              className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold py-2.5 px-4 rounded-xl transition text-xs flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
              id="dashboard-logout-button"
            >
              <LogOut className="w-4 h-4 text-emerald-75 shrink-0" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>

        {/* Dash Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main left column: Weather, Crops, Prices */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Weather Summary */}
            <div className="bg-white rounded-3xl border border-emerald-100/80 p-6 shadow-sm" id="dashboard-weather-widget">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-base md:text-lg text-emerald-950 flex items-center gap-2">
                  <CloudSun className="text-emerald-600 w-5 h-5 text-emerald-700" />
                  <span>{t('districtWeather')} ({profile?.district || 'Nagpur'})</span>
                </h2>
                <Link to="/weather" className="text-emerald-600 font-bold hover:underline text-xs flex items-center gap-1">
                  <span>{t('openFullWeather')}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-700" />
                </Link>
              </div>

              {weather ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
                  <div className="bg-emerald-505 bg-emerald-600/5 border border-emerald-100 p-4 rounded-2xl text-center">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mb-1">{t('dashboard.temperature')}</span>
                    <p className="text-2xl font-black text-emerald-950">{weather.temp}°C</p>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      {weather.condition === 'Sunny' ? t('weather.cond.Sunny') : weather.condition === 'Cloudy' ? t('weather.cond.Cloudy') : weather.condition === 'Rainy' ? t('weather.cond.Rainy') : t('weather.cond.Stormy')}
                    </span>
                  </div>
                  <div className="bg-emerald-600/5 border border-emerald-100 p-4 rounded-2xl text-center">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mb-1">{t('dashboard.humidity')}</span>
                    <p className="text-2xl font-black text-emerald-950">{weather.humidity}%</p>
                    <span className="text-[10px] text-emerald-600 font-medium">{t('dashboard.fineRetention')}</span>
                  </div>
                  <div className="bg-emerald-600/5 border border-emerald-100 p-4 rounded-2xl text-center">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mb-1">{t('dashboard.rainChance')}</span>
                    <p className="text-2xl font-black text-emerald-950">{weather.rainChance}%</p>
                    <span className="text-[10px] text-emerald-600 font-medium">{t('dashboard.precipIndex')}</span>
                  </div>
                  <div className="bg-emerald-600/5 border border-emerald-100 p-4 rounded-2xl text-center">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mb-1">{t('dashboard.windSpeed')}</span>
                    <p className="text-2xl font-black text-emerald-950">{weather.windSpeed} km/h</p>
                    <span className="text-[10px] text-emerald-600 font-medium">{t('dashboard.calmGusts')}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-emerald-900/60 text-center py-4">{t('dashboard.weatherUnavailable')}</p>
              )}
            </div>

            {/* 2. Crop Recommendations Preview */}
            <div className="bg-white rounded-3xl border border-emerald-100/80 p-6 shadow-sm" id="dashboard-crops-widget">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-base md:text-lg text-emerald-950 flex items-center gap-2">
                  <Sprout className="text-emerald-600 w-5 h-5 text-emerald-700" />
                  <span>{t('curatedCrops')}</span>
                </h2>
                <Link to="/crop-recommendation" className="text-emerald-600 font-bold hover:underline text-xs flex items-center gap-1">
                  <span>{t('runSoilAnalysis')}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-700" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cropPreviews.map((cropItem) => (
                  <div key={cropItem.id} className="border border-emerald-100/70 p-4 rounded-2xl bg-slate-50/40 flex gap-4 items-center hover:shadow-sm transition">
                    <img
                      src={cropItem.image}
                      alt={cropItem.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover bg-emerald-100 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-emerald-950 text-sm">
                          {t(`crop.${cropItem.id}.name` as any) || cropItem.name}
                        </h4>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                          {t('dashboard.score')} {cropItem.suitabilityScore}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900/75 mt-0.5 truncate max-w-[200px]">
                        {t(`crop.${cropItem.id}.description` as any) || cropItem.description}
                      </p>
                      <span className="text-[10px] font-bold text-emerald-700 block mt-1">
                        {t('dashboard.expectedYield')} {t(`crop.${cropItem.id}.expectedYield` as any) || cropItem.expectedYield}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Market Prices Grid Preview */}
            <div className="bg-white rounded-3xl border border-emerald-100/80 p-6 shadow-sm" id="dashboard-prices-widget">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-base md:text-lg text-emerald-950 flex items-center gap-2">
                  <TrendingUp className="text-emerald-600 w-5 h-5 text-emerald-700" />
                  <span>{t('trendingMandiPrices')}</span>
                </h2>
                <Link to="/market-prices" className="text-emerald-600 font-bold hover:underline text-xs flex items-center gap-1">
                  <span>{t('openFullMarket')}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-700" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" id="dashboard-prices-grid">
                {topPrices.map((pItem) => (
                  <MarketCard key={pItem.id} item={pItem} />
                ))}
              </div>
            </div>

          </div>

          {/* Right column: Interactive Language Card, Notifications & Helpline */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 0. Language Settings & Profile Switch Card */}
            <div className="bg-white rounded-3xl border border-emerald-100 p-6 md:p-8 shadow-sm" id="dashboard-language-card">
              <h3 className="font-extrabold text-base md:text-lg text-emerald-950 flex items-center gap-2 mb-4 border-b border-emerald-50 pb-4">
                <Languages className="text-emerald-600 w-5 h-5 text-emerald-700" />
                <span>{t('languageSettings')}</span>
              </h3>
              
              <div className="space-y-3">
                <p className="text-xs text-emerald-900/60 leading-relaxed font-semibold">
                  {t('dashboard.langDesc')}
                </p>

                <div className="grid grid-cols-1 gap-2.5 mt-4">
                  {[
                    { code: 'en' as LanguageType, name: 'English', nativeName: 'English', flag: '🇬🇧' },
                    { code: 'hi' as LanguageType, name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
                    { code: 'mr' as LanguageType, name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' }
                  ].map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-emerald-50/10 hover:bg-emerald-50/40 text-emerald-950 border-emerald-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-black">{lang.flag}</span>
                          <span>{lang.name} ({lang.nativeName})</span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Notifications and Alerts Feed */}
            <div className="bg-white rounded-3xl border border-emerald-100 p-6 md:p-8 shadow-sm flex flex-col justify-between" id="dashboard-notifs-widget">
              <div>
                <h3 className="font-extrabold text-base md:text-lg text-emerald-950 flex items-center gap-2 mb-6 border-b border-emerald-50 pb-4">
                  <Bell className="text-emerald-600 w-5 h-5 text-emerald-700" />
                  <span>{t('kisanAdvisoryFeed')}</span>
                </h3>

                <div className="space-y-4">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 rounded-2xl border text-xs relative ${
                        notif.type === 'support'
                          ? 'bg-amber-500/10 border-amber-200'
                          : notif.type === 'alert'
                          ? 'bg-emerald-500/5 border-emerald-100'
                          : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <span className="absolute top-3 right-3 text-[9px] text-emerald-900/40 uppercase tracking-widest font-bold">
                        {notif.date}
                      </span>
                      
                      <p className="font-extrabold text-emerald-950 text-sm pr-12 mb-1">{notif.title}</p>
                      <p className="text-emerald-900/75 leading-relaxed font-semibold">{notif.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-50 text-center">
                <p className="text-[10px] text-emerald-900/40 font-medium">
                  {t('dashboard.istNote')}
                </p>
              </div>
            </div>

            {/* KrishiMitra AI Assistant Dashboard Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-emerald-950 to-emerald-950 rounded-3xl p-6 text-white shadow-md flex flex-col gap-4 relative overflow-hidden" id="dashboard-ai-banner">
              {/* background vector decors */}
              <div className="absolute right-[-10px] bottom-[-10px] opacity-10">
                <Bot className="w-24 h-24 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div className="bg-emerald-600/30 text-emerald-300 w-10 h-10 rounded-xl flex items-center justify-center border border-emerald-505/10">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full px-2.5 py-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Interactive AI</span>
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-base mb-1">
                  {t('aiChatbot') || "AI Assistant"} (KrishiMitra AI)
                </h4>
                <p className="text-xs text-emerald-100/70 leading-relaxed font-semibold">
                  {t('chatbot.subtitle') || "Ask questions about crops, diseases, fertilizers, weather, market prices, and government schemes immediately."}
                </p>
              </div>
              <button
                onClick={() => navigate('/chatbot')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition mt-1 self-start cursor-pointer shadow-sm hover:shadow active:scale-95"
              >
                <span>Ask AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-100" />
              </button>
            </div>

            {/* Quick Helpline Support Shortcut */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-6 text-white shadow-sm flex flex-col gap-4">
              <div className="bg-white/10 text-emerald-300 w-10 h-10 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-base mb-1">{t('directHelpline')}</h4>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {t('helplineDesc')}
                </p>
              </div>
              <button
                onClick={() => navigate('/market-prices')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition mt-2 self-start cursor-pointer"
              >
                <span>{t('writeMessage')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-100" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
