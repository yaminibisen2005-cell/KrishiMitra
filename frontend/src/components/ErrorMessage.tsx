/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center max-w-md mx-auto my-6 shadow-sm animate-fade-in" id="error-message-box">
      <div className="bg-red-100 p-3 rounded-full text-red-600 mb-4 animate-bounce">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-red-900 font-semibold text-lg mb-2">Something went wrong</h3>
      <p className="text-red-700 text-sm md:text-base mb-6 leading-relaxed">
        {message || 'Unable to load agricultural analytics. Please check your data input or Try again later.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-xl transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          id="error-retry-button"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
