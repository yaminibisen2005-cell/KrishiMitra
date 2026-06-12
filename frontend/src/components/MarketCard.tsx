/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MarketPrice } from '../types';
import { TrendingUp, TrendingDown, Minus, MapPin, Tag } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface MarketCardProps {
  item: MarketPrice;
  key?: string;
}

export default function MarketCard({ item }: MarketCardProps) {
  const { t } = useTranslation();
  const isUp = item.trend === 'up';
  const isDown = item.trend === 'down';
  const diff = item.price - item.previousPrice;
  const percent = item.previousPrice > 0 ? ((diff / item.previousPrice) * 100).toFixed(1) : '0';

  // Dynamic keys
  const categoryKey = `market.cat.${item.category.toLowerCase().replace(/\s+/g, '')}`;
  const cropKey = `market.crop.${item.crop.toLowerCase().replace(/\s+/g, '')}`;
  const hubKey = `market.hub.${item.hub.toLowerCase().replace(/\s+/g, '')}`;
  const stateKey = `market.state.${item.state.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <div
      className="bg-white rounded-2xl border border-emerald-100 hover:border-emerald-300 transition duration-300 shadow-sm hover:shadow-md p-5 flex flex-col justify-between"
      id={`market-card-${item.id}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full">
            <Tag className="w-3 h-3" />
            {t(categoryKey as any) || item.category}
          </span>

          {/* Trend Indicator */}
          <div
            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
              isUp
                ? 'bg-emerald-100 text-emerald-800'
                : isDown
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isUp ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : isDown ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>
              {isUp ? `+${percent}%` : isDown ? `${percent}%` : t('market.stable')}
            </span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-emerald-950 mb-1">
          {t(cropKey as any) || item.crop}
        </h3>

        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-2xl font-black text-emerald-900">
            ₹{item.price}
          </span>
          <span className="text-xs text-emerald-700 font-semibold uppercase">
            / {t('market.quintal')}
          </span>
        </div>
      </div>

      <div className="border-t border-emerald-50/80 pt-3.5 mt-auto flex items-center justify-between gap-2 text-xs text-emerald-800/80 font-medium flex-wrap">
        <div className="flex items-center gap-1 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span className="truncate">{t(hubKey as any) || item.hub}</span>
        </div>
        <span className="bg-emerald-50/50 px-2 py-0.5 rounded text-[10px] text-emerald-800 flex-shrink-0">
          {t(stateKey as any) || item.state}
        </span>
      </div>
    </div>
  );
}
