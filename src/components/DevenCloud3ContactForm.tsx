'use client'

import React, { useState, useEffect, useRef } from 'react'

interface ContactFormProps {
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
}

interface FormMessage {
  type: 'success' | 'error'
  text: string
}

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback': () => void;
        'error-callback': () => void;
      }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export default function DevenCloud3ContactForm({ 
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
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<FormMessage | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>('')
  const turnstileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    function renderTurnstile() {
      console.log('Polling for turnstile:', {
        turnstile: typeof window.turnstile,
        ref: !!turnstileRef.current
      })
      if (window.turnstile && turnstileRef.current) {
        // Clear the container before rendering
        turnstileRef.current.innerHTML = '';
        console.log('Rendering turnstile widget...')
        const widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAAAIKHgKNWkpW6FPg',
          callback: (token: string) => {
            setTurnstileToken(token)
          },
          'expired-callback': () => {
            setTurnstileToken('')
          },
          'error-callback': () => {
            setTurnstileToken('')
          }
        })
        setTurnstileWidgetId(widgetId)
        if (interval) clearInterval(interval)
      }
    }
    // Poll every 200ms until window.turnstile is available
    interval = setInterval(renderTurnstile, 200)
    return () => {
      if (interval) clearInterval(interval)
    }
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
    
    if (!turnstileToken) {
      setMessage({
        type: 'error',
        text: 'Please complete the security check'
      })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('https://crm.deven.site/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_DEVENCLOUD3_CRM_API_KEY || 'your-api-key-here'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          note: formData.message,
          turnstileToken: turnstileToken,
          sourceWebsite: 'devencloud3.vercel.app',
          sourcePage: '/contact',
          sourceUrl: window.location.href
        })
      })

      if (response.ok) {
        await response.json()
        setMessage({
          type: 'success',
          text: '🚀 Thank you for reaching out! I\'ll get back to you soon.'
        })
        
        // Reset form and Turnstile
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        if (turnstileWidgetId) {
          window.turnstile.reset(turnstileWidgetId)
        }
        setTurnstileToken('')
        
        onSuccess?.()
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit form')
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Something went wrong. Please try again.'
      setMessage({
        type: 'error',
        text: errorMessage
      })
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ 
      width: '100vw',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}>
        <h2 style={{ 
          color: 'white', 
          fontSize: '1.75rem', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          margin: '0 0 0.5rem 0'
        }}>
          Get In Touch
        </h2>
        <p style={{ 
          color: 'rgb(203, 213, 225)', 
          margin: '0',
          fontSize: '1rem',
          whiteSpace: 'nowrap'
        }}>
          Let's discuss your next project or opportunity
        </p>
      </div>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        margin: '0 auto',
        padding: '0',
        boxSizing: 'border-box'
      }}>
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem', 
          width: '100%',
          margin: '0',
          padding: '0'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            width: '100%'
          }}>
            <div style={{ width: '100%' }}>
              <label htmlFor="firstName" style={{ 
                display: 'block', 
                color: 'rgb(203, 213, 225)', 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                marginBottom: '0.5rem',
                textAlign: 'left'
              }}>
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '30px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                  margin: '0'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                  e.target.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            <div style={{ width: '100%' }}>
              <label htmlFor="lastName" style={{ 
                display: 'block', 
                color: 'rgb(203, 213, 225)', 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                marginBottom: '0.5rem',
                textAlign: 'left'
              }}>
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '30px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                  margin: '0'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                  e.target.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <label htmlFor="email" style={{ 
              display: 'block', 
              color: 'rgb(203, 213, 225)', 
              fontSize: '0.9rem', 
              fontWeight: '500', 
              marginBottom: '0.5rem',
              textAlign: 'left'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '30px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                boxSizing: 'border-box',
                margin: '0'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                e.target.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <label htmlFor="phone" style={{ 
              display: 'block', 
              color: 'rgb(203, 213, 225)', 
              fontSize: '0.9rem', 
              fontWeight: '500', 
              marginBottom: '0.5rem',
              textAlign: 'left'
            }}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '30px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                boxSizing: 'border-box',
                margin: '0'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                e.target.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <label htmlFor="subject" style={{ 
              display: 'block', 
              color: 'rgb(203, 213, 225)', 
              fontSize: '0.9rem', 
              fontWeight: '500', 
              marginBottom: '0.5rem',
              textAlign: 'left'
            }}>
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Brief subject line..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '30px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                boxSizing: 'border-box',
                margin: '0'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                e.target.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <label htmlFor="message" style={{ 
              display: 'block', 
              color: 'rgb(203, 213, 225)', 
              fontSize: '0.9rem', 
              fontWeight: '500', 
              marginBottom: '0.5rem',
              textAlign: 'left'
            }}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Tell me about your project, opportunity, or what you'd like to discuss..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '30px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                resize: 'vertical',
                minHeight: '120px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                margin: '0'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.7)';
                e.target.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          <div ref={turnstileRef} className="cf-turnstile" style={{ marginBottom: '1.5rem' }}></div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="form-submit-button"
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.classList.add('hover');
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.classList.remove('hover');
              }
            }}
          >
            {isSubmitting ? (
              <>
                <svg style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending Message...
              </>
            ) : (
              <>🚀 Send Message</>
            )}
          </button>

          {message && (
            <div 
              style={{
                padding: '1rem',
                borderRadius: '30px',
                border: message.type === 'success' 
                  ? '1px solid rgba(34, 197, 94, 0.4)' 
                  : '1px solid rgba(239, 68, 68, 0.4)',
                background: message.type === 'success' 
                  ? 'rgba(34, 197, 94, 0.15)' 
                  : 'rgba(239, 68, 68, 0.15)',
                color: message.type === 'success' 
                  ? 'rgb(134, 239, 172)' 
                  : 'rgb(252, 165, 165)',
                marginTop: '1rem',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box',
                margin: '1rem 0 0 0'
              }}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  )
} 