/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Bot, ChevronRight, Home, LayoutDashboard, Sparkles, Sprout } from 'lucide-react';
import ChatWindow from '../components/chatbot/ChatWindow';

export default function Chatbot() {
  const { t } = useTranslation();

  const titleText = t('chatbot.title' as any) || "AI Farming Assistant";
  const subtitleText = t('chatbot.subtitle' as any) || "Ask questions about crops, diseases, fertilizers, weather, market prices, and government schemes.";

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans" id="chatbot-page-wrapper">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Breadcrumbs Nav */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6 flex-wrap" id="chatbot-breadcrumbs">
          <Link to="/" className="flex items-center gap-1 hover:text-emerald-750 transition">
            <Home className="w-3.5 h-3.5" />
            <span>{t('home')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/dashboard" className="flex items-center gap-1 hover:text-emerald-750 transition">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t('kisanDashboard')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-emerald-900 flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
            {titleText}
          </span>
        </div>

        {/* 2. Page Header Accent */}
        <div className="mb-8 relative" id="chatbot-header-badge">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider rounded-full border border-emerald-100/50 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Agriculture AI Model v3.5-flash</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight mb-2">
            {titleText}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-semibold max-w-3xl leading-relaxed">
            {subtitleText}
          </p>
        </div>

        {/* 3. Main Chat Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="chatbot-main-grid">
          {/* Main Chat component */}
          <div className="lg:col-span-3">
            <ChatWindow />
          </div>

          {/* Sidebar Tips & Recommendations */}
          <div className="lg:col-span-1 space-y-6" id="chatbot-sidebar">
            
            {/* Quick Tips Box */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-md border border-white/5 relative overflow-hidden">
              {/* Background watermark deco */}
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-white select-none pointer-events-none">
                <Sprout className="w-36 h-36" />
              </div>

              <h4 className="font-extrabold text-white text-base mb-3 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <span>AI Tips for Kisan</span>
              </h4>
              <ul className="space-y-3.5 text-xs text-emerald-100/90 font-medium">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                  <span>Type keywords like <strong>"cotton"</strong> or <strong>"disease"</strong> to query instant diagnostic reports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                  <span>Select any of the suggested questions to automatically trigger expert answers in your chosen language.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                  <span>Clear history anytime by clicking the trash icon in the upper right.</span>
                </li>
              </ul>
            </div>

            {/* Scheme Guidelines Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h4 className="font-extrabold text-emerald-950 text-sm mb-3.5 uppercase tracking-wide">
                Supported Domains
              </h4>
              <div className="space-y-2.5">
                {[
                  { domain: "Soil & Crop Match", desc: "Which crop is best for black soil?" },
                  { domain: "Disease Mitigation", desc: "Fungal leaf spot remedies" },
                  { domain: "Fertilizer Protocols", desc: "Cotton urea and NPK guides" },
                  { domain: "Government Aid", desc: "PM-Kisan DBT schemes" },
                  { domain: "Live APMC Prices", desc: "Wholesale Mandi market values" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-50">
                    <span className="text-xs font-bold text-slate-800">{item.domain}</span>
                    <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">Promptable</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
