'use client';

import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Debt', href: '/debt' },
    { name: 'Mortgage', href: '/mortgage' },
    { name: 'Savings', href: '/savings' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="border-b border-[--gray-100] sticky top-0 z-50 bg-white/80 backdrop-blur-[12px]">
      <nav className="container mx-auto" style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link href="/" className="font-semibold text-[--gray-900]" style={{ fontSize: '18px', letterSpacing: '-0.01em' }}>
          FigureFinance
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-[--gray-600] hover:text-[--gray-900] transition-colors"
              style={{ fontSize: '16px', transitionDuration: '0.2s' }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[--gray-600]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[--gray-100] px-6 py-4">
          <div className="flex flex-col" style={{ gap: '20px' }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-[--gray-600] hover:text-[--gray-900] transition-colors"
                style={{ fontSize: '16px', transitionDuration: '0.2s' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
