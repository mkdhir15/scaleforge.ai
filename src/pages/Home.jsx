import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronDown, Lightbulb, Handshake, Rocket, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import LaserFlow from '../ui/LaserFlow';
import BlurText from '../ui/BlurText';
import GradientText from '../ui/GradientText';
import LogoLoop from '../ui/LogoLoop';
import AnimatedContent from '../ui/AnimatedContent';
import CTAButton from '../components/CTAButton';
import SectionHeading from '../components/SectionHeading';

/* ── LogoLoop data ── */
const TOOL_LOGOS = [
  { name: 'WhatsApp Business API' },
  { name: 'Google Calendar' },
  { name: 'Zapier' },
  { name: 'Make' },
  { name: 'Google Workspace' },
  { name: 'Twilio' },
];

/* ── How it works ── */
const STEPS = [
  { num: '01', title: 'Discovery Call', desc: `We learn about your business, pain points, and goals. No jargon — just a clear conversation about what's slowing you down.` },
  { num: '02', title: 'Custom Strategy', desc: 'We map out exactly which automations or website improvements will give you the highest ROI, and present a clear plan.' },
  { num: '03', title: 'Build & Launch', desc: 'We build, test, and deploy everything. You get a working system, not a pitch deck.' },
  { num: '04', title: 'Optimize & Support', desc: 'We monitor performance, fix issues, and continuously improve — so your systems keep getting better over time.' },
];

/* ── Why ScaleForge values ── */
const VALUES = [
  { icon: <Lightbulb size={24} />, title: 'Owner-led, hands-on', desc: `You work directly with the person who builds your system — not a sales rep who disappears after the contract is signed.` },
  { icon: <Handshake size={24} />, title: 'Built for real ROI', desc: `We don't sell "digital transformation." We build specific automations that save you measurable time and money.` },
  { icon: <ShieldCheck size={24} />, title: 'No lock-in', desc: `Everything we build, you own. No proprietary platforms, no vendor lock-in. If you ever want to leave, you take it all with you.` },
  { icon: <Rocket size={24} />, title: 'Fast execution', desc: `Most projects go from kickoff to live in 1–3 weeks. We move fast because we respect your time (and ours).` },
];

/* ── FAQ ── */
const FAQS = [
  { q: 'What kind of businesses do you work with?', a: `We work primarily with SMBs — clinics, salons, gyms, restaurants, coaching institutes, real estate agencies, e-commerce brands, and other service businesses. If your team wastes time on repetitive tasks, we can probably help.` },
  { q: 'Do I need technical knowledge to use the automations you build?', a: `Not at all. Everything we build is designed to run in the background. You get a simple dashboard and clear documentation — no coding required on your end.` },
  { q: 'How long does a typical project take?', a: `Most automation projects take 1–3 weeks from kickoff to launch. Website projects typically take 2–4 weeks depending on scope. We'll give you a clear timeline on the discovery call.` },
  { q: 'What does it cost?', a: `Every project is scoped individually based on complexity and impact. We'll give you a transparent quote after the discovery call — no hidden fees, no surprises.` },
  { q: 'Can you integrate with tools I already use?', a: `Yes. We work with WhatsApp Business API, Google Workspace, Zapier, Make, most CRMs, calendar tools, and payment gateways. If your tool has an API, we can probably connect it.` },
  { q: 'What if something breaks after launch?', a: `We provide ongoing support and monitoring. If something breaks, we fix it — usually within hours, not days. We also proactively optimize your systems over time.` },
  { q: 'Is my data safe?', a: `Absolutely. We follow industry best practices for data security. Your data stays in your accounts — we don't store customer data on our servers.` },
];

/* ── FAQ Accordion Item ── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-xl transition-colors"
      style={{
        borderColor: open ? 'rgba(108,92,231,0.3)' : 'var(--color-border-subtle)',
        background: open ? 'rgba(108,92,231,0.04)' : 'transparent',
      }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)' }}
      >
        <span className="font-heading font-semibold text-base pr-4">{q}</span>
        <ChevronDown
          size={20}
          className="flex-shrink-0"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--color-text-muted)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {a}
        </p>
      </div>
    </div>
  );
};

/* ── Inline CTA block ── */
const SectionCTA = () => (
  <div className="flex justify-center py-8">
    <CTAButton to="/contact" size="md" icon={<ArrowRight size={16} />}>
      Book a Free Strategy Call
    </CTAButton>
  </div>
);

/* ══════════════════════════════════════════════════
   HOME PAGE
   Section order: Hero → LogoLoop → How It Works → Why Us → Testimonials → FAQ → Final CTA
   ══════════════════════════════════════════════════ */
