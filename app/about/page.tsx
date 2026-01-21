import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About FigureFinance - Free Financial Calculators',
  description: 'Learn about FigureFinance\'s mission to provide free, accurate financial calculators to help you make informed money decisions.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-[--color-slate-50] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ name: 'About' }]} />
            <h1 className="text-4xl md:text-5xl font-bold text-[--color-slate-900] mb-4">
              About FigureFinance
            </h1>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6 text-[--color-slate-700]">
              <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4">
                Our Mission
              </h2>
              <p>
                FigureFinance provides free, accurate financial calculators to help people make informed decisions about their money. We believe everyone should have access to professional-grade financial tools without paying fees or signing up for accounts.
              </p>

              <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Why We Built This
              </h2>
              <p>
                Financial decisions can be overwhelming. Whether you're paying off debt, planning a major purchase, or saving for the future, having accurate calculations helps you make confident choices.
              </p>
              <p>
                We created FigureFinance to provide:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Free tools</strong> - No signup required, no hidden fees
                </li>
                <li>
                  <strong>Fast calculations</strong> - Get instant results
                </li>
                <li>
                  <strong>Clear explanations</strong> - Understand how calculations work
                </li>
                <li>
                  <strong>Privacy-first</strong> - We don't store or share your data
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4 mt-8">
                How It Works
              </h2>
              <p>
                All calculations happen in your browser. Your financial information never leaves your device, and we don't store any of your data. Our calculators use industry-standard financial formulas to provide accurate results.
              </p>

              <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Important Disclaimer
              </h2>
              <p>
                FigureFinance provides calculators for informational purposes only. Our tools are not a substitute for professional financial advice. Results are estimates based on the information you provide and should not be considered financial, legal, or tax advice.
              </p>
              <p>
                Always consult with qualified financial professionals before making major financial decisions.
              </p>

              <h2 className="text-3xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Contact Us
              </h2>
              <p>
                Have questions or feedback? We'd love to hear from you. Contact us at{' '}
                <a href="mailto:hello@figurefinance.co" className="text-[--color-primary-600] hover:underline">
                  hello@figurefinance.co
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
