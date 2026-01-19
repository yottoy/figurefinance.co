import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isCurrency?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, isCurrency, className = '', type = 'text', ...props }, ref) => {
    const inputClassName = `
      w-full px-5 py-4 text-base border-2 rounded-xl transition-all duration-200
      ${isCurrency ? 'font-[family-name:var(--font-jetbrains-mono)] tabular-nums' : ''}
      ${error 
        ? 'border-[--color-error]' 
        : 'border-[--color-slate-200] hover:border-[--color-slate-300] focus:border-[--color-primary-500]'
      }
      focus:outline-none focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]
      placeholder:text-[--color-slate-400]
      ${className}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-[--color-slate-700] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={inputClassName}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-[--color-error]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-[--color-slate-500]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
