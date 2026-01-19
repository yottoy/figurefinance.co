import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[--color-primary-500] text-white border-none shadow-[0_1px_2px_rgba(0,0,0,0.05),0_1px_3px_rgba(99,102,241,0.2)] hover:bg-[--color-primary-600] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_2px_6px_rgba(99,102,241,0.3)] active:translate-y-0',
    secondary: 'bg-white text-[--color-slate-700] border border-[--color-slate-300] hover:bg-[--color-slate-50] hover:border-[--color-slate-400]',
  };
  
  const sizeStyles = {
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
