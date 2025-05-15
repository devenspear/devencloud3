// Using CommonJS syntax for better Vercel compatibility
const sgMail = require('@sendgrid/mail');

module.exports = async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract form data
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
      });
    }

    // Set SendGrid API key
    const apiKey = process.env.SENDGRID_API_KEY || '';
    if (!apiKey) {
      console.warn('SendGrid API key is not set');
      // Still return success to the client even if email sending might fail
      return res.status(200).json({ 
        success: true, 
        message: 'Form submission received, but email sending is not configured',
      });
    }
    
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

    // Prepare email data
    const emailData = {
      to: 'deven@devenspear.com', // Hardcoded as requested
      from: {
        email: process.env.EMAIL_FROM || 'contact@devenspear.com',
        name: 'Deven Spear Website'
      },
      subject: `New contact form submission from ${name}`,
      text: emailText,
      html: emailHtml,
    };

    // Send email using SendGrid
    await sgMail.send(emailData);

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Form submission received and email sent',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return success to the client even if email sending failed
    // This prevents the user from seeing an error message
    return res.status(200).json({ 
      success: true, 
      message: 'Form submission received',
      emailStatus: 'Failed to send email, but your message was received',
    });
  }
}
