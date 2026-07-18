import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, ArrowRight, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import AnimatedContent from '../ui/AnimatedContent';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

// Initialize Supabase Client configs for Edge Function invocation
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const isConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/**
 * Submits contact lead directly to your Supabase Edge Function handler.
 * The Edge Function takes care of rate limiting, database insertion, and sending notifications.
 */
async function submitContactForm(data) {
  if (!isConfigured) {
    console.warn('[Contact] Supabase credentials missing — simulating success for dev.');
    return { success: true, simulated: true };
  }

  // Call your deployed Supabase Edge Function directly via HTTP POST
  // Inside your React Contact Component file:
const res = await fetch(`${SUPABASE_URL}/functions/v1/super-handler`, { // <-- Changed to match your live function
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_KEY}`,
  },
  body: JSON.stringify({
    senderName: data.name,
    senderEmail: data.email,
    companyName: data.company || 'Not provided',
    serviceInterested: data.service || 'Not specified',
    messageBody: data.message,
    fax_number: data.fax_number || '' 
  }),
});
  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Check if the response failed specifically due to a 429 Rate Limit block
    if (res.status === 429) {
      throw new Error('Too many requests. Please wait an hour before submitting another message.');
    }
    throw new Error(result.error || 'Submission failed. Please try again or contact us directly.');
  }

  return result;
}

/* ── Form options ── */
const SERVICES_OPTIONS = [
  'AI Lead Capture',
  'WhatsApp AI Replies',
  'Voice Agents',
  'CRM Automation',
  'Workflow Automation',
  'Appointment Booking',
  'Document Processing',
  'Follow-up Automation',
  'Dashboard / Reporting',
  'Website Design & Development',
  'Not sure yet — need advice',
];

const initialForm = { name: '', email: '', company: '', message: '', service: '', fax_number: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      await submitContactForm(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again or email us directly at mkdhirsystems@gmail.com');
    }
  };

  const inputStyle = {
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const inputFocusStyle = 'rgba(108,92,231,0.5)';

  return (
    <>
      <Helmet>
        <title>Contact — ScaleForge.AI</title>
        <meta name="description" content="Get in touch with ScaleForge.AI. Book a free strategy call or send us a message — we reply within 24 hours." />
      </Helmet>

      <AnimatedContent>
        <section className="section-padding text-center">
          <div className="max-w-container">
            <SectionHeading
              title="Let's Talk"
              subtitle={`Tell us about your business and what's slowing you down. We'll get back to you within 24 hours with honest, actionable advice — no hard sell.`}
            />
          </div>
        </section>
      </AnimatedContent>

      <AnimatedContent>
        <section className="section-padding-sm" style={{ background: 'var(--color-bg-card)' }}>
          <div className="max-w-container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Form — 3 cols */}
              <div className="lg:col-span-3">
                {status === 'success' ? (
                  <div className="glass-card p-10 text-center">
                    <CheckCircle size={48} style={{ color: 'var(--color-teal)', margin: '0 auto 1rem' }} />
                    <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">Message sent!</h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <div className="mt-6">
                      <CTAButton onClick={() => setStatus('idle')} variant="secondary" size="sm">
                        Send another message
                      </CTAButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5" noValidate>
                    {status === 'error' && (
                      <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)' }}>
                        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" style={{ color: '#FF4757' }} />
                        <p className="text-sm" style={{ color: '#FF4757' }}>{errorMsg}</p>
                      </div>
                    )}

                    {/* Honeypot Field — completely invisible to humans but catches bots */}
                    <input
                      type="text"
                      name="fax_number"
                      value={form.fax_number}
                      onChange={handleChange}
                      style={{ display: 'none !important', position: 'absolute', width: '0', height: '0', opacity: '0', zIndex: '-1' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        style={{ ...inputStyle, borderColor: errors.name ? '#FF4757' : undefined }}
                        onFocus={(e) => (e.target.style.borderColor = inputFocusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = errors.name ? '#FF4757' : 'var(--color-border-subtle)')}
                      />
                      {errors.name && <p className="text-xs mt-1" style={{ color: '#FF4757' }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        style={{ ...inputStyle, borderColor: errors.email ? '#FF4757' : undefined }}
                        onFocus={(e) => (e.target.style.borderColor = inputFocusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = errors.email ? '#FF4757' : 'var(--color-border-subtle)')}
                      />
                      {errors.email && <p className="text-xs mt-1" style={{ color: '#FF4757' }}>{errors.email}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company name (optional)"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = inputFocusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--color-border-subtle)')}
                      />
                    </div>

                    {/* Service interested */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">Service interested in</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                        onFocus={(e) => (e.target.style.borderColor = inputFocusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--color-border-subtle)')}
                      >
                        <option value="">Select a service (optional)</option>
                        {SERVICES_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your business and what you're looking to automate..."
                        rows={5}
                        style={{ ...inputStyle, resize: 'vertical', borderColor: errors.message ? '#FF4757' : undefined }}
                        onFocus={(e) => (e.target.style.borderColor = inputFocusStyle)}
                        onBlur={(e) => (e.target.style.borderColor = errors.message ? '#FF4757' : 'var(--color-border-subtle)')}
                      />
                      {errors.message && <p className="text-xs mt-1" style={{ color: '#FF4757' }}>{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <CTAButton
                      onClick={handleSubmit}
                      size="md"
                      icon={status === 'sending' ? null : <Send size={16} />}
                      className="w-full justify-center"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </CTAButton>
                  </form>
                )}
              </div>

              {/* Sidebar — 2 cols */}
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">Direct Contact</h3>
                  <div className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    <p className="flex items-center gap-2">
                      <Mail size={16} style={{ color: 'var(--color-indigo)', flexShrink: 0 }} />
                      <a href="mailto:mkdhirsystems@gmail.com" className="hover:text-text-primary transition-colors">
                        mkdhirsystems@gmail.com
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={16} style={{ color: 'var(--color-indigo)', flexShrink: 0 }} />
                      <a href="tel:+917986378263" className="hover:text-text-primary transition-colors">
                        +91 79863-78263
                      </a>
                    </p>
                    <p>
                      <strong className="text-text-primary">Response time:</strong> Within 24 hours
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">Prefer a Call?</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    Skip the form — call us directly or send a WhatsApp message and we'll discuss your business.
                  </p>
                  <div className="flex gap-3">
                    <CTAButton href="tel:+917986378263" size="sm" variant="secondary" icon={<Phone size={14} />}>
                      Call Now
                    </CTAButton>
                    <CTAButton href="https://wa.me/917986378263" size="sm" variant="secondary" icon={<ArrowRight size={14} />}>
                      WhatsApp
                    </CTAButton>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">What happens next?</h3>
                  <ol className="space-y-2 text-sm" style={{ color: 'var(--color-text-muted)', listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      'We read your message and reply within 24 hours.',
                      `If there's a fit, we schedule a 20-minute strategy call.`,
                      'We present a clear plan with timeline and pricing.',
                      'You decide — no pressure, no follow-up spam.',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-heading font-bold text-text-primary flex-shrink-0">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>
    </>
  );
};

export default Contact;