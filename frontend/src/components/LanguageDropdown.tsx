/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, LanguageType } from '../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageDropdown({ darkMode = false }: { darkMode?: boolean }) {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { value: LanguageType; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी' },
    { value: 'mr', label: 'मराठी' }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === language)?.label || 'English';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} id="language-dropdown-wrapper">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-bold border transition duration-150 outline-none focus:ring-2 focus:ring-emerald-500/20 ${
          darkMode
            ? 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900'
            : 'bg-white border-emerald-100 hover:bg-emerald-50/20 text-emerald-950 hover:text-emerald-800 shadow-[0_1px_3px_rgba(10,50,20,0.02)]'
        }`}
        id="language-dropdown-trigger"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span className="hidden sm:inline">{selectedLabel}</span>
        <span className="sm:hidden">{language.toUpperCase()}</span>
        <ChevronDown className="w-3.5 h-3.5 text-emerald-600/70" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-36 rounded-2xl shadow-lg border overflow-hidden z-50 animate-fade-in ${
            darkMode
              ? 'bg-zinc-900 border-zinc-800 text-white'
              : 'bg-white border-emerald-50 text-emerald-950'
          }`}
          role="menu"
          aria-orientation="vertical"
          id="language-dropdown-menu"
        >
          <div className="p-1.5 space-y-0.5">
            {options.map((opt) => {
              const isSelected = language === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    setLanguage(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full text-left px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                    isSelected
                      ? darkMode
                        ? 'bg-zinc-800 text-amber-300 font-extrabold'
                        : 'bg-emerald-50 text-emerald-800 font-extrabold'
                      : darkMode
                      ? 'hover:bg-zinc-800/50 text-zinc-300'
                      : 'hover:bg-emerald-50/40 text-emerald-950/80 hover:text-emerald-850'
                  }`}
                  role="menuitem"
                  id={`language-option-${opt.value}`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
