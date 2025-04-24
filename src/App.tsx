import { FaEnvelope, FaLinkedin, FaTwitter, FaFacebook, FaYoutube, FaIdBadge } from 'react-icons/fa';

const links = [
  { href: 'mailto:deven@overabove.com', label: 'Email', icon: <FaEnvelope /> },
  { href: 'https://www.linkedin.com/in/devenspear/', label: 'LinkedIn', icon: <FaLinkedin /> },
  { href: 'https://twitter.com/devenspear', label: 'Twitter/X', icon: <FaTwitter /> },
  { href: 'https://www.facebook.com/devenspear', label: 'Facebook', icon: <FaFacebook /> },
  { href: 'https://www.youtube.com/@deven_spear/videos', label: 'YouTube', icon: <FaYoutube /> },
  { href: 'https://popl.co/card/hnmlBzR1/4/preview', label: 'Popl Card', icon: <FaIdBadge /> },
];

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-4">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg mb-4">
        <img 
          src="/DevenHead2025.jpg" 
          alt="Deven Spear" 
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-cyan-300 mb-1 text-center font-['Orbitron',sans-serif]">Deven Spear</h1>
      <h2 className="text-base font-semibold text-cyan-200 mb-3 text-center">Polymath Entrepreneur & Chief Innovation Officer</h2>
      <p className="text-gray-300 text-center mb-4 text-sm max-w-xs">
        30+ years, 6 startups, real estate, software, tech.<br/>
        Excels at spotting opportunities and creating solutions.<br/>
        Thought leader in innovative problem-solving across physical and digital realms.
      </p>
      <div className="flex flex-row justify-center gap-5 mb-6">
        {links.map(link => (
          <a 
            key={link.href} 
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={link.label} 
            className="text-cyan-300 hover:text-white transition text-3xl social-icon"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <footer className="text-xs text-gray-500 mt-2 text-center w-full">
        &copy; {new Date().getFullYear()} Deven Spear. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
