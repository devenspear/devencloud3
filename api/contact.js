// Using CommonJS syntax for better Vercel compatibility
const sgMail = require('@sendgrid/mail');

// Helper function to parse JSON safely
const parseBody = (body) => {
  try {
    return typeof body === 'string' ? JSON.parse(body) : body;
  } catch (e) {
    return body;
  }
};

module.exports = async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the request body - handle both string and object formats
    const body = parseBody(req.body);
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
      });
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    
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

    // Send email using SendGrid
    await sgMail.send({
      to: 'deven@devenspear.com', // Hardcoded as requested
      from: {
        email: process.env.EMAIL_FROM || 'contact@devenspear.com',
        name: 'Deven Spear Website'
      },
      subject: `New contact form submission from ${name}`,
      text: emailText,
      html: emailHtml,
    });

    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    // Enhanced error logging
    console.error('Error sending email:', error);
    
    // Get more detailed error information
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = `${errorMessage}: ${error.message}`;
      console.error('Error details:', error.stack);
    }
    
    // Check if it's a SendGrid API error
    if (error && typeof error === 'object' && 'response' in error) {
      const sendGridError = error;
      if (sendGridError.response?.body) {
        console.error('SendGrid API error:', sendGridError.response.body);
        errorMessage = `SendGrid API error: ${JSON.stringify(sendGridError.response.body)}`;
      }
    }
    
    return res.status(500).json({ error: errorMessage });
  }
}