const Home = () => (
  <>
    <Helmet>
      <title>ScaleForge.AI — AI Automation &amp; Web Development for SMBs</title>
      <meta
        name="description"
        content="ScaleForge.AI helps small and mid-size businesses automate repetitive work and build high-converting websites. AI lead capture, WhatsApp bots, workflow automation, and more."
      />
    </Helmet>

    {/* ── HERO + GLOW WRAPPER ── */}
    {/* The glow-trail div extends the LaserFlow visual below the hero,
        creating a gradual fade rather than a hard cut. */}
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <LaserFlow
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          color="#9B7AFF"
          verticalSizing={2.5}
          horizontalSizing={0.5}
          wispDensity={0.8}
          wispSpeed={12}
          wispIntensity={4}
          flowSpeed={0.3}
          flowStrength={0.2}
          fogIntensity={0.4}
          fogScale={0.25}
          fogFallSpeed={0.5}
          decay={1.1}
          falloffStart={1.2}
        />
        <div className="relative z-10 max-w-container text-center py-24 md:py-32">
          <AnimatedContent>
            <BlurText
              text="Stop Doing Everything Manually."
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary justify-center mb-2"
              delay={100}
              animateBy="words"
            />
          </AnimatedContent>
          <AnimatedContent delay={0.3}>
            <p className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold mt-4 mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Let AI <GradientText>automate</GradientText> the work your team shouldn't be doing.
            </p>
          </AnimatedContent>
          <AnimatedContent delay={0.5}>
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-10" style={{ color: 'var(--color-text-muted)' }}>
              We build AI-powered automations and modern websites for clinics, salons, coaching institutes, and growing businesses — so you can focus on what actually matters.
            </p>
          </AnimatedContent>
          <AnimatedContent delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton to="/contact" size="lg" icon={<ArrowRight size={18} />}>
                Book a Free Strategy Call
              </CTAButton>
              <CTAButton to="/services" size="lg" variant="secondary">
                See What We Build
              </CTAButton>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Glow trail — extends the light-pillar effect below the hero */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          bottom: '-30vh',
          left: 0,
          right: 0,
          height: '40vh',
          background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(155,92,246,0.08) 0%, rgba(110,198,255,0.03) 40%, transparent 80%)',
          zIndex: 0,
        }}
      />
    </div>

    {/* ── TRUSTED TOOLS ── */}
    <AnimatedContent>
      <section className="section-padding-sm" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
        <p className="text-center text-sm font-medium mb-6" style={{ color: 'var(--color-text-dimmed)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Built with tools you already trust
        </p>
        <LogoLoop logos={TOOL_LOGOS} speed={30} />
      </section>
    </AnimatedContent>

    {/* ── HOW IT WORKS — alternating left/right layout ── */}
    <AnimatedContent>
      <section className="section-padding">
        <div className="max-w-container">
          <SectionHeading
            title="How It Works"
            subtitle="Four steps. No mystery. No months of discovery phases."
          />
          <div className="mt-12 space-y-8 lg:space-y-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-10 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Step number badge */}
                <div className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(108,92,231,0.06)', border: '1px solid rgba(108,92,231,0.15)' }}>
                  <span className="font-heading text-3xl font-bold" style={{ color: 'var(--color-indigo)' }}>{step.num}</span>
                </div>
                {/* Text */}
                <div className={`flex-1 ${i % 2 !== 0 ? 'lg:text-right' : ''}`}>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedContent>
    <SectionCTA />

    {/* ── WHY SCALEFORGE.AI — alternating cards ── */}
    <AnimatedContent>
      <section className="section-padding" style={{ background: 'var(--color-bg-card)' }}>
        <div className="max-w-container">
          <SectionHeading
            title="Why ScaleForge.AI"
            subtitle={`We're not a large agency. That's the point.`}
          />
          <div className="mt-12 space-y-6">
            {VALUES.map((item, i) => (
              <div
                key={item.title}
                className={`flex flex-col md:flex-row items-start gap-5 md:gap-8 glass-card p-6 md:p-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(108,92,231,0.1)', color: 'var(--color-indigo)' }}>
                  {item.icon}
                </div>
                <div className={`flex-1 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedContent>
    <SectionCTA />

    {/* ── TESTIMONIALS PLACEHOLDER ── */}
    <AnimatedContent>
      <section className="section-padding">
        <div className="max-w-container">
          <SectionHeading title="What Our Clients Say" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
            {/* Left — placeholder quote */}
            <div className="glass-card p-8 flex flex-col justify-center">
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                "Client testimonials will appear here once we have explicit permission to share them. We believe in earning trust through real results — not fabricated quotes."
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-dimmed)' }}>
                — Placeholder: real testimonials coming soon
              </p>
            </div>
            {/* Right — value prop context */}
            <div className="glass-card p-8 flex flex-col justify-center">
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">Why we don't fake it</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Many agencies fill this section with made-up quotes from stock-photo "clients." We'd rather leave it empty until we can fill it with real words from real people. When our clients are ready to share, you'll see their stories here.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedContent>
    <SectionCTA />

    {/* ── FAQ — left heading, right accordion ── */}
    <AnimatedContent>
      <section className="section-padding" style={{ background: 'var(--color-bg-card)' }}>
        <div className="max-w-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left — heading */}
            <div className="lg:col-span-2">
              <SectionHeading
                title="Frequently Asked Questions"
                subtitle="Straight answers to the questions we hear most."
              />
            </div>
            {/* Right — accordion */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedContent>

    {/* ── FINAL CTA ── */}
    <AnimatedContent>
      <section className="section-padding">
        <div className="max-w-container text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Ready to stop doing everything manually?
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Book a free strategy call. We'll look at your workflows, identify the biggest time-wasters, and show you exactly what we'd automate — no pressure, no commitment.
          </p>
          <CTAButton to="/contact" size="lg" icon={<ArrowRight size={18} />}>
            Book a Free Strategy Call
          </CTAButton>
        </div>
      </section>
    </AnimatedContent>
  </>
);

export default Home;
