import React, { useState, useEffect } from 'react';

interface EmailObfuscatorProps {
  className?: string;
  linkText?: string;
}

const EmailObfuscator: React.FC<EmailObfuscatorProps> = ({ 
  className = '', 
  linkText = 'here'
}) => {
  const [email, setEmail] = useState<string>('');
  const [mailtoLink, setMailtoLink] = useState<string>('#');
  
  useEffect(() => {
    // Decode the email parts to prevent static crawling
    const user = decodeURIComponent('D%65%76%65%6E');
    const domain = decodeURIComponent('D%65%76%65%6E%2E%65%6D%61%69%6C');
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
      {linkText}
    </a>
  );
};

export default EmailObfuscator;
