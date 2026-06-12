/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface WeatherCardProps {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
  colorClass: string;
}

export default function WeatherCard({ id, icon: Icon, label, value, description, colorClass }: WeatherCardProps) {
  return (
    <div
      className="bg-white/80 backdrop-blur-md rounded-2xl border border-emerald-50/80 p-5 md:p-6 shadow-sm flex items-center gap-4 transition duration-200 hover:scale-[1.02] hover:shadow-md"
      id={`weather-card-${id}`}
    >
      <div className={`p-3.5 rounded-xl ${colorClass}`}>
        <Icon className="w-6 h-6 text-emerald-800" />
      </div>
      <div className="flex-grow">
        <span className="text-xs md:text-sm font-semibold text-emerald-800/80 uppercase tracking-wider block mb-0.5">
          {label}
        </span>
        <div className="text-2xl md:text-3xl font-extrabold text-emerald-950 leading-none">
          {value}
        </div>
        {description && (
          <span className="text-xs text-emerald-700/65 mt-1 block">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
