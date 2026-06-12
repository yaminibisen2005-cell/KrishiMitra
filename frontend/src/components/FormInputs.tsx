/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BaseInputProps {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
}

interface SelectInputProps extends BaseInputProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  options: Array<{ value: string; label: string }>;
}

export function SelectInput({ label, id, error, helperText, options, ...props }: SelectInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full" id={`select-wrapper-${id}`}>
      <label htmlFor={id} className="text-sm font-semibold text-emerald-950">
        {label}
      </label>
      <select
        id={id}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition bg-white/50 backdrop-blur-sm focus:bg-white text-emerald-950 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 ${
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-emerald-200/80 hover:border-emerald-300'
        }`}
        {...props}
      >
        <option value="">Select Option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-xs font-medium text-red-500 mt-1">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-emerald-700/75 mt-1">{helperText}</span>
      ) : null}
    </div>
  );
}

interface NumberInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  unit?: string;
}

export function NumberInput({ label, id, error, helperText, unit, ...props }: NumberInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full" id={`number-wrapper-${id}`}>
      <label htmlFor={id} className="text-sm font-semibold text-emerald-950">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          type="number"
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition bg-white/50 backdrop-blur-sm focus:bg-white text-emerald-950 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 ${
            error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-emerald-200/80 hover:border-emerald-300'
          } ${unit ? 'pr-12' : ''}`}
          {...props}
        />
        {unit && (
          <span className="absolute right-3.5 text-xs font-semibold text-emerald-700 pointer-events-none select-none">
            {unit}
          </span>
        )}
      </div>
      {error ? (
        <span className="text-xs font-medium text-red-500 mt-1">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-emerald-700/75 mt-1">{helperText}</span>
      ) : null}
    </div>
  );
}

interface TextInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {}

export function TextInput({ label, id, error, helperText, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full" id={`text-wrapper-${id}`}>
      <label htmlFor={id} className="text-sm font-semibold text-emerald-950">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition bg-white/50 backdrop-blur-sm focus:bg-white text-emerald-950 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 ${
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-emerald-200/80 hover:border-emerald-300'
        }`}
        {...props}
      />
      {error ? (
        <span className="text-xs font-medium text-red-500 mt-1">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-emerald-700/75 mt-1">{helperText}</span>
      ) : null}
    </div>
  );
}
