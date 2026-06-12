import React, { useState, useEffect } from 'react';
import { 
  getSavedMarketPrices, 
  saveMarketPrices, 
  getSavedHelplineTickets, 
  saveHelplineTickets, 
  HelplineTicket 
} from '../services/dbStore';
import { MarketPrice } from '../types';
import { authService } from '../auth/authService';
import { 
  ShieldAlert, 
  TrendingUp, 
  PlusCircle, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Save, 
  CornerDownRight, 
  Settings, 
  Database, 
  User,
  Phone,
  HelpCircle
} from 'lucide-react';
import { SelectInput, NumberInput, TextInput } from '../components/FormInputs';
import { useTranslation } from '../context/LanguageContext';

export default function AdminPanel() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'market' | 'tickets' | 'system'>('market');
  
  // Market states
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [crop, setCrop] = useState('');
  const [price, setPrice] = useState('');
  const [prevPrice, setPrevPrice] = useState('');
  const [hub, setHub] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState<'Vegetables' | 'Grains' | 'Cash Crops'>('Vegetables');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [marketError, setMarketError] = useState('');

  // Ticket states
  const [tickets, setTickets] = useState<HelplineTicket[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  
  // Metrics & notification toast
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setPrices(getSavedMarketPrices());
    setTickets(getSavedHelplineTickets());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // 1. ADD / EDIT EXECUTOR
  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    setMarketError('');

    if (!crop.trim() || !price || !prevPrice || !hub.trim() || !state.trim()) {
      setMarketError(t('adminPanel.mandiFormErrBlanks'));
      return;
    }

    const currentVal = parseFloat(price);
    const prevVal = parseFloat(prevPrice);

    if (isNaN(currentVal) || currentVal <= 0 || isNaN(prevVal) || prevVal <= 0) {
      setMarketError(t('adminPanel.mandiFormErrPositive'));
      return;
    }

    const trend = currentVal > prevVal ? 'up' : currentVal < prevVal ? 'down' : 'stable';

    let updatedList: MarketPrice[];

    if (editingId) {
      // Edit mode
      updatedList = prices.map((item) => 
        item.id === editingId
          ? { ...item, crop: crop.trim(), price: currentVal, previousPrice: prevVal, trend, hub: hub.trim(), state: item.state, category }
          : item
      );
      showToast(t('adminPanel.toastUpdateSuccess'));
    } else {
      // Create mode
      const newItem: MarketPrice = {
        id: `m-custom-${Date.now()}`,
        crop: crop.trim(),
        price: currentVal,
        previousPrice: prevVal,
        trend,
        hub: hub.trim(),
        state: state.trim(),
        category,
      };
      updatedList = [...prices, newItem];
      showToast(t('adminPanel.toastAddSuccess'));
    }

    setPrices(updatedList);
    saveMarketPrices(updatedList);

    // Reset Form fields
    setCrop('');
    setPrice('');
    setPrevPrice('');
    setHub('');
    setState('');
    setCategory('Vegetables');
    setEditingId(null);
  };

  const handleEditClick = (item: MarketPrice) => {
    setEditingId(item.id);
    setCrop(item.crop);
    setPrice(item.price.toString());
    setPrevPrice(item.previousPrice.toString());
    setHub(item.hub);
    setState(item.state);
    setCategory(item.category);
    setMarketError('');
  };

  const handleDeletePrice = (id: string) => {
    const updated = prices.filter((item) => item.id !== id);
    setPrices(updated);
    saveMarketPrices(updated);
    showToast(t('adminPanel.toastDeleteSuccess'));
    if (editingId === id) {
      setEditingId(null);
      setCrop('');
      setPrice('');
      setPrevPrice('');
      setHub('');
      setState('');
    }
  };

  // 2. HELPLINE RESPONSE LOGIC
  const handleTicketReply = (id: string) => {
    const text = replyText[id];
    if (!text || !text.trim()) {
      alert(t('adminPanel.mandiFormErrBlanks'));
      return;
    }

    const updated = tickets.map((t) => 
      t.id === id 
        ? { ...t, status: 'Resolved' as const, adminReply: text.trim() } 
        : t
    );

    setTickets(updated);
    saveHelplineTickets(updated);
    showToast(t('adminPanel.toastReplySuccess'));
    
    // Clear individual reply input state
    setReplyText((prev) => ({ ...prev, [id]: '' }));
  };

  // 3. SYSTEM RESTORE
  const handleFactoryReset = () => {
    if (window.confirm(t('adminPanel.alertConfirmRestore'))) {
      localStorage.removeItem('krishimitra_market_prices');
      localStorage.removeItem('krishimitra_helpline_tickets');
      setPrices(getSavedMarketPrices());
      setTickets(getSavedHelplineTickets());
      showToast(t('adminPanel.toastRestoreSuccess'));
    }
  };

  const categories = [
    { value: 'Vegetables', label: t('market.optVegetables') },
    { value: 'Grains', label: t('market.optGrains') },
    { value: 'Cash Crops', label: t('market.optCashCrops') }
  ];

  return (
    <div className="bg-emerald-50/20 py-12 md:py-16 min-h-screen" id="admin-panel-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
              🛠️ {t('adminPanel.bannerBadge')}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {t('adminPanel.title')}
            </h1>
            <p className="text-emerald-200/80 text-xs md:text-sm mt-1 max-w-xl">
              {t('adminPanel.subtitle')}
            </p>
          </div>
          <div className="bg-emerald-800/40 border border-emerald-700/50 rounded-2xl p-4 flex flex-wrap gap-4 md:gap-6 items-center">
            <div className="text-center font-sans">
              <span className="text-[10px] text-emerald-300 font-extrabold uppercase">{t('adminPanel.metricCrops')}</span>
              <p className="text-xl md:text-2xl font-black text-white leading-none mt-0.5">{prices.length}</p>
            </div>
            <div className="border-l border-emerald-800/80 h-8" />
            <div className="text-center font-sans">
              <span className="text-[10px] text-emerald-300 font-extrabold uppercase">{t('adminPanel.metricQueries')}</span>
              <p className="text-xl md:text-2xl font-black text-amber-300 leading-none mt-0.5">
                {tickets.length}
              </p>
            </div>
            <div className="border-l border-emerald-800/80 h-8" />
            <div className="text-center font-sans">
              <span className="text-[10px] text-emerald-300 font-extrabold uppercase">{t('adminPanel.metricFarmers')}</span>
              <p className="text-xl md:text-2xl font-black text-white leading-none mt-0.5">
                {authService.getTotalFarmersCount()}
              </p>
            </div>
            <div className="border-l border-emerald-800/80 h-8" />
            <div className="text-center font-sans">
              <span className="text-[10px] text-emerald-300 font-extrabold uppercase">{t('adminPanel.metricSessions')}</span>
              <p className="text-xl md:text-2xl font-black text-emerald-300 leading-none mt-0.5">
                {authService.getActiveSessionsCount()}
              </p>
            </div>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-50 animate-fade-in border border-emerald-750">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Dashboard Tabs bar */}
        <div className="flex border-b border-emerald-100 mb-8" id="admin-tabs">
          <button
            onClick={() => setActiveTab('market')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition outline-none cursor-pointer ${
              activeTab === 'market'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-emerald-900/60 hover:text-emerald-900 lg:px-6'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t('adminPanel.tabMandiRates')}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition outline-none cursor-pointer ${
              activeTab === 'tickets'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-emerald-900/60 hover:text-emerald-900 lg:px-6'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t('adminPanel.tabHelpline')}</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition outline-none cursor-pointer ${
              activeTab === 'system'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-emerald-900/60 hover:text-emerald-900 lg:px-6'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t('adminPanel.tabSystem')}</span>
          </button>
        </div>

        {/* 1. TAB: MARKET RATES */}
        {activeTab === 'market' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in" id="market-manager-tab-content">
            
            {/* Form Column */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-emerald-100 shadow-sm p-6">
              <h2 className="text-lg font-extrabold text-emerald-950 mb-6 flex items-center gap-2">
                <PlusCircle className="text-emerald-650 w-5 h-5 text-emerald-700" id="mandi-form-headline-icon" />
                <span>{editingId ? t('adminPanel.mandiFormEditTitle') : t('adminPanel.mandiFormAddTitle')}</span>
              </h2>

              <form onSubmit={handleSavePrice} className="space-y-4">
                <TextInput
                  label={t('adminPanel.mandiFormCropName')}
                  id="crop-name"
                  placeholder="e.g. Tomato, Soybean, Rice"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label={t('adminPanel.mandiFormCurrentRate')}
                    id="price"
                    placeholder="e.g. 2400"
                    unit="₹"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <NumberInput
                    label={t('adminPanel.mandiFormPrevRate')}
                    id="prev-price"
                    placeholder="e.g. 2350"
                    unit="₹"
                    value={prevPrice}
                    onChange={(e) => setPrevPrice(e.target.value)}
                  />
                </div>

                <TextInput
                  label={t('adminPanel.mandiFormMandiHub')}
                  id="mandi-hub"
                  placeholder="e.g. Kalyan APMC, Indore APMC"
                  value={hub}
                  onChange={(e) => setHub(e.target.value)}
                />

                {!editingId && (
                  <TextInput
                    label={t('adminPanel.mandiFormState')}
                    id="mandi-state"
                    placeholder="e.g. Maharashtra, Punjab"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                )}

                <SelectInput
                  label={t('adminPanel.mandiFormCategory')}
                  id="crop-category"
                  options={categories}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                />

                {marketError && (
                  <p className="text-xs font-semibold text-red-500">{marketError}</p>
                )}

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl transition text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingId ? t('adminPanel.mandiFormBtnSaveEdits') : t('adminPanel.mandiFormBtnPublish')}</span>
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setCrop('');
                        setPrice('');
                        setPrevPrice('');
                        setHub('');
                        setState('');
                        setCategory('Vegetables');
                      }}
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 font-semibold px-4 rounded-xl transition text-sm cursor-pointer"
                    >
                      {t('adminPanel.mandiFormBtnCancel')}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden" id="admin-prices-list">
              <div className="px-6 py-5 border-b border-emerald-50 bg-emerald-500/5">
                <h3 className="font-extrabold text-emerald-950 text-base">
                  {t('adminPanel.mandiListTitle')}
                </h3>
              </div>

              <div className="divide-y divide-emerald-50 max-h-[700px] overflow-y-auto">
                {prices.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-emerald-50/20 transition duration-150">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-emerald-950 text-base">{item.crop}</span>
                        <span className="bg-emerald-50 text-emerald-800 text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded">
                          {item.category === 'Vegetables' ? t('market.optVegetables') : item.category === 'Grains' ? t('market.optGrains') : t('market.optCashCrops')}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900/60 font-medium">
                        📍 {item.hub}, {item.state}
                      </p>
                      
                      {/* Price indicators */}
                      <div className="flex items-center gap-4 mt-2 text-xs font-sans">
                        <span className="text-emerald-950 font-extrabold">{t('market.thPrice')}: <span className="text-emerald-700 font-black">₹{item.price}</span></span>
                        <span className="text-emerald-900/40">●</span>
                        <span className="text-emerald-900/70">{t('market.thPrevPrice')}: ₹{item.previousPrice}</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          item.trend === 'up' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : item.trend === 'down'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {item.trend === 'up' ? t('market.upward') : item.trend === 'down' ? t('market.downward') : t('market.stable')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-2 text-emerald-800 hover:bg-emerald-50 rounded-lg transition"
                        title="Edit rate info"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePrice(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete index row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. TAB: TICKETS LIST */}
        {activeTab === 'tickets' && (
          <div className="space-y-6 animate-fade-in" id="helpline-tab-content">
            
            <div className="bg-white rounded-2xl border border-emerald-50 p-5 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl flex-shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <p className="text-emerald-900/75 text-xs md:text-sm leading-relaxed">
                {t('adminPanel.helplineDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="tickets-registry-grid">
              {tickets.map((tItem) => (
                <div 
                  key={tItem.id} 
                  className={`bg-white rounded-3xl border shadow-sm p-6 flex flex-col justify-between relative overflow-hidden transition ${
                    tItem.status === 'Resolved' ? 'border-emerald-100/70 opacity-90' : 'border-amber-200 ring-2 ring-amber-100'
                  }`}
                  id={`ticket-card-${tItem.id}`}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-0 right-0">
                    <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-3 py-1.5 rounded-bl-2xl ${
                      tItem.status === 'Resolved' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {tItem.status === 'Resolved' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t('adminPanel.helplineStatusResolved')}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 animate-spin" />
                          <span>{t('adminPanel.helplineStatusNeedsResponse')}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Header farmer details */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-900/60 font-semibold uppercase tracking-wider mb-2">
                      <User className="w-3.5 h-3.5" />
                      <span>{tItem.farmerName}</span>
                      <span>•</span>
                      <Phone className="w-3 h-3" />
                      <span>{tItem.phone}</span>
                    </div>
                    
                    <h3 className="font-extrabold text-lg text-emerald-950 mb-1">
                      {tItem.subject}
                    </h3>
                    
                    <p className="text-xs text-emerald-900/40 mb-3">{t('adminPanel.helplineLabelSubmitted')} {tItem.date}</p>
                    
                    <div className="bg-emerald-500/5 p-4 rounded-xl text-emerald-900 text-sm italic leading-relaxed">
                      "{tItem.message}"
                    </div>
                  </div>

                  {/* Reply actions */}
                  <div className="border-t border-emerald-50/80 pt-4 mt-auto">
                    {tItem.status === 'Resolved' ? (
                      <div className="flex gap-2 text-xs md:text-sm" id={`resolved-reply-${tItem.id}`}>
                        <div className="text-emerald-700/80 mt-0.5 flex-shrink-0">
                          <CornerDownRight className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-emerald-950 uppercase tracking-widest text-[9px] mb-0.5">{t('adminPanel.helplineLabelAgronomistMsg')}</p>
                          <p className="text-emerald-900 leading-relaxed font-medium">
                            {tItem.adminReply}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3" id={`pending-reply-${tItem.id}`}>
                        <textarea
                          rows={2}
                          value={replyText[tItem.id] || ''}
                          onChange={(e) => setReplyText({ ...replyText, [tItem.id]: e.target.value })}
                          placeholder={t('adminPanel.helplinePlaceholderReply')}
                          className="w-full bg-white text-emerald-950 border border-emerald-200 p-3 rounded-xl text-xs outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/10"
                        />
                        <button
                          onClick={() => handleTicketReply(tItem.id)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition cursor-pointer"
                        >
                          {t('adminPanel.helplineBtnSubmitReply')}
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* 3. TAB: SYSTEM WORKBENCH */}
        {activeTab === 'system' && (
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 md:p-8 space-y-8 animate-fade-in" id="system-tab-content">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Telemetry diagnostics */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-emerald-950 text-base uppercase tracking-widest">
                  {t('adminPanel.systemDiagnosticsTitle')}
                </h3>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-emerald-50/30 p-3 rounded-lg border border-emerald-50">
                    <span className="font-semibold text-emerald-900">{t('adminPanel.systemDatabaseHydration')}</span>
                    <span className="text-emerald-700 font-extrabold uppercase">{t('adminPanel.systemOkActive')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50/30 p-3 rounded-lg border border-emerald-50">
                    <span className="font-semibold text-emerald-900">{t('adminPanel.systemWeatherSync')}</span>
                    <span className="text-emerald-700 font-extrabold uppercase">{t('adminPanel.systemOkSync')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50/30 p-3 rounded-lg border border-emerald-50">
                    <span className="font-semibold text-emerald-900">{t('adminPanel.systemMandiStreams')}</span>
                    <span className="text-emerald-700 font-extrabold uppercase">{t('adminPanel.systemLive')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50/30 p-3 rounded-lg border border-emerald-50">
                    <span className="font-semibold text-emerald-900">{t('adminPanel.systemCacheEngine')}</span>
                    <span className="text-emerald-700 font-extrabold uppercase">{t('adminPanel.systemConnected')}</span>
                  </div>
                </div>
              </div>

              {/* Maintenance Tools */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-emerald-950 text-base uppercase tracking-widest">
                  {t('adminPanel.systemDatabaseUtilsTitle')}
                </h3>
                <p className="text-emerald-900/75 text-xs md:text-sm leading-relaxed">
                  {t('adminPanel.systemDatabaseUtilsDesc')}
                </p>
                <button
                  onClick={handleFactoryReset}
                  className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold py-3 px-6 rounded-xl transition text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Database className="w-4 h-4" />
                  <span>{t('adminPanel.systemBtnRestore')}</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
