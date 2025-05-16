// Using CommonJS syntax for better Vercel compatibility
const sgMail = require('@sendgrid/mail');

// Debug helper to log detailed information
const debug = (label, data) => {
  console.log(`DEBUG [${label}]:`, JSON.stringify(data, null, 2));
  return data; // Return data for chaining
};

module.exports = async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log request details
    debug('request method', req.method);
    debug('request headers', req.headers);
    debug('request body', req.body);

    // Extract form data
    const { name, email, message } = req.body;
    debug('extracted form data', { name, email, message: message?.substring(0, 50) });

    // Validate required fields
    if (!name || !email || !message) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      if (!message) missingFields.push('message');
      
      debug('validation failed', { missingFields });
      
      return res.status(400).json({
        error: `Required fields missing: ${missingFields.join(', ')}`,
      });
    }
    
    debug('validation passed', { name, email, message: message?.substring(0, 50) });

    // Set SendGrid API key
    const apiKey = process.env.SENDGRID_API_KEY || '';
    debug('SendGrid API key present', { present: !!apiKey, length: apiKey.length });
    
    if (!apiKey) {
      console.warn('SendGrid API key is not set');
      debug('SendGrid API key missing', {});
      // Still return success to the client even if email sending might fail
      return res.status(200).json({ 
        success: true, 
        message: 'Form submission received, but email sending is not configured',
      });
    }
    
    sgMail.setApiKey(apiKey);
    debug('SendGrid API key set', {});
    
    // Email content
    const emailText = `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `;
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;
    
    debug('email content prepared', { text: emailText.substring(0, 50) + '...' });

    // Prepare email data
    const fromEmail = process.env.EMAIL_FROM || 'contact@devenspear.com';
    debug('from email', { fromEmail });
    
    const emailData = {
      to: 'deven@devenspear.com', // Hardcoded as requested
      from: {
        email: fromEmail,
        name: 'Deven Spear Website'
      },
      subject: `New contact form submission from ${name}`,
      text: emailText,
      html: emailHtml,
    };
    
    debug('email data prepared', { 
      to: emailData.to,
      from: emailData.from,
      subject: emailData.subject
    });

    // Check if we're in test mode (for debugging without sending actual emails)
    const isTestMode = process.env.EMAIL_TEST_MODE === 'true';
    debug('test mode check', { isTestMode });
    
    if (isTestMode) {
      debug('TEST MODE - Would have sent email with the following data', emailData);
      return res.status(200).json({ 
        success: true, 
        message: 'TEST MODE: Form submission received (email not actually sent)',
        testMode: true,
        emailData: {
          to: emailData.to,
          from: emailData.from,
          subject: emailData.subject,
          textPreview: emailData.text.substring(0, 100) + '...'
        }
      });
    }
    
    // Send email using SendGrid
    debug('sending email', 'attempt started');
    try {
      const response = await sgMail.send(emailData);
      debug('email sent successfully', { 
        statusCode: response?.[0]?.statusCode,
        headers: response?.[0]?.headers,
        body: response?.[0]?.body
      });

      // Return success response
      return res.status(200).json({ 
        success: true, 
        message: 'Form submission received and email sent',
      });
    } catch (emailError) {
      debug('email sending failed', { 
        message: emailError.message,
        code: emailError.code,
        response: emailError.response?.body
      });
      
      // Log detailed error information
      console.error('SendGrid Error:', emailError);
      
      // Return success to the client even if email sending failed
      return res.status(200).json({ 
        success: true, 
        message: 'Form submission received',
        emailStatus: 'Failed to send email, but your message was received',
      });
    }
  } catch (error) {
    // Enhanced error logging with debug info
    debug('top-level error caught', { 
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    console.error('Error sending email:', error);
    
    // Get more detailed error information
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = `${errorMessage}: ${error.message}`;
      debug('error instance details', { 
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 3)
      });
    }
    
    // Return success to the client even if email sending failed
    // This prevents the user from seeing an error message
    return res.status(200).json({ 
      success: true, 
      message: 'Form submission received',
      emailStatus: errorMessage,
      debug: true
    });
  }
}
