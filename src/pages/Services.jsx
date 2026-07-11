import { Helmet } from 'react-helmet-async';
import {
  Bot, MessageSquare, Mic, Users, Cog, CalendarCheck,
  FileText, BellRing, BarChart3, Globe, ArrowRight,
} from 'lucide-react';
import AnimatedContent from '../ui/AnimatedContent';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

const AI_SERVICES = [
  {
    icon: <Bot size={28} />,
    title: 'AI Lead Capture',
    description: 'Capture, qualify, and route leads automatically from your website, social media, and ads — so no inquiry falls through the cracks.',
    details: [
      'AI chatbot on your website that qualifies visitors in real time',
      'Automatic lead scoring based on responses',
      'Instant notifications + CRM entry for hot leads',
      'Works 24/7 — captures leads even while you sleep',
    ],
  },
  {
    icon: <MessageSquare size={28} />,
    title: 'WhatsApp AI Replies',
    description: 'Instant, intelligent replies to customer queries on WhatsApp — 24/7, in their language, without hiring more staff.',
    details: [
      'AI-powered responses trained on your FAQs and business info',
      'Handles bookings, order status, and common queries',
      'Seamless handoff to a human agent for complex issues',
      'Supports multiple languages including Hindi and English',
    ],
  },
  {
    icon: <Mic size={28} />,
    title: 'Voice Agents',
    description: 'AI-powered phone agents that handle appointment confirmations, FAQs, and outbound calls.',
    details: [
      'Automated outbound calls for appointment reminders',
      'Inbound call handling for common queries',
      'Natural-sounding AI voices with customizable scripts',
      'Call transcripts and analytics in your dashboard',
    ],
  },
  {
    icon: <Users size={28} />,
    title: 'CRM Automation',
    description: 'Automatically log interactions, update deal stages, and trigger follow-ups in your CRM — zero manual data entry.',
    details: [
      'Auto-create contacts from forms, calls, and messages',
      'Deal stage progression based on customer actions',
      'Automated task assignment for your sales team',
      'Works with most popular CRMs',
    ],
  },
  {
    icon: <Cog size={28} />,
    title: 'Workflow Automation',
    description: 'Connect your tools and eliminate repetitive tasks. We build custom workflows that save your team hours every week.',
    details: [
      'Custom automations connecting 2–10+ tools',
      'Trigger-based actions (new lead → email → CRM → Slack notification)',
      'Error handling and retry logic built in',
      'Detailed logs so you can see exactly what happened',
    ],
  },
  {
    icon: <CalendarCheck size={28} />,
    title: 'Appointment Booking',
    description: 'Let customers book, reschedule, and get reminders automatically — integrated with your calendar and CRM.',
    details: [
      'Online booking widget for your website or WhatsApp',
      'Automatic reminders via SMS, email, or WhatsApp',
      'Calendar sync (Google Calendar, Outlook, etc.)',
      'No-show tracking and rebooking automation',
    ],
  },
  {
    icon: <FileText size={28} />,
    title: 'Document Processing',
    description: 'Extract data from invoices, forms, and PDFs automatically. No more copy-pasting from paperwork into spreadsheets.',
    details: [
      'AI-powered extraction from invoices, receipts, and forms',
      'Automatic data entry into your accounting or CRM system',
      'Handles handwritten and printed documents',
      'Validation rules to catch errors before they propagate',
    ],
  },
  {
    icon: <BellRing size={28} />,
    title: 'Follow-up Automation',
    description: 'Automated email, SMS, and WhatsApp follow-ups that keep leads warm and customers engaged.',
    details: [
      'Multi-channel sequences (email + SMS + WhatsApp)',
      'Behavior-based triggers (opened email → send WhatsApp)',
      'Personalized messages using customer data',
      'Automatic stop when customer replies or converts',
    ],
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Dashboard / Reporting',
    description: 'Real-time dashboards that pull data from all your tools into one view.',
    details: [
      'Custom dashboards tailored to your KPIs',
      'Data pulled from CRM, ads, website, and communication tools',
      'Automated daily/weekly reports sent to your inbox',
      'No spreadsheet wrangling required',
    ],
  },
];

const WEB_SERVICE = {
  icon: <Globe size={28} />,
  title: 'Website Design & Development',
  description: 'Fast, modern, conversion-focused websites built to represent your brand and turn visitors into customers.',
  details: [
    'Custom design — no templates, no cookie-cutter layouts',
    'Mobile-first, responsive on all devices',
    'SEO-optimized structure and fast load times',
    'Integrated with your booking, CRM, and automation tools',
    'Ongoing maintenance and updates available',
  ],
};

/* ── Inline CTA block ── */
const SectionCTA = () => (
  <div className="flex justify-center py-8">
    <CTAButton to="/contact" size="md" icon={<ArrowRight size={16} />}>
      Book a Free Strategy Call
    </CTAButton>
  </div>
);

/* ── Service detail card ── */
const ServiceDetail = ({ icon, title, description, details }) => (
  <div className="glass-card p-8 mb-6">
    <div className="flex items-start gap-4 mb-4">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(108,92,231,0.1)', color: 'var(--color-indigo)' }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-heading text-xl font-bold text-text-primary">{title}</h3>
        <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
      </div>
    </div>
    <ul className="ml-18 space-y-2 mt-4" style={{ paddingLeft: '4.5rem' }}>
      {details.map((d, i) => (
        <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-muted)' }}>
          <span style={{ color: 'var(--color-teal)', marginTop: '0.125rem' }}>✓</span>
          <span>{d}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Services = () => (
  <>
    <Helmet>
      <title>Services — ScaleForge.AI</title>
      <meta name="description" content="AI automation services and website development for SMBs. Lead capture, WhatsApp bots, CRM automation, workflow automation, and more." />
    </Helmet>

    {/* Hero */}
    <AnimatedContent>
      <section className="section-padding text-center">
        <div className="max-w-container">
          <SectionHeading
            title="What We Build For You"
            subtitle="Every service is custom-built for your business. No generic SaaS tools — just systems that work the way you need them to."
          />
        </div>
      </section>
    </AnimatedContent>

    {/* AI Automation Services */}
    <AnimatedContent>
      <section className="section-padding-sm" style={{ background: 'var(--color-bg-card)' }}>
        <div className="max-w-container">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-2">AI Automation Services</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
            9 ways we help your business run on autopilot.
          </p>
          {AI_SERVICES.map((s) => (
            <ServiceDetail key={s.title} {...s} />
          ))}
        </div>
      </section>
    </AnimatedContent>
    <SectionCTA />

    {/* Website Development */}
    <AnimatedContent>
      <section className="section-padding-sm">
        <div className="max-w-container">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-2">Website Development Services</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Your website is your storefront. We make sure it works as hard as you do.
          </p>
          <ServiceDetail {...WEB_SERVICE} />
        </div>
      </section>
    </AnimatedContent>
    <SectionCTA />

    {/* Final CTA */}
    <AnimatedContent>
      <section className="section-padding text-center" style={{ background: 'var(--color-bg-card)' }}>
        <div className="max-w-container">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-text-muted)' }}>
            That's exactly what the strategy call is for. We'll look at your current setup, identify the biggest bottlenecks, and recommend the right combination of services.
          </p>
          <CTAButton to="/contact" size="lg" icon={<ArrowRight size={18} />}>
            Book a Free Strategy Call
          </CTAButton>
        </div>
      </section>
    </AnimatedContent>
  </>
);

export default Services;
