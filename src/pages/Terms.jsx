import { Helmet } from 'react-helmet-async';

const Terms = () => (
  <>
    <Helmet>
      <title>Terms of Service — ScaleForge.AI</title>
      <meta name="description" content="Terms of Service for ScaleForge.AI. Read our terms regarding services, intellectual property, liability, and more." />
    </Helmet>

    <section className="section-padding">
      <div className="max-w-container" style={{ maxWidth: '48rem' }}>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">Terms of Service</h1>
        <p className="text-sm mb-10" style={{ color: 'var(--color-text-dimmed)' }}>Last updated: July 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the ScaleForge.AI website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">2. Services</h2>
            <p>
              ScaleForge.AI provides AI automation solutions and web development services for businesses. The specific scope, deliverables, and timeline for each project are agreed upon individually and documented in a project proposal or contract before work begins.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">3. Intellectual Property</h2>
            <p className="mb-2">
              Unless otherwise stated in a project agreement:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>All custom work (automations, websites, integrations) built for you is owned by you upon full payment.</li>
              <li>We retain the right to use general knowledge, techniques, and non-proprietary tools developed during the project.</li>
              <li>Pre-existing tools, libraries, or frameworks used in your project remain the property of their respective owners.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">4. Payment Terms</h2>
            <p>
              Payment terms are specified in individual project proposals. Unless otherwise agreed, a deposit is required before work begins, with the remaining balance due upon project completion. Late payments may result in service suspension.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">5. Client Responsibilities</h2>
            <p className="mb-2">To ensure successful project delivery, clients are expected to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide timely access to required accounts, tools, and information</li>
              <li>Respond to requests for feedback or approvals within a reasonable timeframe</li>
              <li>Ensure that any content or data provided is accurate and does not infringe third-party rights</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">6. Limitation of Liability</h2>
            <p>
              ScaleForge.AI shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability for any claim shall not exceed the total fees paid by the client for the specific project in question.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">7. Termination</h2>
            <p>
              Either party may terminate a project engagement with written notice. In the event of termination, the client shall pay for all work completed up to the termination date. We will provide all deliverables completed to that point.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">8. Confidentiality</h2>
            <p>
              We treat all client information as confidential. We will not disclose your business data, strategies, or project details to third parties without your explicit written consent — unless required by law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">9. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our services after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">10. Contact</h2>
            <p>
              For questions about these Terms of Service, contact us at:{' '}
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

export default Terms;
