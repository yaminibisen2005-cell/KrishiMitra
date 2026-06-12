/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

interface FeatureCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  linkTo: string;
  colorClass: string;
  key?: string;
}

export default function FeatureCard({ id, icon: Icon, title, description, linkTo, colorClass }: FeatureCardProps) {
  const { t } = useTranslation();
  return (
    <Link
      to={linkTo}
      className="group relative flex flex-col bg-white overflow-hidden rounded-2xl border border-emerald-100 hover:border-emerald-300 transition duration-300 shadow-[0_2px_12px_rgba(10,30,20,0.03)] hover:shadow-[0_12px_32px_rgba(10,50,20,0.08)] p-6 md:p-8"
      id={`feature-card-${id}`}
    >
      {/* Decorative hover radial background */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 group-hover:opacity-10 transition duration-300 ${colorClass}`} />
      
      {/* Icon Frame */}
      <div className={`p-4 rounded-2xl w-fit mb-6 transition duration-300 group-hover:scale-110 ${colorClass}`}>
        <Icon className="w-6 h-6 text-emerald-800" />
      </div>

      <h3 className="font-bold text-xl text-emerald-950 mb-2 group-hover:text-emerald-700 transition duration-200">
        {title}
      </h3>
      
      <p className="text-emerald-900/75 text-sm md:text-base leading-relaxed flex-grow mb-6">
        {description}
      </p>

      <div className="flex items-center gap-1.5 font-semibold text-sm text-emerald-700 group-hover:text-emerald-900 transition duration-200 mt-auto">
        <span>{t('home.goToTool')}</span>
        <ArrowRight className="w-4 h-4 transition duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
