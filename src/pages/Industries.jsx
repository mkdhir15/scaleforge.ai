import { Helmet } from 'react-helmet-async';
import {
  Building2, Scissors, Dumbbell, UtensilsCrossed,
  Home as HomeIcon, GraduationCap, ShoppingCart, Wrench,
  ArrowRight,
} from 'lucide-react';
import AnimatedContent from '../ui/AnimatedContent';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

const INDUSTRIES = [
  {
    icon: <Building2 size={28} />,
    name: 'Clinics & Healthcare',
    pain: 'Missed appointments, slow follow-ups, manual patient communication.',
    fix: 'Appointment booking automation, WhatsApp reminders, AI receptionist for after-hours queries.',
  },
  {
    icon: <Scissors size={28} />,
    name: 'Salons & Spas',
    pain: 'No-shows, manual booking, repeat customers slipping away.',
    fix: 'Online booking, automated reminders, loyalty follow-up sequences.',
  },
  {
    icon: <Dumbbell size={28} />,
    name: 'Gyms & Fitness',
    pain: 'Lead follow-up delays, class scheduling headaches, member churn.',
    fix: 'AI lead capture, automated class reminders, membership renewal workflows.',
  },
  {
    icon: <UtensilsCrossed size={28} />,
    name: 'Restaurants & Cafés',
    pain: 'Reservation chaos, review management, inconsistent customer communication.',
    fix: 'Booking automation, WhatsApp ordering, review request follow-ups.',
  },
  {
    icon: <HomeIcon size={28} />,
    name: 'Real Estate',
    pain: 'Hundreds of leads, manual qualification, lost deals from slow response.',
    fix: 'AI lead scoring, instant WhatsApp/email replies, CRM automation.',
  },
  {
    icon: <GraduationCap size={28} />,
    name: 'Coaching Institutes',
    pain: 'Ad leads going cold, manual enrollment tracking, follow-up fatigue.',
    fix: 'Instant lead response, automated nurture sequences, enrollment pipeline automation.',
  },
  {
    icon: <ShoppingCart size={28} />,
    name: 'E-Commerce',
    pain: 'Repetitive support queries, abandoned carts, order status calls.',
    fix: 'WhatsApp AI support, abandoned cart recovery, automated order updates.',
  },
  {
    icon: <Wrench size={28} />,
    name: 'Service Businesses',
    pain: 'Quotes sent but never followed up, scheduling conflicts, invoicing delays.',
    fix: 'Quote follow-up automation, booking + dispatch workflows, invoice reminders.',
  },
];

const Industries = () => (
  <>
    <Helmet>
      <title>Industries — ScaleForge.AI</title>
      <meta name="description" content="AI automation solutions for clinics, salons, gyms, restaurants, real estate, coaching institutes, e-commerce, and service businesses." />
    </Helmet>

    <AnimatedContent>
      <section className="section-padding text-center">
        <div className="max-w-container">
          <SectionHeading
            title="Industries We Serve"
            subtitle="We work with businesses where time is money, follow-ups matter, and manual processes are the biggest bottleneck."
          />
        </div>
      </section>
    </AnimatedContent>

    <AnimatedContent>
      <section className="section-padding-sm" style={{ background: 'var(--color-bg-card)' }}>
        <div className="max-w-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(108,92,231,0.1)', color: 'var(--color-indigo)' }}
                  >
                    {ind.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">{ind.name}</h3>
                </div>
                <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  <strong className="text-text-primary">Common pain:</strong> {ind.pain}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <strong className="text-text-primary">How we help:</strong> {ind.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedContent>

    <AnimatedContent>
      <section className="section-padding text-center">
        <div className="max-w-container">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Don't see your industry?
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-text-muted)' }}>
            If your business involves repetitive tasks, customer communication, or manual data entry — we can probably help. Let's talk.
          </p>
          <CTAButton to="/contact" size="lg" icon={<ArrowRight size={18} />}>
            Book a Free Strategy Call
          </CTAButton>
        </div>
      </section>
    </AnimatedContent>
  </>
);

export default Industries;
