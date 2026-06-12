/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { SUGGESTED_QUESTIONS } from '../../services/chatbotService';

interface SuggestedQuestionsProps {
  onSelectQuestion: (questionText: string) => void;
}

export default function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  const { locale } = useTranslation();
  
  // Default to English if non-existent
  const questions = SUGGESTED_QUESTIONS[locale] || SUGGESTED_QUESTIONS['en'];

  return (
    <div className="w-full" id="suggested-questions-panel">
      <div className="flex flex-wrap gap-2.5 max-w-4xl" id="suggested-questions-grid">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuestion(q.text)}
            className="text-left text-xs bg-emerald-50/70 hover:bg-emerald-100 hover:text-emerald-950 font-bold px-3.5 py-2.5 rounded-xl border border-emerald-100 text-emerald-800 transition cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 active:scale-95"
            id={`suggested-q-${idx}`}
          >
            <span>{q.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
