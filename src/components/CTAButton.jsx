import { Link } from 'react-router-dom';
import GlareHover from '../ui/GlareHover';
import './CTAButton.css';

/**
 * CTAButton — brand CTA with GlareHover on primary variant.
 * Renders as Link (to), anchor (href), or button (onClick).
 */
const CTAButton = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const cls = `cta-btn cta-btn--${variant} cta-btn--${size} ${className}`;

  const content = (
    <>
      {icon && <span className="cta-btn__icon">{icon}</span>}
      <span>{children}</span>
    </>
  );

  let element;
  if (to) {
    element = (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    );
  } else if (href) {
    element = (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  } else {
    element = (
      <button className={cls} onClick={onClick} type="button" {...props}>
        {content}
      </button>
    );
  }

  // GlareHover only on primary CTA buttons (per spec)
  return variant === 'primary' ? <GlareHover>{element}</GlareHover> : element;
};

export default CTAButton;
