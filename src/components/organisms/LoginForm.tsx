'use client'

import { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@/components/atoms/Button'
import Window from '@/components/molecules/Window'
import { useAuth } from '@/context/AuthContext'
import ControlType from '@/enums/ControlType'
import { useContent } from '@/context/ContentContext'

const LoginForm: FC = () => {
  const { login } = useAuth()
  const { content } = useContent()
  const componentsClass = 'o_LoginForm'

  const formik = useFormik({
    initialValues: {
      username: 'visitor',
      password: 'password',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(content.login.errors.usernameRequired),
      password: Yup.string().required(content.login.errors.passwordRequired),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const success = await login(values.username, values.password)
        if (!success) {
          setErrors({ password: content.login.errors.error })
        }
      } catch (err) {
        console.error('Login failed unexpectedly:', err)
        setErrors({ password: 'Unexpected error during login' })
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className={componentsClass}>
      <Window
        title={content.login.title}
        icon={content.login.icon}
        controls={[ControlType.HELP]}
        isFocused={true}
      >
        <div className={`${componentsClass}_window`}>
          <form
            onSubmit={formik.handleSubmit}
            className={`${componentsClass}_form`}
          >
            <div className={`${componentsClass}_content`}>
              <p className={`${componentsClass}_title`}>
                {content.login.prompt}
              </p>
              <div className={`${componentsClass}_fields`}>
                <label className={`${componentsClass}_row`}>
                  <span className={`${componentsClass}_label`}>
                    {content.login.username}
                  </span>
                  <input
                    type='text'
                    className={`${componentsClass}_input`}
                    {...formik.getFieldProps('username')}
                    disabled={formik.isSubmitting}
                  />
                </label>
                {formik.touched.username && formik.errors.username && (
                  <p className={`${componentsClass}_message-error`}>
                    {formik.errors.username}
                  </p>
                )}

                <label className={`${componentsClass}_row`}>
                  <span className={`${componentsClass}_label`}>
                    {content.login.password}
                  </span>
                  <input
                    type='password'
                    className={`${componentsClass}_input`}
                    {...formik.getFieldProps('password')}
                    disabled={formik.isSubmitting}
                  />
                </label>
                {formik.touched.password && formik.errors.password && (
                  <p className={`${componentsClass}_message-error`}>
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className={`${componentsClass}_buttons`}>
              <Button type='submit' disabled={formik.isSubmitting}>
                {content.login.ok}
              </Button>
              <Button
                type='button'
                disabled={formik.isSubmitting}
                onClick={() => formik.resetForm()}
              >
                {content.login.cancel}
              </Button>
            </div>
          </form>
        </div>
      </Window>
    </div>
  )
}

export default LoginForm
