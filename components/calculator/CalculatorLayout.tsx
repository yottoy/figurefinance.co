import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  breadcrumbs: Array<{ name: string; href?: string }>;
  title: string;
  description: string;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  children,
  breadcrumbs,
  title,
  description,
}) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-[--color-slate-50] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl md:text-5xl font-bold text-[--color-slate-900] mb-4">
              {title}
            </h1>
            <p className="text-lg text-[--color-slate-600] max-w-3xl">
              {description}
            </p>
          </div>
        </section>

        {/* Calculator Content */}
        <div className="container mx-auto px-4 py-12">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};
