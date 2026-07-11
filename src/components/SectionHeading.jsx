import BlurText from '../ui/BlurText';

/**
 * SectionHeading — animated heading with optional subtitle.
 * Uses BlurText for per-word blur-in reveal on scroll.
 */
const SectionHeading = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : ''} ${className}`}>
    <BlurText
      text={title}
      className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary ${
        align === 'center' ? 'justify-center' : ''
      }`}
      delay={80}
      animateBy="words"
    />
    {subtitle && (
      <p
        className={`mt-4 text-text-muted text-base md:text-lg leading-relaxed ${
          align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
