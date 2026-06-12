/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChatMessage as ChatMessageType } from '../../services/chatbotService';
import { Bot, User, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessageProps {
  message: ChatMessageType;
  key?: string;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.sender === 'ai';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-3 mb-4 max-w-[85%] ${
        isAi ? 'self-start' : 'self-end flex-row-reverse ml-auto'
      }`}
      id={`chat-msg-${message.id}`}
    >
      {/* Dynamic Avatar Container */}
      {isAi ? (
        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm flex-shrink-0 border border-emerald-500/10">
          <Bot className="w-4 h-4" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm flex-shrink-0 border border-amber-400/10">
          <User className="w-4 h-4" />
        </div>
      )}

      {/* Bubble Shell */}
      <div className="flex flex-col min-w-0 font-sans">
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm border relative group/bubble ${
            isAi
              ? 'bg-white text-emerald-950 border-emerald-100/70 rounded-tl-none'
              : 'bg-emerald-600 text-white border-emerald-600/15 rounded-tr-none'
          }`}
          id={`chat-bubble-${message.id}`}
        >
          {/* Metadata Row */}
          <div className="flex items-center justify-between gap-4 mb-1">
            <span
              className={`text-[10px] uppercase tracking-wider font-extrabold leading-none ${
                isAi ? 'text-emerald-700/70' : 'text-emerald-100'
              }`}
            >
              {isAi ? 'KrishiMitra AI' : 'Kisan'}
            </span>

            {/* Premium Copy Trigger for AI Responses */}
            {isAi && (
              <button
                type="button"
                onClick={handleCopy}
                className="opacity-60 hover:opacity-100 text-emerald-700 hover:text-emerald-900 p-0.5 rounded transition duration-150 relative cursor-pointer flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                title="Copy response"
                aria-label="Copy response to clipboard"
                id={`copy-btn-${message.id}`}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale-in" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          {/* Text Message */}
          <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap breakdown-words">
            {message.text}
          </p>
        </div>

        {/* Timestamp */}
        <span
          className={`text-[9px] font-bold text-slate-400 mt-1 ${
            isAi ? 'text-left pl-1.5' : 'text-right pr-1.5'
          }`}
        >
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  );
}
