/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 min-h-screen py-16 px-4 flex items-center justify-center font-sans" id="unauthorized-root">
      <div className="max-w-md w-full bg-white border border-red-100 rounded-3xl p-8 md:p-10 shadow-xl text-center animate-fade-in">
        
        {/* Animated Icon badge */}
        <div className="bg-red-50 text-red-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 border border-red-100">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="bg-red-100/80 text-red-800 border border-red-200 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
          {t('accessDenied')}
        </span>

        <h1 className="text-2xl font-black text-emerald-950 tracking-tight mt-1">
          {t('unauthorized.title')}
        </h1>
        
        <p className="text-sm text-emerald-900/65 leading-relaxed mt-3 mb-8 font-medium">
          {t('unauthorized.desc')}
        </p>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/auth')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl transition duration-150 text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-100" />
            <span>{t('unauthorized.loginDifferent')}</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold py-3 px-5 rounded-xl border border-slate-200 transition duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4 text-emerald-700" />
            <span>{t('backHome')}</span>
          </button>
        </div>

        <div className="mt-8 text-[10px] text-emerald-900/40 font-semibold tracking-wider">
          Ref ID: KM-AUTH-BLOCK-403
        </div>

      </div>
    </div>
  );
}
