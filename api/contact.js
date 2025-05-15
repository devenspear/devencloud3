// Using CommonJS syntax for better Vercel compatibility
const sgMail = require('@sendgrid/mail');

// Debug helper to log detailed information
const debug = (label, data) => {
  console.log(`DEBUG [${label}]:`, JSON.stringify(data, null, 2));
  return data; // Return data for chaining
};

// Helper function to parse JSON safely
const parseBody = (body) => {
  try {
    debug('parseBody input type', typeof body);
    debug('parseBody input', body);
    const result = typeof body === 'string' ? JSON.parse(body) : body;
    debug('parseBody result', result);
    return result;
  } catch (e) {
    debug('parseBody error', { message: e.message, stack: e.stack });
    return body;
  }
};

module.exports = async function handler(req, res) {
  // Log request details
  debug('request method', req.method);
  debug('request headers', req.headers);
  debug('request body raw', req.body);
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the request body - handle both string and object formats
    const body = parseBody(req.body);
    debug('parsed body', body);
    
    // Extract fields with detailed logging
    const name = body?.name;
    const email = body?.email;
    const message = body?.message;
    
    debug('extracted fields', { name, email, message });

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
    
    debug('validation passed', { name, email, message });

    // Set SendGrid API key
    const apiKey = process.env.SENDGRID_API_KEY || '';
    debug('SendGrid API key length', apiKey.length);
    sgMail.setApiKey(apiKey);
    
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

    try {
      // Send email using SendGrid
      debug('sending email', 'attempt started');
      const response = await sgMail.send(emailData);
      debug('email sent successfully', response);

      // Return success response
      return res.status(200).json({ success: true });
    } catch (emailError) {
      debug('email sending failed', { 
        message: emailError.message,
        code: emailError.code,
        response: emailError.response?.body
      });
      throw emailError; // Re-throw to be caught by the outer try/catch
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
    
    // Check if it's a SendGrid API error
    if (error && typeof error === 'object' && 'response' in error) {
      const sendGridError = error;
      debug('sendgrid error detected', { hasResponse: !!sendGridError.response });
      
      if (sendGridError.response?.body) {
        debug('sendgrid error body', sendGridError.response.body);
        console.error('SendGrid API error:', sendGridError.response.body);
        errorMessage = `SendGrid API error: ${JSON.stringify(sendGridError.response.body)}`;
      }
    }
    
    debug('returning error to client', { errorMessage });
    return res.status(500).json({ error: errorMessage, debug: true });
  }
}
