import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md';
  
  const variantStyles = {
    primary: 'bg-[--color-primary-100] text-[--color-primary-800]',
    success: 'bg-[#D1FAE5] text-[#065F46]',
    info: 'bg-[#DBEAFE] text-[#1E3A8A]',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
