/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Send, Mic, AlertCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [inputText, setInputText] = useState('');
  const [showVoiceAlert, setShowVoiceAlert] = useState(false);
  const { t } = useTranslation();
  const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (disabled || !inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const triggerVoiceComingSoon = () => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    setShowVoiceAlert(true);
    alertTimeoutRef.current = setTimeout(() => {
      setShowVoiceAlert(false);
    }, 2500);
  };

  const placeholderText = t('chatbotInputPlaceholder' as any) || "Ask me anything about farming...";
  const sendLabel = t('chatbotSend' as any) || "Send";
  const voiceComingSoonText = t('chatbotDisclaimerVoice' as any) || "Voice Assistant Coming Soon";

  return (
    <div className="w-full relative" id="chat-input-wrapper">
      {/* Voice Warning Balloon */}
      {showVoiceAlert && (
        <div
          className="absolute -top-12 left-4 px-3.5 py-1.5 bg-zinc-900 text-amber-300 text-xs font-bold rounded-xl shadow-lg border border-zinc-800 flex items-center gap-1.5 animate-bounce z-10"
          id="voice-unsupported-alert"
        >
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{voiceComingSoonText}</span>
        </div>
      )}

      <form onSubmit={handleSend} className="flex items-center gap-2" id="chat-composer-form">
        <div className="relative flex-grow flex items-center">
          {/* Micro Button Inside / Prep wrapper */}
          <button
            type="button"
            onClick={triggerVoiceComingSoon}
            className="absolute left-3.5 p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-transform focus:outline-none focus:ring-1 focus:ring-emerald-500/20 active:scale-90"
            title={voiceComingSoonText}
            id="chat-mic-trigger"
          >
            <Mic className="w-5 h-5 flex-shrink-0" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholderText}
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 pl-14 pr-4 py-4 rounded-2xl text-sm font-semibold text-emerald-950 placeholder-slate-400 focus:outline-none transition-all disabled:opacity-75 disabled:cursor-not-allowed"
            id="chat-composer-input"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={disabled || !inputText.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 text-white p-4 rounded-2xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition ease-in-out cursor-pointer active:scale-95 flex items-center gap-2 flex-shrink-0"
          title={sendLabel}
          id="chat-send-trigger"
        >
          <Send className="w-4.5 h-4.5" />
          <span className="hidden sm:inline text-xs font-extrabold uppercase tracking-wider">{sendLabel}</span>
        </button>
      </form>
    </div>
  );
}
