/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SelectInput, NumberInput, TextInput } from '../components/FormInputs';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getRecommendations } from '../services/cropService';
import { CropRecommendationResult } from '../types';
import { Sprout, Check } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function CropRecommendation() {
  const { t } = useTranslation();

  // Form states
  const [soilType, setSoilType] = useState('');
  const [pH, setPh] = useState('');
  const [temp, setTemp] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [location, setLocation] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [recommendations, setRecommendations] = useState<CropRecommendationResult[] | null>(null);

  // Field errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!soilType) errs.soilType = t('cropRec.errSoilType');
    
    const phVal = parseFloat(pH);
    if (!pH) errs.pH = t('cropRec.errPhRequired');
    else if (isNaN(phVal) || phVal < 0 || phVal > 14) errs.pH = t('cropRec.errPhRange');

    const tempVal = parseFloat(temp);
    if (!temp) errs.temp = t('cropRec.errTempRequired');
    else if (isNaN(tempVal) || tempVal < -10 || tempVal > 60) errs.temp = t('cropRec.errTempRange');

    const rainVal = parseFloat(rainfall);
    if (!rainfall) errs.rainfall = t('cropRec.errRainRequired');
    else if (isNaN(rainVal) || rainVal < 0) errs.rainfall = t('cropRec.errRainNegative');

    if (!location.trim()) errs.location = t('cropRec.errLocRequired');

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecommendations(null);
    setErrorMsg('');

    if (!validate()) return;

    setIsLoading(true);
    try {
      const results = await getRecommendations(
        soilType,
        parseFloat(pH),
        parseFloat(temp),
        parseFloat(rainfall),
        location
      );
      setRecommendations(results);
    } catch (err: any) {
      setErrorMsg(err.message || t('cropRec.errFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSoilType('');
    setPh('');
    setTemp('');
    setRainfall('');
    setLocation('');
    setRecommendations(null);
    setErrorMsg('');
    setValidationErrors({});
  };

  const soilOptions = [
    { value: 'Black Soil', label: t('cropRec.optBlackSoil') },
    { value: 'Red Soil', label: t('cropRec.optRedSoil') },
    { value: 'Sandy Soil', label: t('cropRec.optSandySoil') },
    { value: 'Loamy Soil', label: t('cropRec.optLoamySoil') },
  ];

  return (
    <div className="bg-emerald-50/20 py-12 md:py-16 min-h-screen" id="crop-recommendation-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title and description */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex bg-emerald-100 text-emerald-850 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            🎯 {t('cropRec.decisionSupport')}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight mb-3">
            {t('cropRec.title')}
          </h1>
          <p className="text-emerald-900/75 text-sm md:text-base leading-relaxed">
            {t('cropRec.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Inputs Form Box */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-emerald-100/80 shadow-md p-6 md:p-8" id="recommendation-form-block">
            <h2 className="text-lg font-bold text-emerald-950 mb-6 flex items-center gap-2">
              <Sprout className="text-emerald-600 w-5 h-5" />
              {t('cropRec.paramsTitle')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <SelectInput
                label={t('cropRec.soilTypeLabel')}
                id="soilType"
                options={soilOptions}
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                error={validationErrors.soilType}
                helperText={t('cropRec.soilHelp')}
              />

              <div className="grid grid-cols-2 gap-4">
                <NumberInput
                  label={t('cropRec.soilPhLabel')}
                  id="pH"
                  placeholder="e.g. 6.5"
                  step="0.1"
                  value={pH}
                  onChange={(e) => setPh(e.target.value)}
                  error={validationErrors.pH}
                  helperText={t('cropRec.phHelp')}
                />
                
                <NumberInput
                  label={t('cropRec.tempLabel')}
                  id="temp"
                  placeholder="e.g. 28"
                  unit="°C"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  error={validationErrors.temp}
                  helperText={t('cropRec.tempHelp')}
                />
              </div>

              <NumberInput
                label={t('cropRec.rainLabel')}
                id="rainfall"
                placeholder="e.g. 850"
                unit="mm"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                error={validationErrors.rainfall}
                helperText={t('cropRec.rainHelp')}
              />

              <TextInput
                label={t('cropRec.locLabel')}
                id="location"
                placeholder="e.g. Nagpur, Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={validationErrors.location}
                helperText={t('cropRec.locHelp')}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-grow bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-350 text-white font-bold py-3.5 px-6 rounded-xl transition duration-200 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-center cursor-pointer"
                  id="submit-recommendation"
                >
                  {isLoading ? t('cropRec.btnAnalyzing') : t('cropRec.btnRecommend')}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  id="reset-recommendation"
                  title={t('cropRec.btnResetTooltip')}
                >
                  {t('cropRec.btnReset')}
                </button>
              </div>
            </form>
          </div>

          {/* Results Block */}
          <div className="lg:col-span-7 flex flex-col justify-center" id="recommendation-results-block">
            {isLoading && (
              <div className="bg-white rounded-3xl border border-emerald-50 shadow-sm p-12 flex flex-col items-center">
                <LoadingSpinner message={t('cropRec.loaderMessage')} />
              </div>
            )}

            {errorMsg && (
              <ErrorMessage message={errorMsg} onRetry={() => setIsLoading(true)} />
            )}

            {!isLoading && !errorMsg && !recommendations && (
              <div className="bg-emerald-100/30 border border-dashed border-emerald-200 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-4">
                <div className="bg-emerald-100 p-4 rounded-full text-emerald-700">
                  <Sprout className="w-10 h-10 animate-pulse" />
                </div>
                <h3 className="font-bold text-xl text-emerald-950">{t('cropRec.awaitingDetailsTitle')}</h3>
                <p className="text-emerald-900/70 text-sm md:text-base max-w-md leading-relaxed">
                  {t('cropRec.awaitingDetailsDesc')}
                </p>
              </div>
            )}

            {!isLoading && !errorMsg && recommendations && (
              <div className="space-y-6 animate-slide-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
                    🌾 {t('cropRec.topRecsTitle')}
                  </h2>
                  <span className="text-sm font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg">
                    {t('cropRec.sortedSuitability')}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6" id="rec-results-list">
                  {recommendations.map((crop) => (
                    <div
                      key={crop.id}
                      className="bg-white rounded-3xl border border-emerald-100 hover:border-emerald-200 shadow-sm p-5 md:p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden transition-all duration-300 hover:shadow-md"
                      id={`crop-card-${crop.id}`}
                    >
                      {/* Crop suit scores floating badge */}
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white px-5 py-2.5 rounded-bl-3xl text-sm font-black tracking-tight shadow-sm flex items-center gap-1">
                        <Check className="w-4 h-4 text-emerald-200" />
                        <span>{t('cropRec.matchLabel')}: {crop.suitabilityScore}%</span>
                      </div>

                      {/* Side Image */}
                      <img
                        src={crop.image}
                        alt={`${t(`crop.${crop.id}.name` as any) || crop.name} leaf or crop field`}
                        className="w-full md:w-36 h-36 object-cover rounded-2xl bg-emerald-55"
                        referrerPolicy="no-referrer"
                      />

                      {/* Card Info details */}
                      <div className="flex-grow flex flex-col justify-between pr-0 md:pr-16">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-extrabold text-2xl text-emerald-950 leading-tight">
                              {t(`crop.${crop.id}.name` as any) || crop.name}
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              crop.profitability === 'High'
                                ? 'bg-emerald-100 text-emerald-850'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {t('cropRec.profitabilityLabel')}: {t(`cropRec.profit.${crop.profitability.toLowerCase()}` as any) || crop.profitability}
                            </span>
                          </div>
                          
                          <p className="text-emerald-900/85 text-xs md:text-sm leading-relaxed mb-4 text-justify">
                            {t(`crop.${crop.id}.description` as any) || crop.description}
                          </p>
                        </div>

                        {/* Extra indicators */}
                        <div className="grid grid-cols-2 gap-4 border-t border-emerald-50/80 pt-4 text-xs md:text-sm">
                          <div>
                            <span className="text-emerald-700/70 font-semibold block uppercase tracking-wider text-[10px] mb-0.5">{t('cropRec.expectedYieldLabel')}</span>
                            <span className="font-bold text-emerald-950">{t(`crop.${crop.id}.expectedYield` as any) || crop.expectedYield}</span>
                          </div>
                          <div>
                            <span className="text-emerald-700/70 font-semibold block uppercase tracking-wider text-[10px] mb-0.5">{t('cropRec.paramsMatchedLabel')}</span>
                            <span className="font-bold text-emerald-700 truncate block text-[11px] md:text-xs" title={crop.idealConditions}>
                              {crop.idealConditions}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
