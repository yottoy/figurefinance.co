import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Use - FigureFinance',
  description: 'Read FigureFinance\'s terms of use. Our calculators are provided for informational purposes only.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-[--color-slate-50] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ name: 'Terms of Use' }]} />
            <h1 className="text-4xl md:text-5xl font-bold text-[--color-slate-900] mb-4">
              Terms of Use
            </h1>
            <p className="text-[--color-slate-600]">Last updated: January 19, 2026</p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6 text-[--color-slate-700]">
              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4">
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using FigureFinance, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Use of Calculators
              </h2>
              <p>
                Our calculators are provided for informational and educational purposes only. Calculator results are estimates based on the information you provide and standard financial formulas.
              </p>
              <p>
                <strong>Important:</strong> Results should not be considered financial, legal, or tax advice. Always consult with qualified professionals before making financial decisions.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Accuracy of Information
              </h2>
              <p>
                While we strive to provide accurate calculators, we make no warranties or guarantees about the accuracy, completeness, or reliability of calculator results. You are responsible for verifying results and using them appropriately.
              </p>
              <p>
                Financial calculations can vary based on many factors. Our calculators use simplified models and may not account for all variables in your specific situation.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                No Financial Advice
              </h2>
              <p>
                FigureFinance does not provide financial, legal, or tax advice. Our calculators are tools to help you understand financial concepts and estimate outcomes. They are not a substitute for professional advice.
              </p>
              <p>
                You should consult with qualified financial advisors, accountants, or attorneys before making significant financial decisions.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Limitation of Liability
              </h2>
              <p>
                FigureFinance and its operators shall not be liable for any damages arising from your use of our calculators or website, including but not limited to direct, indirect, incidental, or consequential damages.
              </p>
              <p>
                You use our calculators at your own risk and are solely responsible for any decisions you make based on calculator results.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Intellectual Property
              </h2>
              <p>
                All content on FigureFinance, including text, graphics, logos, and software, is the property of FigureFinance and protected by copyright laws. You may not reproduce, distribute, or create derivative works without permission.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Prohibited Uses
              </h2>
              <p>
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our calculators for any illegal purpose</li>
                <li>Attempt to interfere with or disrupt our website</li>
                <li>Scrape, copy, or republish our content without permission</li>
                <li>Use automated systems to access our website excessively</li>
              </ul>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                External Links
              </h2>
              <p>
                Our website may contain links to external websites. We are not responsible for the content, privacy practices, or terms of use of external sites.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the website after changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Termination
              </h2>
              <p>
                We reserve the right to terminate or restrict your access to our website at any time, without notice, for any reason.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Governing Law
              </h2>
              <p>
                These Terms of Use are governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Contact Us
              </h2>
              <p>
                If you have questions about these Terms of Use, contact us at{' '}
                <a href="mailto:legal@figurefinance.co" className="text-[--color-primary-600] hover:underline">
                  legal@figurefinance.co
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
