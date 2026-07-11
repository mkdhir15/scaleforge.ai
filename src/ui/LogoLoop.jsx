import './LogoLoop.css';

/**
 * LogoLoop — infinite horizontal scrolling marquee.
 * Duplicates the logo set for a seamless CSS-animated loop.
 * Pauses on hover. Items go grayscale → full color on item hover.
 *
 * Logos shape: { name: string, icon?: ReactNode }
 * If no icon is provided, renders name as styled text.
 */
const LogoLoop = ({ logos = [], speed = 35, pauseOnHover = true, className = '' }) => {
  if (!logos.length) return null;

  return (
    <div
      className={`logo-loop ${pauseOnHover ? 'logo-loop--pause-hover' : ''} ${className}`}
      aria-label="Trusted tools and integrations"
    >
      <div
        className="logo-loop__track"
        style={{ '--loop-duration': `${speed}s` }}
      >
        {/* Original set + duplicate for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="logo-loop__item"
            aria-hidden={i >= logos.length ? 'true' : undefined}
          >
            {logo.icon && <span className="logo-loop__icon">{logo.icon}</span>}
            <span className="logo-loop__name">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
