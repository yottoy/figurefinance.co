import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string | number; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', ...props }, ref) => {
    const selectClassName = `
      w-full px-5 py-4 text-base border-2 rounded-xl transition-all duration-200
      ${error 
        ? 'border-[--color-error]' 
        : 'border-[--color-slate-200] hover:border-[--color-slate-300] focus:border-[--color-primary-500]'
      }
      focus:outline-none focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]
      bg-white cursor-pointer
      ${className}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-[--color-slate-700] mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={selectClassName}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select';
