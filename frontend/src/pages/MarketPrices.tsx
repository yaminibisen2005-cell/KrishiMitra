import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import MarketCard from '../components/MarketCard';
import { getMarketPrices } from '../services/marketService';
import { MarketPrice } from '../types';
import { Search, TrendingUp, TrendingDown, Minus, RefreshCw, Calendar, Ban } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function MarketPrices() {
  const { t } = useTranslation();

  const [pricesList, setPricesList] = useState<MarketPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const fetchPrices = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await getMarketPrices();
      setPricesList(data);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {
      setErrorMsg(t('market.errFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  // Filter and Sorting actions
  const filteredPrices = pricesList
    .filter((item) => {
      const categoryKey = `market.cat.${item.category.toLowerCase().replace(/\s+/g, '')}`;
      const cropKey = `market.crop.${item.crop.toLowerCase().replace(/\s+/g, '')}`;
      const hubKey = `market.hub.${item.hub.toLowerCase().replace(/\s+/g, '')}`;

      const resolvedCrop = t(cropKey as any) || item.crop;
      const resolvedHub = t(hubKey as any) || item.hub;

      const matchesSearch = resolvedCrop.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            resolvedHub.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        const cropKeyA = `market.crop.${a.crop.toLowerCase().replace(/\s+/g, '')}`;
        const cropKeyB = `market.crop.${b.crop.toLowerCase().replace(/\s+/g, '')}`;
        const labelA = t(cropKeyA as any) || a.crop;
        const labelB = t(cropKeyB as any) || b.crop;
        return labelA.localeCompare(labelB);
      } else if (sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-650 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold text-xs">{t('market.trendUp')}</span>;
      case 'down':
        return <span className="text-red-800 bg-red-100 px-2 py-0.5 rounded-full font-bold text-xs">{t('market.trendDown')}</span>;
      default:
        return <span className="text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full font-bold text-xs">{t('market.stable')}</span>;
    }
  };

  return (
    <div className="bg-emerald-50/20 py-12 md:py-16 min-h-screen" id="market-prices-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top header title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" id="market-prices-header">
          <div>
            <span className="inline-flex bg-emerald-100 text-emerald-850 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              📈 {t('market.liveMandiIndex')}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight mb-2">
              {t('market.title')}
            </h1>
            <p className="text-emerald-900/75 text-sm md:text-base max-w-xl">
              {t('market.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={fetchPrices}
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
              title={t('market.btnRefreshTooltip')}
              id="refresh-market-feed"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('market.btnRefresh')}</span>
            </button>
            {lastRefreshed && (
              <div className="flex items-center gap-1 text-[11px] text-emerald-900/60 font-semibold uppercase">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('market.lastRefreshedToday')} {lastRefreshed}</span>
              </div>
            )}
          </div>
        </div>

        {/* Filters Panel bar */}
        <div className="bg-white rounded-2xl border border-emerald-100/70 p-5 mb-8 shadow-sm" id="market-filters-panel">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Left: search input */}
            <div className="relative flex-grow max-w-md flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-emerald-650" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('market.placeholder')}
                className="w-full bg-white text-emerald-950 border border-emerald-200 pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 hover:border-emerald-300"
              />
            </div>

            {/* Right: filters selector */}
            <div className="flex flex-wrap gap-4 items-center">
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-900 uppercase">{t('market.lblCategory')}</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold rounded-lg px-2.5 py-1.5 outline-none transition focus:border-emerald-600"
                >
                  <option value="All">{t('market.optAllCategories')}</option>
                  <option value="Vegetables">{t('market.cat.vegetables')}</option>
                  <option value="Grains">{t('market.cat.grains')}</option>
                  <option value="Cash Crops">{t('market.cat.cashcrops')}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-900 uppercase">{t('market.lblSortBy')}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold rounded-lg px-2.5 py-1.5 outline-none transition focus:border-emerald-600"
                >
                  <option value="name">{t('market.optSortName')}</option>
                  <option value="price-desc">{t('market.optSortPriceDesc')}</option>
                  <option value="price-asc">{t('market.optSortPriceAsc')}</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* Main Price layout grids */}
        {isLoading && (
          <div className="bg-white rounded-3xl border border-emerald-50 shadow-sm p-16 flex justify-center text-center">
            <LoadingSpinner message={t('market.loaderMessage')} />
          </div>
        )}

        {errorMsg && (
          <ErrorMessage message={errorMsg} onRetry={fetchPrices} />
        )}

        {!isLoading && !errorMsg && (
          <>
            {filteredPrices.length === 0 ? (
              <div className="bg-white border rounded-3xl p-12 text-center flex flex-col items-center gap-4" id="empty-market-state">
                <div className="bg-red-50 text-red-500 p-4 rounded-full">
                  <Ban className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-xl text-emerald-950">{t('market.emptyTitle')}</h3>
                <p className="text-emerald-900/60 text-sm max-w-sm">
                  {t('market.emptyDesc').replace('{searchTerm}', searchTerm)}
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }}
                  className="bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl transition hover:bg-emerald-100 cursor-pointer"
                >
                  {t('market.btnClearFilters')}
                </button>
              </div>
            ) : (
              <div className="space-y-12 animate-fade-in" id="market-views-block">
                
                {/* 1. Grid of individual responsive cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="market-grid-views">
                  {filteredPrices.map((p) => (
                    <MarketCard key={p.id} item={p} />
                  ))}
                </div>

                {/* 2. Unified details comparison table (Only visible on MD/large screens for premium UX) */}
                <div className="hidden md:block bg-white border border-emerald-100 shadow-sm rounded-3xl overflow-hidden" id="market-detail-database-table">
                  <div className="px-6 py-5 border-b border-emerald-50 bg-emerald-500/5">
                    <h3 className="font-bold text-emerald-950 text-base">
                      {t('market.tableTitle')}
                    </h3>
                  </div>
                  
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-emerald-800/5 text-emerald-900 uppercase text-[10px] tracking-widest font-extrabold border-b border-emerald-50">
                        <th className="py-4 px-6">{t('market.thCrop')}</th>
                        <th className="py-4 px-4">{t('market.thHub')}</th>
                        <th className="py-4 px-4">{t('market.thState')}</th>
                        <th className="py-4 px-4">{t('market.thCategory')}</th>
                        <th className="py-4 px-4 text-right">{t('market.thPrice')}</th>
                        <th className="py-4 px-4 text-right">{t('market.thPrevPrice')}</th>
                        <th className="py-4 px-6 text-center">{t('market.thTrend')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-50/50 text-emerald-955 text-emerald-950">
                      {filteredPrices.map((item) => {
                        const cropKey = `market.crop.${item.crop.toLowerCase().replace(/\s+/g, '')}`;
                        const hubKey = `market.hub.${item.hub.toLowerCase().replace(/\s+/g, '')}`;
                        const stateKey = `market.state.${item.state.toLowerCase().replace(/\s+/g, '')}`;
                        const categoryKey = `market.cat.${item.category.toLowerCase().replace(/\s+/g, '')}`;

                        return (
                          <tr key={item.id} className="hover:bg-emerald-50/30 transition duration-100">
                            <td className="py-4.5 px-6 font-extrabold">{t(cropKey as any) || item.crop}</td>
                            <td className="py-4.5 px-4 font-semibold text-emerald-900">{t(hubKey as any) || item.hub}</td>
                            <td className="py-4.5 px-4 font-medium text-emerald-805 text-xs text-emerald-800">{t(stateKey as any) || item.state}</td>
                            <td className="py-4.5 px-4">
                              <span className="bg-emerald-50 text-emerald-850 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                {t(categoryKey as any) || item.category}
                              </span>
                            </td>
                            <td className="py-4.5 px-4 text-right font-black text-emerald-900 text-base">₹{item.price}</td>
                            <td className="py-4.5 px-4 text-right text-emerald-900/60 font-semibold">₹{item.previousPrice}</td>
                            <td className="py-4.5 px-6">
                              <div className="flex items-center justify-center gap-1.5">
                                {getTrendIcon(item.trend)}
                                {getTrendBadge(item.trend)}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
