import { FaLinkedin, FaTwitter, FaYoutube, FaIdBadge, FaGlobe, FaRss } from 'react-icons/fa';
import './App.css';
import EmailObfuscator from './components/EmailObfuscator';
import AnimatedBackground from './components/AnimatedBackground';

const links = [
  // Email is handled separately with the EmailObfuscator component
  { href: 'https://www.linkedin.com/in/devenspear/', label: 'LinkedIn', icon: <FaLinkedin /> },
  { href: 'https://twitter.com/devenspear', label: 'Twitter/X', icon: <FaTwitter /> },
  { href: 'https://www.youtube.com/@deven_spear/videos', label: 'YouTube', icon: <FaYoutube /> },
  { href: 'https://futurefast.ai', label: 'FutureFast.ai', icon: <FaGlobe /> },
  { href: 'https://www.deven.blog', label: 'www.deven.blog', icon: <FaRss /> },
  { href: 'https://popl.co/card/hnmlBzR1/4/preview', label: 'Popl Card', icon: <FaIdBadge /> },
];

function App() {
  return (
    <div className="container">
      <AnimatedBackground />
      <img 
        src="/DevenHead2025.jpg" 
        alt="Deven Spear" 
        className="profile-img"
      />
      <h1>Deven Spear</h1>
      <h2>Polymath Entrepreneur & Chief Innovation Officer</h2>
      <p>
        30+ years, 6 startups, real estate, software, tech.<br/>
        Excels at spotting opportunities and creating solutions.<br/>
        Thought leader in innovative problem-solving across physical and digital realms.
      </p>
      <div className="social-links">
        <EmailObfuscator className="social-icon" linkText="Email" />
        {links.map(link => (
          <a 
            key={link.href} 
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={link.label} 
            className="social-icon"
          >
            {link.icon} <span>{link.label}</span>
          </a>
        ))}
      </div>
      <footer>
        &copy; {new Date().getFullYear()} Deven Spear. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
