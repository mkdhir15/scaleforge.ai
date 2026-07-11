import { useRef, useState, useCallback, Children } from 'react';
import './MagicBento.css';

/* ── Internal: each grid cell with interactive effects ── */
const BentoCell = ({
  children,
  enableSpotlight,
  enableBorderGlow,
  enableTilt,
  enableMagnetism,
  clickEffect,
}) => {
  const cellRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cellRef.current) return;
      const rect = cellRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = x / rect.width;
      const yPct = y / rect.height;

      const el = cellRef.current;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);

      if (enableTilt) {
        el.style.setProperty('--tilt-x', `${(yPct - 0.5) * -8}deg`);
        el.style.setProperty('--tilt-y', `${(xPct - 0.5) * 8}deg`);
      }
      if (enableMagnetism) {
        el.style.setProperty('--mag-x', `${(xPct - 0.5) * 6}px`);
        el.style.setProperty('--mag-y', `${(yPct - 0.5) * 6}px`);
      }
    },
    [enableTilt, enableMagnetism]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!cellRef.current) return;
    const el = cellRef.current;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--mag-x', '0px');
    el.style.setProperty('--mag-y', '0px');
  }, []);

  const handleClick = useCallback(
    (e) => {
      if (!clickEffect || !cellRef.current) return;
      const rect = cellRef.current.getBoundingClientRect();
      const id = Date.now() + Math.random();
      setRipples((prev) => [
        ...prev,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
      ]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== id)),
        700
      );
    },
    [clickEffect]
  );

  return (
    <div
      ref={cellRef}
      className={`bento-cell ${isHovered ? 'bento-cell--hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="bento-cell__content">{children}</div>

      {enableSpotlight && <div className="bento-cell__spotlight" />}
      {enableBorderGlow && <div className="bento-cell__glow-border" />}

      {ripples.map((r) => (
        <span
          key={r.id}
          className="bento-cell__ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
};

/* ── Public: MagicBento grid wrapper ── */
const MagicBento = ({
  children,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  enableStars = false, // Reserved — not rendered (per spec)
  clickEffect = true,
  className = '',
  columns = 3,
}) => {
  return (
    <div className={`bento-grid ${className}`} style={{ '--bento-cols': columns }}>
      {Children.map(children, (child) =>
        child ? (
          <BentoCell
            enableSpotlight={enableSpotlight}
            enableBorderGlow={enableBorderGlow}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
          >
            {child}
          </BentoCell>
        ) : null
      )}
    </div>
  );
};

export default MagicBento;
