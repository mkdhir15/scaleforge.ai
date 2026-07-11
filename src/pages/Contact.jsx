import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, ArrowRight, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import AnimatedContent from '../ui/AnimatedContent';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

/* ──────────────────────────────────────────────
   DUAL SUBMISSION: Supabase (DB) + EmailJS (email notification)
   
   Both are required for full functionality:
   • Supabase saves every lead to a database table (persistence)
   • EmailJS sends a notification email to mkdhirsystems@gmail.com
   
   See SETUP_GUIDE.md at project root for activation steps.
   ────────────────────────────────────────────── */

// ── Supabase config ──
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

// ── EmailJS config ──
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const emailjsConfigured = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

const bothConfigured = supabaseConfigured && emailjsConfigured;
const eitherConfigured = supabaseConfigured || emailjsConfigured;

/**
 * Save lead to Supabase database.
 * Returns { success: true } on insert, throws on failure.
 */
async function saveToDatabase(data) {
  if (!supabaseConfigured) {
    console.warn('[Contact] Supabase not configured — skipping DB insert.');
    return { success: false, skipped: true };
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: data.message,
      service_interested: data.service || null,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Database save failed: ${err}`);
  }

  return { success: true };
}

/**
 * Send email notification via EmailJS.
 * Sends all lead details to mkdhirsystems@gmail.com.
 */
async function sendEmailNotification(data) {
  if (!emailjsConfigured) {
    console.warn('[Contact] EmailJS not configured — skipping email notification.');
    return { success: false, skipped: true };
  }

  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    company: data.company || 'Not provided',
    service: data.service || 'Not specified',
    message: data.message,
    to_email: 'mkdhirsystems@gmail.com',
  };

  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
  return { success: true };
}

/**
 * Submit lead: saves to DB AND sends email notification.
 * Both run in parallel. DB save is the primary requirement;
 * email notification is secondary but important.
 */
async function submitContactForm(data) {
  if (!eitherConfigured) {
    console.warn('[Contact] Neither Supabase nor EmailJS configured. Simulating success for dev.');
    return { dbSaved: false, emailSent: false, simulated: true };
  }

  const results = await Promise.allSettled([
    saveToDatabase(data),
    sendEmailNotification(data),
  ]);

  const dbResult = results[0];
  const emailResult = results[1];

  const dbSaved = dbResult.status === 'fulfilled' && dbResult.value?.success;
  const emailSent = emailResult.status === 'fulfilled' && emailResult.value?.success;

  // Log any failures for debugging
  if (dbResult.status === 'rejected') console.error('[Contact] DB save failed:', dbResult.reason);
  if (emailResult.status === 'rejected') console.error('[Contact] Email send failed:', emailResult.reason);

  // If BOTH fail, throw so the user sees an error
  if (!dbSaved && !emailSent && !results.some(r => r.value?.skipped)) {
    throw new Error('Submission failed. Please try again or contact us directly at mkdhirsystems@gmail.com');
  }

  return { dbSaved, emailSent };
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

const initialForm = { name: '', email: '', company: '', message: '', service: '' };

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

                    {!bothConfigured && (
                      <p className="text-xs text-center" style={{ color: 'var(--color-text-dimmed)', fontStyle: 'italic' }}>
                        {!eitherConfigured
                          ? 'Note: Form backend not yet connected — submissions are simulated in development.'
                          : !supabaseConfigured
                            ? 'Note: Database not yet connected — emails will send but leads are not persisted.'
                            : 'Note: Email notifications not yet configured — leads are saved but email alerts are disabled.'
                        }
                      </p>
                    )}
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
