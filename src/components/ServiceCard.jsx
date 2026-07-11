import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * ServiceCard — single service inside MagicBento grid.
 * Shows icon, title, description, and optional "Learn more" link.
 */
const ServiceCard = ({ icon, title, description, to }) => (
  <div className="p-6 h-full flex flex-col">
    <div
      className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
      style={{ background: 'rgba(108, 92, 231, 0.1)' }}
    >
      <span style={{ color: 'var(--color-indigo)' }}>{icon}</span>
    </div>

    <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
      {title}
    </h3>

    <p className="text-text-muted text-sm leading-relaxed flex-1 mb-4">
      {description}
    </p>

    {to && (
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
        style={{ color: 'var(--color-indigo)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-indigo-light)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-indigo)')}
      >
        Learn more <ArrowUpRight size={14} />
      </Link>
    )}
  </div>
);

export default ServiceCard;
