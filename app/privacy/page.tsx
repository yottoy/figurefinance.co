import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-[--color-slate-50] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />
            <h1 className="text-4xl md:text-5xl font-bold text-[--color-slate-900] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[--color-slate-600]">Last updated: January 19, 2026</p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6 text-[--color-slate-700]">
              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4">
                Introduction
              </h2>
              <p>
                FigureFinance ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our website and calculators.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2">
                Calculator Inputs
              </h3>
              <p>
                All calculator inputs (loan amounts, interest rates, payment information, etc.) are processed locally in your browser. We do not store, transmit, or have access to any financial information you enter into our calculators.
              </p>

              <h3 className="text-xl font-semibold text-[--color-slate-900] mb-2 mt-6">
                Analytics Information
              </h3>
              <p>
                We use Google Analytics to understand how visitors use our website. This service collects:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pages visited and time spent on each page</li>
                <li>Browser type and device information</li>
                <li>Approximate location (city/region level)</li>
                <li>Referring websites</li>
              </ul>
              <p className="mt-4">
                This information is anonymized and does not include any personal or financial data from calculator usage.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                How We Use Information
              </h2>
              <p>
                We use analytics data to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Improve our calculators and website</li>
                <li>Understand which tools are most helpful</li>
                <li>Fix technical issues</li>
              </ul>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Cookies
              </h2>
              <p>
                We use cookies for Google Analytics only. These cookies help us understand website traffic patterns. You can disable cookies in your browser settings, though some features may not work properly.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Third-Party Services
              </h2>
              <p>
                We use Google Analytics, which is operated by Google Inc. Google's use of data is described in their Privacy Policy at{' '}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-[--color-primary-600] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/privacy
                </a>
                .
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Data Security
              </h2>
              <p>
                Since we don't collect or store your financial information, there's no sensitive data to protect. All calculator computations happen locally in your browser.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Children's Privacy
              </h2>
              <p>
                Our website is not directed to children under 13. We do not knowingly collect information from children under 13.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-[--color-slate-900] mb-4 mt-8">
                Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, contact us at{' '}
                <a href="mailto:privacy@figurefinance.co" className="text-[--color-primary-600] hover:underline">
                  privacy@figurefinance.co
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
