/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Sprout, ArrowRight, Wheat } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function AuthChoice() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 min-h-screen py-16 flex items-center justify-center font-sans" id="auth-choice-root">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <div className="bg-emerald-600 text-white p-2.5 rounded-2xl shadow-md shadow-emerald-600/10">
              <Sprout className="w-8 h-8" />
            </div>
            <span className="text-3xl font-black text-emerald-950 tracking-tight">
              Krishi<span className="text-emerald-600">Mitra</span>
            </span>
          </div>
          <p className="text-emerald-800/80 font-semibold tracking-wide text-xs uppercase mb-2">{t('authChoice.ecosystem')}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight max-w-lg mx-auto">
            {t('welcomeTitle')}
          </h1>
          <p className="text-emerald-900/60 mt-3 text-sm md:text-base max-w-md mx-auto">
            {t('welcomeSub')}
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" id="auth-roles-grid">
          
          {/* Farmer Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white border border-emerald-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-emerald-200 transition duration-200 cursor-pointer relative overflow-hidden group"
            onClick={() => navigate('/login')}
            id="role-farmer-card"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-300" />
            
            <div className="relative z-10">
              <div className="bg-emerald-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/15">
                <Wheat className="w-7 h-7" />
              </div>
              <p className="text-xs font-bold uppercase text-emerald-600 tracking-wider mb-1">{t('authChoice.farmerBadge')}</p>
              <h2 className="text-xl font-black text-emerald-950 mb-3 group-hover:text-emerald-700 transition">
                {t('farmerPortal')}
              </h2>
              <p className="text-sm text-emerald-900/70 leading-relaxed mb-8">
                {t('farmerDesc')}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-emerald-50 relative z-10">
              <span className="text-sm font-bold text-emerald-900">{t('enterFarmerWorkspace')}</span>
              <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Admin Card */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white border border-emerald-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-emerald-200 transition duration-200 cursor-pointer relative overflow-hidden group"
            onClick={() => navigate('/admin/login')}
            id="role-admin-card"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-300" />

            <div className="relative z-10">
              <div className="bg-zinc-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-zinc-900/15">
                <User className="w-7 h-7" />
              </div>
              <p className="text-xs font-bold uppercase text-emerald-600 tracking-wider mb-1">{t('authChoice.adminBadge')}</p>
              <h2 className="text-xl font-black text-emerald-950 mb-3 group-hover:text-emerald-700 transition">
                {t('adminTerminal')}
              </h2>
              <p className="text-sm text-emerald-900/70 leading-relaxed mb-8">
                {t('adminDesc')}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-emerald-50 relative z-10">
              <span className="text-sm font-bold text-zinc-900">{t('enterAdminWorkspace')}</span>
              <div className="bg-zinc-50 text-zinc-700 p-2 rounded-xl group-hover:bg-zinc-900 group-hover:text-white transition">
                <ArrowRight className="w-4 h-4 text-emerald-75" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center text-xs text-emerald-900/40 font-medium">
          {t('authChoice.footer')}
        </div>
      </div>
    </div>
  );
}
