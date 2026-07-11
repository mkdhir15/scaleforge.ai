import { Link } from 'react-router-dom';
import { FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';
import Logo from './Logo';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'Industries', to: '/industries' },
  { label: 'Case Studies', to: '/case-studies' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms' },
];

const SOCIALS = [
  { icon: <FaXTwitter size={16} />, href: 'https://x.com/MohitKD_15', label: 'X (Twitter)' },
  { icon: <FaLinkedinIn size={16} />, href: 'https://www.linkedin.com/in/scaleforge-ai-9877993b9/', label: 'LinkedIn' },
  { icon: <FaInstagram size={16} />, href: 'https://www.instagram.com/scaleforge.ai_/', label: 'Instagram' },
];

const Footer = () => (
  <footer className="footer">
    <div className="max-w-container">
      <div className="footer__grid">
        {/* Brand column — Logo lockup + tagline + socials */}
        <div className="footer__brand">
          <Logo size="md" />
          <p className="footer__tagline">
            AI automation &amp; web development for businesses that want to
            scale without the overhead.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__list">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="footer__col">
          <h4 className="footer__heading">Legal</h4>
          <ul className="footer__list">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__list">
            <li>
              <a href="mailto:mkdhirsystems@gmail.com" className="footer__link">
                mkdhirsystems@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+917986378263" className="footer__link">
                +91 79863-78263
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} ScaleForge.AI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
