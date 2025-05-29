'use client'

import React, { useState, useEffect } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

interface ContactFormProps {
  className?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  inquiryType: string
}

interface FormMessage {
  type: 'success' | 'error' | 'debug'
  text: string
}

export default function DevenCloud3ContactForm({ 
  className = '',
  onSuccess,
  onError 
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<FormMessage | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  // Debug environment variables on component mount
  useEffect(() => {
    const crmApiKey = import.meta.env.VITE_CRM_API_KEY
    const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
    
    const debug = [
      `CRM API Key: ${crmApiKey ? `${crmApiKey.substring(0, 10)}...` : 'NOT SET'}`,
      `Turnstile Site Key: ${turnstileSiteKey ? `${turnstileSiteKey.substring(0, 10)}...` : 'NOT SET'}`,
      `Environment: ${import.meta.env.MODE || 'unknown'}`,
    ]
    
    setDebugInfo(debug)
    console.log('🔍 DevenCloud3ContactForm Debug Info:', debug)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🚀 Form submission started')
    setIsSubmitting(true)
    setMessage(null)

    const crmApiKey = import.meta.env.VITE_CRM_API_KEY
    // Temporarily use the same endpoint as futurefast.ai to test CORS
    const crmEndpoint = 'https://dev-co-crm.vercel.app/api/submissions'

    console.log('📝 Form Data:', formData)
    console.log('🔑 API Key:', crmApiKey ? `${crmApiKey.substring(0, 10)}...` : 'NOT SET')
    console.log('🎯 CRM Endpoint:', crmEndpoint)
    console.log('🛡️ Turnstile Token:', turnstileToken ? `${turnstileToken.substring(0, 10)}...` : 'NOT SET')

    // Temporarily skip Turnstile check for testing
    const skipTurnstile = true
    
    if (!skipTurnstile && !turnstileToken) {
      console.log('❌ Turnstile token missing')
      setMessage({
        type: 'error',
        text: 'Please complete the human verification check.'
      })
      setIsSubmitting(false)
      return
    }

    if (!crmApiKey) {
      console.log('❌ CRM API key missing')
      setMessage({
        type: 'error',
        text: 'Configuration error: API key not found.'
      })
      setIsSubmitting(false)
      return
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        note: `Subject: ${formData.subject}\nInquiry Type: ${formData.inquiryType}\n\nMessage: ${formData.message}`,
        sourceWebsite: 'deven.cloud',
        sourcePage: '/contact',
        sourceUrl: window.location.href,
        // Skip Turnstile verification for testing - like futurefast.ai
        skipBotCheck: skipTurnstile
      }

      console.log('📤 Sending payload to CRM:', payload)

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-API-Key': crmApiKey,
      }
      
      // Only add Turnstile token if we have one
      if (!skipTurnstile && turnstileToken) {
        headers['X-Turnstile-Token'] = turnstileToken
      }

      const response = await fetch(crmEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      })

      console.log('📥 CRM response status:', response.status)
      console.log('📥 CRM response headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        const responseData = await response.json()
        console.log('✅ Form submission successful:', responseData)
        
        setMessage({
          type: 'success',
          text: '🚀 Thank you for reaching out! I\'ll get back to you soon.'
        })
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: ''
        })
        setTurnstileToken(null)
        
        onSuccess?.()
      } else {
        const errorText = await response.text()
        console.log('❌ CRM error response:', errorText)
        
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { error: errorText }
        }
        
        throw new Error(errorData.error || `HTTP ${response.status}: ${errorText}`)
      }
    } catch (error: any) {
      console.error('💥 Form submission error:', error)
      const errorMessage = error.message || 'Something went wrong. Please try again.'
      setMessage({
        type: 'error',
        text: errorMessage
      })
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
      console.log('🏁 Form submission process completed')
    }
  }

  const inquiryOptions = [
    { value: '', label: 'Select inquiry type...' },
    { value: 'freelance-project', label: 'Freelance Project' },
    { value: 'full-time-opportunity', label: 'Full-time Opportunity' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'speaking', label: 'Speaking Engagement' },
    { value: 'networking', label: 'Networking' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-2xl text-white">
        <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
        <p className="text-blue-100">Let's discuss your next project or opportunity</p>
      </div>
      
      <div className="bg-white p-6 rounded-b-2xl shadow-xl border border-gray-200">
        {/* Debug Information */}
        <details className="mb-4 p-3 bg-gray-100 rounded">
          <summary className="cursor-pointer text-sm font-mono text-gray-600">
            🔍 Debug Information (click to expand)
          </summary>
          <div className="mt-2 text-xs font-mono text-gray-700">
            {debugInfo.map((info, index) => (
              <div key={index}>{info}</div>
            ))}
            <div>Turnstile Status: {turnstileToken ? '✅ Token received' : '❌ No token'}</div>
          </div>
        </details>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
              Inquiry Type *
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {inquiryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Brief subject line..."
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
              placeholder="Tell me about your project, opportunity, or what you'd like to discuss..."
            />
          </div>

          <div className="my-4 flex justify-center">
            {/* Temporarily hide Turnstile for testing */}
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                🧪 <strong>Debug Mode:</strong> Turnstile temporarily disabled for testing (like futurefast.ai)
              </p>
            </div>
            
            {/* Keep Turnstile component but hidden for now */}
            <div style={{ display: 'none' }}>
              <Turnstile
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || ''}
                onSuccess={(token) => {
                  console.log('✅ Turnstile success, token received:', token.substring(0, 10) + '...')
                  setTurnstileToken(token)
                  setMessage({ type: 'debug', text: '✅ Human verification completed!' })
                }}
                onError={(error) => {
                  console.log('❌ Turnstile error:', error)
                  setMessage({ type: 'error', text: 'Failed to load human verification. Please try refreshing.' })
                  setTurnstileToken(null)
                }}
                onExpire={() => {
                  console.log('⏰ Turnstile expired')
                  setMessage({ type: 'error', text: 'Human verification expired. Please try again.' })
                  setTurnstileToken(null)
                }}
                onLoad={() => {
                  console.log('📥 Turnstile loaded successfully')
                  setMessage({ type: 'debug', text: '📥 Human verification loaded. Please complete the challenge.' })
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending Message...
              </span>
            ) : (
              '🚀 Send Message'
            )}
          </button>

          {message && (
            <div className={`p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-blue-50 text-blue-800 border border-blue-200' 
                : message.type === 'debug'
                ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  )
} 