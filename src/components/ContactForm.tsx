import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Debug helper function
  const debugLog = (label: string, data: any) => {
    console.log(`[DEBUG ${label}]:`, data);
    return data; // For chaining
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    debugLog('Form Submission Started', { formData });
    
    try {
      // Prepare form data - only include necessary fields
      const formPayload = {
        name: formData.name,
        email: formData.email,
        message: formData.message
      };
      
      debugLog('Form Payload Prepared', formPayload);
      const payloadString = JSON.stringify(formPayload);
      debugLog('Stringified Payload', payloadString);
      
      // Send form data to the Vercel API endpoint
      debugLog('Sending Request', { url: '/api/contact', method: 'POST' });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: debugLog('Request Headers', {
          'Content-Type': 'application/json',
        }),
        body: payloadString,
      });
      
      debugLog('Response Status', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries([...response.headers.entries()])
      });
      
      const responseText = await response.text();
      debugLog('Response Text', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        debugLog('Parsed Response Data', data);
      } catch (parseError) {
        debugLog('JSON Parse Error', { error: parseError, text: responseText });
        throw new Error(`Failed to parse response: ${responseText}`);
      }
      
      if (!response.ok) {
        debugLog('Response Not OK', { status: response.status, data });
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Success
      debugLog('Form Submission Success', data);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      debugLog('Form Submission Error', { 
        error: err, 
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined
      });
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
      debugLog('Form Submission Completed', { isSubmitted, error });
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="form-title">Contact Me</h2>
      
      {error && (
        <div className="error-message">
          <h4>Error</h4>
          <p>{error}</p>
        </div>
      )}
      
      {isSubmitted ? (
        <div className="success-message">
          <h4>Thank you for your message!</h4>
          <p>I have received your inquiry and will get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="form-input"
            ></textarea>
          </div>
          
          {/* Removed Turnstile container */}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane className="send-icon" /> Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
