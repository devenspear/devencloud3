# Deven Spear Personal Website

A modern, responsive personal website for Deven Spear built with React, TypeScript, and Vite.

## Features

- Animated background with interactive particles
- Social media and professional links
- Mobile-responsive design
- Dark theme with blue accents
- Contact form with email integration (temporarily disabled)

## Technology Stack

- React 19
- TypeScript
- Vite
- SendGrid for email (configuration pending)
- Vercel for hosting

## Contact Form Status

The contact form is temporarily disabled. To re-enable it:

1. Set up a SendGrid account and obtain an API key
2. Configure the following environment variables in Vercel:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `EMAIL_FROM`: The sender email (e.g., contact@devenspear.com) - must be verified in SendGrid
3. Uncomment the contact form component in `src/App.tsx`
4. Deploy the updated application

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

---

# Addendum: Contact Form Integration Project

## Overview
This document chronicles the attempt to integrate a subscription contact form similar to futurefast.ai with Cloudflare Turnstile verification and DevCo CRM integration.

## Project Goals
- Integrate Cloudflare Turnstile for bot protection
- Connect to DevCo CRM at `https://crm.deven.site/api/submissions`
- Match the functionality of futurefast.ai's working implementation

## Technical Implementation

### Dependencies Added
```bash
npm install @marsidev/react-turnstile
```

### Environment Variables Required
```bash
VITE_CRM_API_KEY=crm_2e9c39d198e0c24a2f9b345273ccab0a5239924e1dd22adbe316671fdd56e953
VITE_TURNSTILE_SITE_KEY=0x4AAAAAAAIKHgKNWkpW6FPg
```

### Component Implementation
Created `src/components/DevenCloud3ContactForm.tsx` with:
- React form with validation
- Cloudflare Turnstile integration
- DevCo CRM API integration
- Comprehensive debugging and logging
- Error handling and user feedback

## Issues Encountered

### 1. TypeScript Import Error
**Problem**: Initial import `import ReactTurnstile from '@marsidev/react-turnstile'` failed
**Solution**: Changed to `import { Turnstile } from '@marsidev/react-turnstile'`

### 2. Content Security Policy (CSP) Conflicts
**Problem**: Turnstile scripts blocked by CSP
**Attempted Solutions**:
- Multiple CSP policy iterations in `vercel.json`
- Added `challenges.cloudflare.com` to script-src, frame-src, connect-src
- Added `'unsafe-inline'` and `'unsafe-eval'` permissions
- Tried wildcard `*.cloudflare.com` approach
- Eventually used fully permissive CSP for testing

**Final CSP Policy**:
```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [{
      "key": "Content-Security-Policy",
      "value": "default-src 'self' 'unsafe-inline' 'unsafe-eval' *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *; frame-src *; connect-src *; img-src * data:; font-src * data:;"
    }]
  }]
}
```

### 3. Manual Script Conflicts
**Problem**: Found conflicting manual Turnstile script in `index.html`
**Solution**: Removed manual script to let @marsidev/react-turnstile handle loading

### 4. CORS (Cross-Origin Resource Sharing) Issues
**Problem**: `crm.deven.site` blocked requests from `www.deven.cloud`
**Error**: `Origin https://www.deven.cloud is not allowed by Access-Control-Allow-Origin`
**Attempted Solution**: Switched to futurefast.ai's endpoint `dev-co-crm.vercel.app` for testing

## Key Discoveries

### FutureFast.ai Implementation Analysis
- Uses `skipBotCheck: true` in CRM payload
- Turnstile component was commented out/disabled in provided files
- Different CRM endpoint: `https://dev-co-crm.vercel.app/api/submissions`
- Different API key: `crm_d959d98a518641ecc8555ac54e371891e0b9a48fa1ab352425d69d557a6cb2f5`

### Debugging Features Implemented
- Environment variable validation and display
- Comprehensive console logging with emoji indicators
- Real-time Turnstile status monitoring
- Detailed API request/response logging
- Debug information panel in UI

## Final Status
**Status**: **INCOMPLETE** - Form disabled due to unresolved CORS issues

**Last Working State**: 
- Form successfully bypasses Turnstile (like futurefast.ai)
- Environment variables loading correctly
- Form validation working
- Blocked by CORS policy on CRM endpoint

## Git Commit History
```bash
# Key commits during development
690f11d - Update CSP based on working futurefast.ai configuration
b7698b2 - Add unsafe-inline to script-src for Turnstile compatibility
fd86d01 - Expand CSP for all Cloudflare domains and add unsafe-eval
20eb3d4 - Temporarily use permissive CSP to troubleshoot Turnstile
7215db8 - Add comprehensive debugging to contact form
4d501a9 - Temporarily skip Turnstile verification for testing like futurefast.ai
766dcba - Test with futurefast.ai CRM endpoint to resolve CORS issue
```

## Recommended Next Steps

### Option 1: Fix CORS Configuration
Configure `crm.deven.site` to allow requests from `deven.cloud`:
- Add `Access-Control-Allow-Origin: https://deven.cloud, https://www.deven.cloud`
- Add `Access-Control-Allow-Headers: Content-Type, X-API-Key, X-Turnstile-Token`
- Add `Access-Control-Allow-Methods: POST, OPTIONS`

### Option 2: Use Proxy Route
Create a serverless function in Vercel to proxy CRM requests:
```javascript
// api/submit-contact.js
export default async function handler(req, res) {
  const response = await fetch('https://crm.deven.site/api/submissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.CRM_API_KEY,
      'X-Turnstile-Token': req.headers['x-turnstile-token']
    },
    body: JSON.stringify(req.body)
  })
  return res.json(await response.json())
}
```

### Option 3: Alternative Form Solutions
- Use Vercel Forms or Netlify Forms
- Integrate with Formspree or similar service
- Use mailto: links as fallback

## Files Modified
- `src/components/DevenCloud3ContactForm.tsx` - Main form component
- `vercel.json` - CSP configuration
- `package.json` - Added Turnstile dependency
- `index.html` - Removed conflicting script

## Lessons Learned
1. **Environment Variables**: Critical to set both locally and in Vercel
2. **CSP Policies**: Can be very restrictive; start permissive and tighten
3. **CORS**: Often the final blocker in API integrations
4. **Third-party Integration**: Always check working examples first
5. **Debugging**: Comprehensive logging essential for complex integrations

---

**Note**: Form is currently commented out due to unresolved CORS issues. See `src/components/DevenCloud3ContactForm.tsx` for complete implementation.
