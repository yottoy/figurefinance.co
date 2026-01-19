import Link from 'next/link';
import { Card } from '@/components/ui/Card';

interface Calculator {
  name: string;
  description: string;
  href: string;
}

interface RelatedCalculatorsProps {
  calculators: Calculator[];
}

export const RelatedCalculators: React.FC<RelatedCalculatorsProps> = ({ calculators }) => {
  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold text-[--color-slate-900] mb-8">
        Related Calculators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href}>
            <Card hover className="h-full">
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-3">
                {calc.name}
              </h3>
              <p className="text-[--color-slate-600] mb-4">
                {calc.description}
              </p>
              <span className="text-[--color-primary-600] font-medium">
                Calculate now →
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
