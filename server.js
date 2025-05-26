import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Set up Express
const app = express();
const PORT = process.env.PORT || 3000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Parse the request body
    const { name, email, message, turnstileToken } = req.body;

    // Verify Cloudflare Turnstile token
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA', // Test secret key for development
          response: turnstileToken,
        }),
      }
    );

    const turnstileData = await turnstileResponse.json();

    // If Turnstile verification fails
    if (!turnstileData.success) {
      return res.status(400).json({
        error: 'Human verification failed',
        details: turnstileData,
      });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
      });
    }

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
    return res.json({ success: true });
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
});

// For all other routes, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
