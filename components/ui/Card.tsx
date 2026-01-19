import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'calculator' | 'result';
  hover?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hover = false,
  className = '',
}) => {
  const baseStyles = 'bg-white border border-[--color-slate-200] rounded-xl transition-all duration-200';
  
  const variantStyles = {
    default: 'p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]',
    calculator: 'p-10 shadow-[0_4px_6px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.03)]',
    result: 'p-8 bg-[--color-slate-50] border-[--color-slate-300]',
  };
  
  const hoverStyles = hover 
    ? 'hover:border-[--color-slate-300] hover:shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:-translate-y-0.5'
    : '';

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};
