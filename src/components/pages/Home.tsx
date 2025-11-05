'use client'

import { FC } from 'react'
import AuthProvider, { useAuth } from '@/context/AuthContext'
import ContentProvider from '@/context/ContentContext'
import Desktop from '@/components/pages/Desktop'
import Login from '@/components/pages/Login'
import { Content, Locale } from '@/types/contentType'

type HomePageProps = {
  serverContent: Content
  initialLocale: Locale
  currentSlug?: string
}

const AppContent: FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className='page'>
      <main className='main'>{isAuthenticated ? <Desktop /> : <Login />}</main>
    </div>
  )
}

const Home: FC<HomePageProps> = ({
  serverContent,
  initialLocale,
  currentSlug,
}) => {
  return (
    <ContentProvider
      initialContent={serverContent}
      initialLocale={initialLocale}
    >
      <AuthProvider initialSlug={currentSlug}>
        <AppContent />
      </AuthProvider>
    </ContentProvider>
  )
}

export default Home
