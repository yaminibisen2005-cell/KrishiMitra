/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Bot } from 'lucide-react';
import { motion } from 'motion/react';

export default function TypingIndicator() {
  const { t } = useTranslation();
  const typingText = t('chatbotTyping' as any) || "KrishiMitra AI is typing...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-start gap-3 mb-4 max-w-[85%] animate-pulse"
      id="typing-indicator-root"
    >
      {/* Bot Icon */}
      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm flex-shrink-0 border border-emerald-500/10">
        <Bot className="w-4 h-4" />
      </div>

      <div>
        <div className="bg-emerald-50/75 text-emerald-950 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-emerald-100/50">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700/60 leading-none">
              KrishiMitra AI
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></div>
            <span className="text-xs text-emerald-800/80 font-medium ml-1.5">{typingText}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
