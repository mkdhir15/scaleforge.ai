import { Link } from 'react-router-dom';
import './Logo.css';

/**
 * Logo lockup — circular logo image + "ScaleForge.AI" company name.
 * Used consistently in Navbar and Footer. Never logo alone or name alone.
 */
const Logo = ({ size = 'md', onClick, className = '' }) => {
  const sizeClass = `logo--${size}`;
  return (
    <Link to="/" className={`logo ${sizeClass} ${className}`} onClick={onClick}>
      <img
        src="/logo.png"
        alt="ScaleForge.AI"
        className="logo__img"
      />
      <span className="logo__name">ScaleForge<span className="logo__dot">.AI</span></span>
    </Link>
  );
};

export default Logo;
