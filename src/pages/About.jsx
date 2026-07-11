import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import AnimatedContent from '../ui/AnimatedContent';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

const About = () => (
  <>
    <Helmet>
      <title>About — ScaleForge.AI</title>
      <meta name="description" content="ScaleForge.AI is an owner-operated AI automation and web development agency. We help small businesses automate the work that's slowing them down." />
    </Helmet>

    {/* Hero */}
    <AnimatedContent>
      <section className="section-padding text-center">
        <div className="max-w-container">
          <SectionHeading
            title="Built by Someone Who Gets It"
            subtitle="ScaleForge.AI isn't a big agency with layers of project managers. It's one person who actually builds the systems — working directly with you."
          />
        </div>
      </section>
    </AnimatedContent>

    {/* Story */}
    <AnimatedContent>
      <section className="section-padding-sm" style={{ background: 'var(--color-bg-card)' }}>
        <div className="max-w-container max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6">The Story</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            <p>
              I started ScaleForge.AI because I kept seeing the same problem: small businesses wasting hours every day on work that should be automated. Manually replying to every WhatsApp message. Copy-pasting leads into spreadsheets. Forgetting to follow up — and losing customers because of it.
            </p>
            <p>
              These aren't "enterprise problems" that need six-figure consulting engagements. They're straightforward workflow problems that can be solved with the right automations and a well-built website. That's what I do.
            </p>
            <p>
              I build AI-powered automations and modern websites for SMBs — clinics, coaching institutes, salons, restaurants, and other service businesses. Everything is custom-built for your specific setup, not a one-size-fits-all template.
            </p>
          </div>
        </div>
      </section>
    </AnimatedContent>

    {/* Mission */}
    <AnimatedContent>
      <section className="section-padding">
        <div className="max-w-container max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6">The Mission</h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Make AI automation accessible and practical for small businesses — not just the companies that can afford six-figure tech budgets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'No jargon', desc: `I explain everything in plain language. If I can't explain it simply, I haven't understood it well enough.` },
              { title: 'No lock-in', desc: 'Everything I build, you own. No proprietary platforms, no hostage situations.' },
              { title: 'No vanity projects', desc: 'Every automation I build is tied to a specific business outcome — saving time, capturing more leads, or reducing costs.' },
              { title: 'No disappearing acts', desc: `I'm the person who builds your system and the person who supports it. You'll never be transferred to "a team member."` },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6">
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedContent>

    {/* Small is a strength */}
    <AnimatedContent>
      <section className="section-padding-sm" style={{ background: 'var(--color-bg-card)' }}>
        <div className="max-w-container max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
            "Small and Hands-On" Is a Feature, Not a Limitation
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
            You're not getting the B-team or the intern. You're getting the person who built this entire platform — the same person who'll build your automation, answer your questions, and fix things if they break. That's the advantage of working with someone who actually cares about the outcome.
          </p>
        </div>
      </section>
    </AnimatedContent>

    {/* CTA */}
    <AnimatedContent>
      <section className="section-padding text-center">
        <div className="max-w-container">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Let's talk about your business
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-text-muted)' }}>
            No pitch. No pressure. Just a conversation about what's slowing you down and how automation might help.
          </p>
          <CTAButton to="/contact" size="lg" icon={<ArrowRight size={18} />}>
            Book a Free Strategy Call
          </CTAButton>
        </div>
      </section>
    </AnimatedContent>
  </>
);

export default About;
