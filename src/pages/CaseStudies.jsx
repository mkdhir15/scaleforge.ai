import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import AnimatedContent from '../ui/AnimatedContent';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

const CASE_STUDIES = [
  {
    type: 'Dental Clinic',
    industry: 'Healthcare',
    problem: 'Missed 40% of appointment reminders, leading to high no-show rates and lost revenue. Front-desk staff spent hours every day manually calling patients.',
    solution: 'Automated WhatsApp reminders sent 24 hours and 2 hours before each appointment. AI rescheduling bot lets patients reschedule with a single message — no phone call needed. All synced with their clinic management system.',
    result: '200+ appointment reminders automated per month. No-show rate dropped from 35% to under 10%. Front-desk staff freed up 15+ hours/week.',
  },
  {
    type: 'Coaching Institute',
    industry: 'Education',
    problem: 'Running Facebook and Instagram ads generating 500+ leads/month, but the sales team was manually messaging each lead on WhatsApp. Response time averaged 6 hours — by which point most leads had gone cold.',
    solution: 'AI Lead Capture bot instantly replies to every new lead on WhatsApp within seconds. Automated 5-step nurture sequence sends follow-ups over 7 days. Hot leads flagged in CRM for immediate human callback.',
    result: 'Lead response time dropped from 6 hours to under 2 minutes. Conversion rate roughly doubled. Sales team now focuses only on warm, qualified leads.',
  },
  {
    type: 'E-Commerce Brand',
    industry: 'Retail / Online',
    problem: `Customer support team overwhelmed by repetitive queries: "Where's my order?", "How do I return this?", "Is this in stock?" — the same 10 questions, hundreds of times per week.`,
    solution: `WhatsApp AI agent trained on the brand's FAQ, order tracking API, and return policy. Handles order status checks, return initiation, and product inquiries. Escalates only genuinely complex issues to a human agent.`,
    result: '70% of support queries resolved without human intervention. Average response time dropped from 4 hours to instant. Support team refocused on growth and partnerships.',
  },
  {
    type: 'Real Estate Agency',
    industry: 'Real Estate',
    problem: 'Leads from property portals and Google Ads were entered into spreadsheets manually. Follow-ups happened when the sales team remembered — which meant most leads were contacted too late.',
    solution: 'AI Lead Capture automatically pulls leads from all sources into the CRM, scores them by intent, and triggers instant WhatsApp + email responses. Automated follow-up sequences run for 14 days.',
    result: 'Zero leads lost to manual entry. Response time under 5 minutes for every lead. Sales pipeline visibility improved dramatically.',
  },
  {
    type: 'Salon Chain',
    industry: 'Beauty & Wellness',
    problem: 'High no-show rate, especially for weekend appointments. Manual rebooking was inconsistent — customers who cancelled often never came back.',
    solution: 'Appointment Booking automation with WhatsApp reminders 48h and 3h before appointments. Automated rebooking offer sent within minutes of any cancellation.',
    result: 'No-show rate reduced by over 50%. Cancelled appointment slots re-filled automatically. Monthly revenue recovered from reduced gaps.',
  },
];

const CaseStudies = () => (
  <>
    <Helmet>
      <title>Case Studies — ScaleForge.AI</title>
      <meta name="description" content="See how AI automation solves real business problems — appointment reminders, lead follow-ups, customer support, and more. Illustrative examples from ScaleForge.AI." />
    </Helmet>

    <AnimatedContent>
      <section className="section-padding text-center">
        <div className="max-w-container">
          <SectionHeading
            title="Case Studies"
            subtitle="Real-world scenarios showing how automation solves common business problems. Each example represents the kind of work we do — with realistic outcomes based on industry benchmarks."
          />
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-dimmed)', fontStyle: 'italic' }}>
            All case studies below are illustrative examples — not specific client claims.
          </p>
        </div>
      </section>
    </AnimatedContent>

    <AnimatedContent>
      <section className="section-padding-sm" style={{ background: 'var(--color-bg-card)' }}>
        <div className="max-w-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs, i) => (
              <div key={i} className="glass-card p-6 flex flex-col">
                {/* Label */}
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full self-start mb-4"
                  style={{ background: 'rgba(0,217,192,0.1)', color: 'var(--color-teal)' }}
                >
                  Illustrative example
                </span>

                {/* Header */}
                <h3 className="font-heading text-xl font-bold text-text-primary mb-1">{cs.type}</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--color-text-dimmed)' }}>{cs.industry}</p>

                {/* Content */}
                <div className="space-y-3 flex-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <div>
                    <p className="font-semibold text-text-primary text-xs uppercase tracking-wide mb-1">Problem</p>
                    <p>{cs.problem}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-xs uppercase tracking-wide mb-1">Solution</p>
                    <p>{cs.solution}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-xs uppercase tracking-wide mb-1">Result</p>
                    <p>{cs.result}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                  <CTAButton to="/contact" size="sm" variant="secondary">
                    Get similar results
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedContent>

    {/* Final CTA */}
    <AnimatedContent>
      <section className="section-padding text-center">
        <div className="max-w-container">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Want to see what this would look like for your business?
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Every business is different. Let's talk about your specific pain points and map out an automation strategy that actually makes sense.
          </p>
          <CTAButton to="/contact" size="lg" icon={<ArrowRight size={18} />}>
            Book a Free Strategy Call
          </CTAButton>
        </div>
      </section>
    </AnimatedContent>
  </>
);

export default CaseStudies;
