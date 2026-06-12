/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { 
  mockChatbotResponse, 
  loadChatHistory, 
  saveChatHistory, 
  clearChatHistory, 
  ChatMessage as ChatMessageType 
} from '../../services/chatbotService';
import ChatBubble from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import TypingIndicator from './TypingIndicator';
import { Bot, RefreshCw, Sparkles, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { t, locale } = useTranslation();
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load chat history on mount
  useEffect(() => {
    const historicalMessages = loadChatHistory();
    setMessages(historicalMessages);
  }, []);

  // Auto-scroll to lowest bounds
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle message sending transactions
  const handleSendTransaction = async (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}-${Math.random()}`,
      sender: 'user',
      text,
      timestamp,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);

    // Initialise typing response
    setIsTyping(true);

    try {
      const replyText = await mockChatbotResponse(text, locale as 'en' | 'hi' | 'mr');
      const aiMsg: ChatMessageType = {
        id: `ai-${Date.now()}-${Math.random()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const finalMessages = [...updatedMessages, aiMsg];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  // Clear existing history
  const handleClearHistory = () => {
    clearChatHistory();
    setMessages([]);
  };

  // Localization utilities
  const onlineText = t('chatbotStatusOnline' as any) || "Online";
  const emptyGreeting = t('chatbotEmptyGreeting' as any) || "Hello Farmer 👋";
  const emptyText = t('chatbotEmptyText' as any) || "Ask me anything about crops, weather, diseases, fertilizers, market prices, or government schemes.";
  const clearHistoryText = t('chatbotClear' as any) || "Clear History";

  return (
    <div 
      className="w-full bg-white rounded-3xl border border-emerald-100/90 shadow-xl overflow-hidden flex flex-col h-[650px]" 
      id="krishimitra-chat-window"
    >
      {/* 1. Header Area */}
      <div 
        className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between border-b border-white/5 flex-shrink-0" 
        id="chat-header-shell"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* AI Profile Circle */}
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg border border-emerald-500/10">
              <Bot className="w-5.5 h-5.5 text-white animate-pulse" />
            </div>
            {/* Green Online Dot */}
            <span className="absolute bottom-[-2px] right-[-2px] block h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-950"></span>
          </div>
          <div>
            <h3 className="font-extrabold text-sm md:text-base tracking-tight leading-tight flex items-center gap-1.5 text-white">
              <span>KrishiMitra AI Assistant</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </h3>
            <span className="text-[10px] uppercase font-black text-emerald-300/80 tracking-widest leading-none">
              {onlineText}
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white hover:text-red-300 text-xs font-bold rounded-xl transition cursor-pointer"
              title={clearHistoryText}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{clearHistoryText}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Chat Area Scrollable Stack */}
      <div 
        className="flex-grow overflow-y-auto p-6 bg-slate-50/50 flex flex-col space-y-4"
        style={{ scrollbarWidth: 'thin' }}
        id="chat-scroller-body"
      >
        {messages.length === 0 ? (
          /* Empty Shell Invitation Card */
          <div className="m-auto max-w-md text-center py-8 px-4" id="chat-empty-canvas">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
              <Bot className="w-8 h-8" />
            </div>
            <h4 className="text-emerald-950 font-black text-xl md:text-2xl mb-2 tracking-tight">
              {emptyGreeting}
            </h4>
            <p className="text-slate-500 text-xs md:text-sm font-semibold mb-6 leading-relaxed">
              {emptyText}
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Agronomist Guidance</span>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))
        )}

        {isTyping && <TypingIndicator />}
        
        {/* Scroll Target Marker */}
        <div ref={bottomRef} />
      </div>

      {/* 3. Suggested & Input Composition Dock */}
      <div className="p-4 bg-white border-t border-slate-100/80 flex-shrink-0" id="chat-composer-section">
        {/* Quick Suggested Chip-panel */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-[10px] uppercase font-black text-slate-400 tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600/50" />
            <span>Suggested Questions / सामान्य प्रश्न</span>
          </div>
          <SuggestedQuestions onSelectQuestion={handleSendTransaction} />
        </div>

        {/* Standard Text Composer */}
        <ChatInput onSendMessage={handleSendTransaction} disabled={isTyping} />
      </div>
    </div>
  );
}
