import React, { useState, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';

interface EmailObfuscatorProps {
  className?: string;
  showIcon?: boolean;
  linkText?: string;
}

const EmailObfuscator: React.FC<EmailObfuscatorProps> = ({ 
  className = '', 
  showIcon = true,
  linkText = 'Email'
}) => {
  const [email, setEmail] = useState<string>('');
  const [mailtoLink, setMailtoLink] = useState<string>('#');
  
  useEffect(() => {
    // Decode the email parts to prevent static crawling
    const user = decodeURIComponent('d%65%76%65%6E');
    const domain = decodeURIComponent('d%65%76%65%6E%73%70%65%61%72%2E%63%6F%6D');
    const completeEmail = `${user}@${domain}`;
    
    setEmail(completeEmail);
    setMailtoLink(`mailto:${completeEmail}`);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!email) {
      e.preventDefault();
    }
  };

  return (
    <a 
      href={mailtoLink} 
      className={className}
      onClick={handleClick}
      rel="nofollow"
      target="_blank"
      aria-label="Send an email"
    >
      {showIcon && <FaEnvelope className="icon" />} <span>{linkText}</span>
    </a>
  );
};

export default EmailObfuscator;
