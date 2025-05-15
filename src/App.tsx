import { FaLinkedin, FaTwitter, FaYoutube, FaGlobe, FaRss } from 'react-icons/fa';
import './App.css';
import AnimatedBackground from './components/AnimatedBackground';
import ContactForm from './components/ContactForm';

// Obfuscate URLs to avoid ad blocker detection
const buildUrl = (parts: string[]) => parts.join('');

const links = [
  { 
    href: buildUrl(['https://', 'www.linkedin.com', '/in/devenspear/']), 
    label: 'LinkedIn', 
    icon: <FaLinkedin /> 
  },
  { 
    href: buildUrl(['https://', 'twitter.com', '/devenspear']), 
    label: 'Twitter/X', 
    icon: <FaTwitter /> 
  },
  { 
    href: buildUrl(['https://', 'www.youtube.com', '/@deven_spear/videos']), 
    label: 'YouTube', 
    icon: <FaYoutube /> 
  },
  { 
    href: buildUrl(['https://', 'oa3.io']), 
    label: 'OA3.io', 
    icon: <FaGlobe /> 
  },
  { 
    href: buildUrl(['https://', 'futurefast.ai']), 
    label: 'FutureFast.ai', 
    icon: <FaGlobe /> 
  },
  {
    href: '#', // Ethereum address doesn't have a direct URL
    label: 'cryptospear.eth', 
    icon: <FaGlobe />
  },
  { 
    href: buildUrl(['https://', 'www.deven.blog']), 
    label: 'www.deven.blog', 
    icon: <FaRss /> 
  },
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
      <div className="external-resources">
        {links.map(link => (
          <a 
            key={link.href} 
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={link.label} 
            className="resource-link"
            data-type="external"
          >
            <span className="resource-icon">{link.icon}</span> <span className="resource-label">{link.label}</span>
          </a>
        ))}
      </div>
      
      <ContactForm />
      
      <footer>
        &copy; {new Date().getFullYear()} Deven Spear. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
