'use client'

import { FC } from 'react'
import AuthProvider, { useAuth } from '@/context/AuthContext'
import ContentProvider from '@/context/ContentContext'
import Desktop from '@/components/pages/Desktop'
import Login from '@/components/pages/Login'
import { Locale } from '@/types/contentType'

type HomeProps = { initialLocale: Locale }

const AppContent: FC = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div className='page'>
      <main className='main'>{isAuthenticated ? <Desktop /> : <Login />}</main>
    </div>
  )
}

const Home: FC<HomeProps> = ({ initialLocale }) => (
  <ContentProvider initialLocale={initialLocale}>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </ContentProvider>
)

export default Home
