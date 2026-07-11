import { MessageCircle, Phone, Mail } from 'lucide-react';
import Dock from '../ui/Dock';

/**
 * ContactDock — persistent contact action bar (bottom-right, every page).
 * This is NOT the main navigation — that's Navbar.
 * Contains only: WhatsApp, Call, Email.
 */
const ContactDock = () => {
  const items = [
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp',
      href: 'https://wa.me/917986378263',
      external: true,
    },
    {
      icon: <Phone size={20} />,
      label: 'Call Us',
      href: 'tel:+917986378263',
      external: false,
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      href: 'mailto:mkdhirsystems@gmail.com',
      external: false,
    },
  ];

  return <Dock items={items} />;
};

export default ContactDock;
