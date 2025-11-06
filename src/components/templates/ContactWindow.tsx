'use client'

import { FC, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@/components/atoms/Button'
import { useContent } from '@/context/ContentContext'

const ContactWindow: FC = () => {
  const { content } = useContent()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const componentsClass = 't_ContactWindow'

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(content.contact.errors.nameRequired),
      email: Yup.string()
        .email(content.contact.errors.email.invalid)
        .required(content.contact.errors.email.required),
      message: Yup.string().required(content.contact.errors.message),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError('')
      setSuccess('')

      try {
        const token = localStorage.getItem('jwt_token')
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        })

        if (!res.ok) throw new Error('Failed to send message')

        setSuccess(content.contact.errors.success)
        resetForm()
      } catch (err) {
        console.error(err)
        setError(content.contact.errors.error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className={componentsClass}>
      <div className={`${componentsClass}_window`}>
        <form
          onSubmit={formik.handleSubmit}
          className={`${componentsClass}_form`}
        >
          <div className={`${componentsClass}_fields`}>
            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.name.label}
              </span>
              <input
                type='text'
                className={`${componentsClass}_input`}
                placeholder={content.contact.name.placeholder}
                {...formik.getFieldProps('name')}
                disabled={formik.isSubmitting}
              />
            </label>
            {formik.touched.name && formik.errors.name && (
              <p className={`${componentsClass}_message-error`}>
                {formik.errors.name}
              </p>
            )}

            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.email.label}
              </span>
              <input
                type='email'
                className={`${componentsClass}_input`}
                placeholder={content.contact.email.placeholder}
                {...formik.getFieldProps('email')}
                disabled={formik.isSubmitting}
              />
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className={`${componentsClass}_message-error`}>
                {formik.errors.email}
              </p>
            )}

            <label className={`${componentsClass}_row`}>
              <span className={`${componentsClass}_label`}>
                {content.contact.message.label}
              </span>
              <textarea
                className={`${componentsClass}_input`}
                placeholder={content.contact.message.placeholder}
                {...formik.getFieldProps('message')}
                disabled={formik.isSubmitting}
                rows={5}
              />
            </label>
            {formik.touched.message && formik.errors.message && (
              <p className={`${componentsClass}_message-error`}>
                {formik.errors.message}
              </p>
            )}
          </div>

          {success && (
            <p className={`${componentsClass}_message-success`}>{success}</p>
          )}
          {error && (
            <p className={`${componentsClass}_message-error`}>{error}</p>
          )}

          <div className={`${componentsClass}_buttons`}>
            <Button type='submit' disabled={formik.isSubmitting}>
              {content.contact.submit}
            </Button>
            <Button
              type='button'
              disabled={formik.isSubmitting}
              onClick={() => formik.resetForm()}
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
