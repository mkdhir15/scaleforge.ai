import { useState } from 'react';
import './Dock.css';

/**
 * Dock — floating action bar with expandable labels.
 * Generic component: receives an items array.
 * Positioned fixed bottom-right by CSS.
 *
 * Items shape: { icon: ReactNode, label: string, href?: string, onClick?: fn, external?: boolean }
 */
const Dock = ({ items = [], className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`dock ${isExpanded ? 'dock--expanded' : ''} ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      role="toolbar"
      aria-label="Quick contact actions"
    >
      {items.map((item, index) => {
        const Tag = item.href ? 'a' : 'button';
        const linkProps = item.href
          ? {
              href: item.href,
              target: item.external ? '_blank' : undefined,
              rel: item.external ? 'noopener noreferrer' : undefined,
            }
          : { onClick: item.onClick, type: 'button' };

        return (
          <Tag
            key={index}
            className="dock__item"
            title={item.label}
            aria-label={item.label}
            {...linkProps}
          >
            <span className="dock__icon">{item.icon}</span>
            <span className="dock__label">{item.label}</span>
          </Tag>
        );
      })}
    </div>
  );
};

export default Dock;
