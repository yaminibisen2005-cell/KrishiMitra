/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sprout } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ message = 'Loading insights...', size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5 text-emerald-600',
    md: 'w-10 h-10 text-emerald-600',
    lg: 'w-16 h-16 text-emerald-600',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in" id="loading-spinner-container">
      <div className="relative flex items-center justify-center mb-4">
        {/* Spinner background track */}
        <div className={`rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin ${
          size === 'sm' ? 'w-8 h-8 border-2' : size === 'md' ? 'w-16 h-16 border-4' : 'w-24 h-24 border-6'
        }`} />
        
        {/* Farming/Nature icon bouncing inside */}
        <div className="absolute animate-bounce">
          <Sprout className={sizeClasses[size]} />
        </div>
      </div>
      {message && (
        <p className="text-emerald-800 font-medium text-sm md:text-base animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
