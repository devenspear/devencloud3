// Simple API endpoint for Vercel serverless functions

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS method for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST method for form submission
  if (req.method === 'POST') {
    try {
      // Return success response
      return res.status(200).json({ 
        success: true, 
        message: 'Form submission received',
        data: req.body 
      });
    } catch (error) {
      // Return error response
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred',
        error: error.message 
      });
    }
  }

  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
}
