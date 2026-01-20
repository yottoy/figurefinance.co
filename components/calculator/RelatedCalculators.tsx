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
    <section style={{ marginTop: '80px' }}>
      <h2 style={{ marginBottom: '32px' }}>
        Related Calculators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '16px' }}>
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="block">
            <Card hover className="h-full group">
              <h3 style={{ marginBottom: '6px' }}>
                {calc.name}
              </h3>
              <p className="text-[--gray-500]" style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>
                {calc.description}
              </p>
              <span className="font-medium text-[--gray-400] group-hover:text-[--indigo-500] transition-colors" style={{ fontSize: '16px', transitionDuration: '0.2s' }}>
                Calculate →
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
