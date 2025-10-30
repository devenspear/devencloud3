import { FaLinkedin, FaTwitter, FaYoutube, FaGlobe, FaRss } from 'react-icons/fa';
import './App.css';
import AnimatedBackground from './components/AnimatedBackground';
import FloatingQuestions from './components/FloatingQuestions';
import EmailObfuscator from './components/EmailObfuscator';
// Contact form temporarily disabled due to unresolved CORS issues with CRM endpoint
// See README.md Addendum for full technical details and implementation
// import DevenCloud3ContactForm from './components/DevenCloud3ContactForm';
// Updated for Vercel deployment trigger

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
    href: buildUrl(['https://', 'overabove.com']), 
    label: 'Overabove', 
    icon: <FaGlobe /> 
  },
  { 
    href: buildUrl(['https://', 'futurefast.ai']), 
    label: 'FutureFast.ai', 
    icon: <FaGlobe /> 
  },
  {
    href: buildUrl(['https://', 'cryptodeven.com']),
    label: 'cryptodeven.com', 
    icon: <FaGlobe />
  },
  {
    href: buildUrl(['https://', 'www.deven.blog']),
    label: 'www.deven.blog',
    icon: <FaRss />
  },
  {
    href: buildUrl(['https://', 'www.linkedin.com', '/newsletters/disruption-weekly-7120892654304776192/']),
    label: 'Disruption Weekly',
    icon: <FaRss />
  },
];

function App() {
  return (
    <>
      <AnimatedBackground />
      <FloatingQuestions />
      <div className="container">
        <img 
        src="/DevenHeadshot_Blue.jpg" 
        alt="Deven Spear" 
        className="profile-img"
      />
      <h1>Deven Spear</h1>
      <h2>Polymath Entrepreneur & Chief Innovation Officer</h2>
      <p>
        30+ years, 6 startups, real estate, software, tech. Excels at spotting opportunities and creating solutions. Thought leader in innovative problem-solving across physical and digital realms.
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
      
      {/* Contact form temporarily disabled due to unresolved CORS issues */}
      {/* See README.md Addendum for complete implementation details */}
      {/* 
      <div className="contact-section">
        <DevenCloud3ContactForm />
      </div>
      */}
      
      {/* Email Contact Link */}
      <div className="email-contact" style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          Feel free to contact me via email{' '}
          <EmailObfuscator 
            className="email-link"
            linkText="here"
          />
        </p>
      </div>
      
      <footer>
        &copy; {new Date().getFullYear()} Deven Spear. All rights reserved.
      </footer>
      </div>
    </>
  );
}

export default App;
