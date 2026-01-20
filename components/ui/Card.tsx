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
  const baseStyles = 'bg-transparent rounded-lg transition-all';
  
  const variantStyles = {
    default: 'p-7',
    calculator: 'p-10',
    result: 'p-8 bg-[--gray-50]',
  };
  
  const hoverStyles = hover 
    ? 'hover:bg-[--gray-50]'
    : '';

  const transitionStyle = {
    transitionDuration: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      style={transitionStyle}
    >
      {children}
    </div>
  );
};
