'use client'

import { FC, useState } from 'react'
import Button from '@/components/atoms/Button'
import { useContent } from '@/context/ContentContext'

const ContactWindow: FC = () => {
  const { content } = useContent()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const componentsClass = 't_ContactWindow'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const token = localStorage.getItem('jwt_token')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      setSuccess('Message sent successfully!')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred while sending your message')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={componentsClass}>
      <div className={`${componentsClass}_window`}>
        <form onSubmit={handleSubmit} className={`${componentsClass}_form`}>
          <div className={`${componentsClass}_fields`}>
            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.name.label}
              </span>
              <input
                type='text'
                className={`${componentsClass}_input`}
                placeholder={content.contact.name.placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
            </label>

            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.email.label}
              </span>
              <input
                type='email'
                className={`${componentsClass}_input`}
                placeholder={content.contact.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </label>

            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.message.label}
              </span>
              <textarea
                className={`${componentsClass}_input`}
                placeholder={content.contact.message.placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                rows={5}
              />
            </label>
          </div>

          {error && (
            <p className={`${componentsClass}_message-error`}>{error}</p>
          )}
          {success && (
            <p className={`${componentsClass}_message-success`}>{success}</p>
          )}

          <div className={`${componentsClass}_buttons`}>
            <Button type='submit' disabled={isLoading}>
              {content.contact.submit}
            </Button>
            <Button
              type='button'
              disabled={isLoading}
              onClick={() => {
                setName('')
                setEmail('')
                setMessage('')
                setError('')
                setSuccess('')
              }}
            >
              {content.contact.cancel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactWindow
