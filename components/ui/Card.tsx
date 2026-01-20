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
  const baseStyles = 'bg-white rounded-lg transition-all';
  
  const variantStyles = {
    default: 'p-5 border-[1.5px] border-[--gray-200]',
    calculator: 'p-8 border-[1.5px] border-[--gray-200]',
    result: 'p-8 border-[1.5px] border-[--gray-200] bg-[--gray-50]',
  };
  
  const hoverStyles = hover 
    ? 'hover:border-[--gray-900] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
    : '';

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      style={{ transitionDuration: '0.2s' }}
    >
      {children}
    </div>
  );
};
