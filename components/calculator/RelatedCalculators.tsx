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
      <h2 style={{ marginBottom: '24px' }}>
        Related Calculators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '16px' }}>
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="block">
            <Card hover>
              <h3>
                {calc.name}
              </h3>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
