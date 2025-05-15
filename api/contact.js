// Using CommonJS syntax for better Vercel compatibility
const sgMail = require('@sendgrid/mail');

module.exports = async function handler(req, res) {
  // Simple response for testing
  return res.status(200).json({ 
    success: true, 
    message: 'Form submission received',
    received: {
      method: req.method,
      body: req.body
    }
  });
}
