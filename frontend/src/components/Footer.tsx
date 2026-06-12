/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-emerald-950 text-white mt-auto border-t border-emerald-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Logo & About Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group w-fit" id="footer-logo">
              <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                Krishi<span className="text-emerald-400">Mitra</span>
              </span>
            </Link>
            <p className="text-emerald-200/70 text-sm leading-relaxed max-w-sm">
              {t('footer.aboutText')}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5 text-sm" id="footer-links-list">
              <li>
                <Link to="/" className="text-emerald-200/70 hover:text-white transition duration-200">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/crop-recommendation" className="text-emerald-200/70 hover:text-white transition duration-200">
                  {t('cropRecommendation')}
                </Link>
              </li>
              <li>
                <Link to="/disease-detection" className="text-emerald-200/70 hover:text-white transition duration-200">
                  {t('diseaseDetection')}
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-emerald-200/70 hover:text-white transition duration-200">
                  {t('weather')}
                </Link>
              </li>
              <li>
                <Link to="/market-prices" className="text-emerald-200/70 hover:text-white transition duration-150">
                  {t('marketPrices')}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-emerald-400 font-semibold hover:text-white transition duration-150 flex items-center gap-1">
                  <span>🛠️</span>
                  <span>{t('adminConsole')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">{t('footer.supportHelpline')}</h4>
            <ul className="space-y-3 text-sm text-emerald-200/70" id="footer-support-info">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{t('footer.tollFreeKisan')}</p>
                  <p className="text-xs">{t('footer.operatingHours')}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{t('footer.supportDesk')}</p>
                  <p className="text-xs">support@krishimitra.org</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  {t('footer.address')}
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-emerald-990 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/50">
          <p>© {currentYear} {t('footer.allRightsReserved')}</p>
          <p className="flex items-center gap-1">
            {t('footer.madeToSupport')} <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
