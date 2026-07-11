import { motion } from 'framer-motion';

const GradientText = ({
  children,
  className = '',
  from = '#6C5CE7',
  via = '#00D9C0',
  to = '#6C5CE7',
  animationSpeed = 4,
  as: Tag = 'span'
}) => {
  return (
    <Tag className={`gradient-text-wrapper ${className}`} style={{ display: 'inline-block', position: 'relative' }}>
      <motion.span
        style={{
          backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to}, ${from})`,
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block'
        }}
        animate={{ backgroundPosition: ['0% center', '-300% center'] }}
        transition={{
          duration: animationSpeed,
          ease: 'linear',
          repeat: Infinity
        }}
      >
        {children}
      </motion.span>
    </Tag>
  );
};

export default GradientText;
