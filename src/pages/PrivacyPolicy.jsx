import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy — ScaleForge.AI</title>
      <meta name="description" content="Privacy Policy for ScaleForge.AI. Learn how we collect, use, and protect your personal information." />
    </Helmet>

    <section className="section-padding">
      <div className="max-w-container" style={{ maxWidth: '48rem' }}>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-sm mb-10" style={{ color: 'var(--color-text-dimmed)' }}>Last updated: July 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">1. Introduction</h2>
            <p>
              ScaleForge.AI ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">2. Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-text-primary">Contact Information:</strong> Name, email address, phone number, and company name — when you fill out our contact form or reach out to us directly.</li>
              <li><strong className="text-text-primary">Usage Data:</strong> Pages visited, time spent on the site, browser type, and device information — collected automatically through standard analytics tools.</li>
              <li><strong className="text-text-primary">Communication Data:</strong> Any messages, inquiries, or feedback you send us.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to your inquiries and provide our services</li>
              <li>To send you relevant information about our services (only if you've opted in)</li>
              <li>To improve our website and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">4. Data Storage & Security</h2>
            <p>
              Your data is stored securely using industry-standard encryption and access controls. Contact form submissions are stored in a secure database (Supabase, hosted on AWS). We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">5. Third-Party Services</h2>
            <p>
              We may use third-party services (e.g., analytics, hosting, email delivery) that have their own privacy policies. We only work with providers who maintain reasonable data protection standards.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">6. Cookies</h2>
            <p>
              Our website may use essential cookies to ensure basic functionality. We do not use tracking cookies for advertising purposes. You can disable cookies in your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">7. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent for data processing at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or want to exercise your data rights, contact us at:{' '}
              <a href="mailto:mkdhirsystems@gmail.com" className="font-medium transition-colors" style={{ color: 'var(--color-indigo)' }}>
                mkdhirsystems@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  </>
);

export default PrivacyPolicy;
