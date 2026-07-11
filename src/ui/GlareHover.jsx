import { useRef, useCallback } from 'react';
import './GlareHover.css';

/**
 * GlareHover — mouse-following light glare overlay.
 * Use ONLY on primary CTA buttons (not cards/links).
 *
 * Wraps children and adds a radial light sweep that follows
 * the cursor on hover via CSS custom properties.
 */
const GlareHover = ({ children, className = '', disabled = false }) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty('--glare-x', `${x}%`);
      ref.current.style.setProperty('--glare-y', `${y}%`);
    },
    [disabled]
  );

  return (
    <div
      ref={ref}
      className={`glare-hover ${disabled ? '' : 'glare-hover--active'} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

export default GlareHover;
