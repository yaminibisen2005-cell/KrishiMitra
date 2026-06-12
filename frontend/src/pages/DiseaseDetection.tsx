/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { detectDisease } from '../services/diseaseService';
import { DiseaseDetectionResult } from '../types';
import { UploadCloud, Image, AlertCircle, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function DiseaseDetection() {
  const { t } = useTranslation();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-supplied sample leaves for testing
  const sampleLeafs = [
    {
      name: t('disease.sampleCornName'),
      desc: t('disease.sampleCornDesc'),
      url: 'https://images.unsplash.com/photo-1596701062351-8c2da223b56f?auto=format&fit=crop&q=80&w=300'
    },
    {
      name: t('disease.sampleSoybeanName'),
      desc: t('disease.sampleSoybeanDesc'),
      url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setupFile(e.target.files[0]);
    }
  };

  const setupFile = (file: File) => {
    setResult(null);
    setErrorMsg('');
    setSelectedImage(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setupFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = async (sampleUrl: string) => {
    setResult(null);
    setErrorMsg('');
    setIsLoading(true);
    
    try {
      // Fetch sample to create File object
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const file = new File([blob], 'sample_leaf.jpg', { type: 'image/jpeg' });
      
      setSelectedImage(file);
      setImagePreview(sampleUrl);
      const detectionResult = await detectDisease(file);
      setResult(detectionResult);
    } catch {
      setErrorMsg(t('disease.errSampleFile'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMsg(t('disease.errNoImage'));
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const detectionResult = await detectDisease(selectedImage);
      setResult(detectionResult);
    } catch (err: any) {
      setErrorMsg(err.message || t('disease.errFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setErrorMsg('');
  };

  return (
    <div className="bg-emerald-50/20 py-12 md:py-16 min-h-screen" id="disease-detection-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="max-w-3xl mb-12" id="disease-detection-header">
          <span className="inline-flex bg-emerald-100 text-emerald-850 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            🔬 {t('disease.visionDiagnostic')}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight mb-3">
            {t('disease.title')}
          </h1>
          <p className="text-emerald-900/75 text-sm md:text-base leading-relaxed">
            {t('disease.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Uploader Left Column */}
          <div className="lg:col-span-6 flex flex-col gap-6" id="uploader-column">
            
            <div
              className={`bg-white rounded-3xl border-2 border-dashed p-8 md:p-12 text-center transition-all ${
                isDragging
                  ? 'border-emerald-600 bg-emerald-50/20 scale-[1.01]'
                  : imagePreview
                  ? 'border-emerald-200 bg-white'
                  : 'border-emerald-200 hover:border-emerald-300 bg-white hover:shadow-sm'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              id="image-dropzone-box"
            >
              {imagePreview ? (
                <div className="flex flex-col items-center gap-6 animate-fade-in" id="preview-active-view">
                  <div className="relative group max-w-sm rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={imagePreview}
                      alt="Crop disease upload preview"
                      className="w-full h-64 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                      <button
                        onClick={handleClear}
                        className="bg-white/95 text-red-700 font-bold px-4 py-2 rounded-xl text-xs hover:bg-white cursor-pointer"
                      >
                        {t('disease.btnChangeImage')}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAnalyze}
                      disabled={isLoading}
                      className="bg-emerald-650 hover:bg-emerald-700 disabled:bg-emerald-350 bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition duration-155 flex items-center gap-2 shadow-sm cursor-pointer"
                      id="run-leaf-analysis"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>{isLoading ? t('disease.btnScanning') : t('disease.btnAnalyze')}</span>
                    </button>
                    
                    <button
                      onClick={handleClear}
                      className="bg-gray-100 hover:bg-gray-200/80 text-gray-800 font-semibold py-3 px-6 rounded-xl transition text-sm cursor-pointer"
                      id="clear-leaf-image"
                    >
                      {t('disease.btnClear')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4" id="upload-instruction-view">
                  <div className="bg-emerald-50 p-4 rounded-full text-emerald-700">
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  <div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-emerald-700 font-bold hover:text-emerald-900 underline text-sm md:text-base focus:outline-none cursor-pointer"
                    >
                      {t('disease.clickToUpload')}
                    </button>
                    <span className="text-emerald-900/60 text-sm md:text-base">{t('disease.dragAndDrop')}</span>
                  </div>
                  <p className="text-xs text-emerald-950/60 max-w-xs leading-relaxed">
                    {t('disease.supportsFormats')}
                  </p>
                  
                  {/* Hidden Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Test Sample Leaf images section */}
            <div className="bg-emerald-900/5 border border-emerald-900/10 rounded-2xl p-5" id="leaf-samples-selector">
              <h3 className="font-bold text-sm text-emerald-950 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Image className="w-4 h-4 text-emerald-700" />
                {t('disease.trySamples')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {sampleLeafs.map((samp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(samp.url)}
                    disabled={isLoading}
                    className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-emerald-50 text-left outline-none hover:border-emerald-350 hover:bg-emerald-50/20 transition group cursor-pointer"
                  >
                    <img
                      src={samp.url}
                      alt={samp.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold text-emerald-950 truncate group-hover:text-emerald-800 transition">
                        {samp.name}
                      </p>
                      <p className="text-[10px] text-emerald-900/60 truncate">
                        {samp.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Analysis Right Column */}
          <div className="lg:col-span-6 flex flex-col justify-center" id="disease-results-column">
            
            {isLoading && (
              <div className="bg-white rounded-3xl border border-emerald-50 shadow-sm p-12 flex flex-col items-center">
                <LoadingSpinner message={t('disease.loaderMessage')} />
              </div>
            )}

            {errorMsg && (
              <ErrorMessage message={errorMsg} onRetry={() => setErrorMsg('')} />
            )}

            {!isLoading && !errorMsg && !result && (
              <div className="bg-emerald-55/30 bg-emerald-50/30 border border-dashed border-emerald-200 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-4">
                <div className="bg-emerald-100 p-4 rounded-full text-emerald-700">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-xl text-emerald-950">{t('disease.awaitingUploadTitle')}</h3>
                <p className="text-emerald-900/70 text-sm md:text-base max-w-sm leading-relaxed">
                  {t('disease.awaitingUploadDesc')}
                </p>
              </div>
            )}

            {!isLoading && !errorMsg && result && (
              <div className="bg-white rounded-3xl border border-emerald-100 shadow-md overflow-hidden animate-slide-up" id="diagnosis-result-card">
                
                {/* Result header banner */}
                <div className="bg-emerald-600 text-white p-6 md:p-8 flex items-center justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full text-[10px] uppercase font-black tracking-widest mb-1.5 border border-white/10">
                      {t('disease.outcomeBadge')}
                    </span>
                    <h2 className="text-2xl font-black tracking-tight leading-none text-white">
                      {t(`disease.result.${result.disease.toLowerCase().replace(/\s+/g, '')}` as any) || result.disease}
                    </h2>
                  </div>
                  <div className="bg-white/25 rounded-2xl px-4 py-2.5 text-center border border-white/25 flex flex-col justify-center select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                    <span className="text-[10px] text-emerald-100 font-extrabold uppercase tracking-wide leading-none">{t('disease.confidenceLabel')}</span>
                    <span className="text-2xl font-black text-white leading-tight">{result.confidence}%</span>
                  </div>
                </div>

                {/* Content specs */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Cause block */}
                  <div className="flex gap-4">
                    <div className="bg-red-50 text-red-700 p-3 rounded-2xl h-fit flex-shrink-0 border border-red-100/60">
                      <AlertCircle className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-red-950 uppercase tracking-widest mb-1">
                        {t('disease.causeLabel')}
                      </h4>
                      <p className="text-emerald-900/80 text-sm md:text-base leading-relaxed text-justify">
                        {t('disease.result.cause') || result.cause}
                      </p>
                    </div>
                  </div>

                  {/* Treatment recommendations */}
                  <div className="flex gap-4">
                    <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl h-fit flex-shrink-0 border border-emerald-100/65">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm text-emerald-950 uppercase tracking-widest mb-1">
                        {t('disease.treatmentLabel')}
                      </h4>
                      <p className="text-emerald-900/90 text-sm md:text-base font-semibold leading-relaxed mb-3">
                        {t('disease.result.treatment') || result.treatment}
                      </p>
                    </div>
                  </div>

                  {/* Scientific guidance notes */}
                  <div className="bg-emerald-55/5 bg-emerald-500/5 p-4 md:p-5 rounded-2xl border border-emerald-100/80 text-xs md:text-sm text-emerald-800/90 leading-relaxed text-justify">
                    <span className="font-bold text-emerald-950 block mb-1">{t('disease.agronomistNoteLabel')}</span>
                    {t('disease.result.notes') || result.notes}
                  </div>

                  {/* Scan again option */}
                  <button
                    onClick={handleClear}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold py-3 rounded-xl transition duration-155 cursor-pointer"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>{t('disease.btnNewScan')}</span>
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
