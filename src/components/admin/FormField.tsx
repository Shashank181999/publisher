'use client';

import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'url' | 'textarea' | 'select' | 'number' | 'date' | 'checkbox';
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  options = [],
  rows = 4,
  min,
  max,
  disabled = false,
  className = '',
}: FormFieldProps) {
  const baseInputClasses =
    'w-full px-4 py-2.5 border rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed';
  const errorClasses = error ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-slate-300';

  const renderInput = (): ReactNode => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={rows}
            disabled={disabled}
            className={`${baseInputClasses} ${errorClasses} resize-none`}
          />
        );

      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={disabled}
            className={`${baseInputClasses} ${errorClasses}`}
          >
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
              className="w-5 h-5 rounded border-slate-300 text-[#1e3a5f] focus:ring-[#1e3a5f]/20"
            />
            <span className="text-slate-600">{placeholder || 'Enable'}</span>
          </label>
        );

      case 'number':
        return (
          <input
            type="number"
            id={name}
            name={name}
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            disabled={disabled}
            className={`${baseInputClasses} ${errorClasses}`}
          />
        );

      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`${baseInputClasses} ${errorClasses}`}
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className={`${className}`}>
        {renderInput()}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {helpText && !error && <p className="text-slate-500 text-sm mt-1">{helpText}</p>}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helpText && !error && <p className="text-slate-500 text-sm mt-1">{helpText}</p>}
    </div>
  );
}
