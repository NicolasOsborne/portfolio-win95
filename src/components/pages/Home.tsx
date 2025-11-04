'use client'

import { FC } from 'react'
import AuthProvider, { useAuth } from '@/context/AuthContext'
import Desktop from '@/components/pages/Desktop'
import Login from '@/components/pages/Login'
import { Content, Locale } from '@/types/contentType'

type HomePageProps = {
  serverContent: Content
  initialLocale: Locale
  currentSlug?: string
}

const AppContent: FC = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className='page'>
      <main className='main'>
        {isAuthenticated ? (
          <Desktop username={user?.username || ''} />
        ) : (
          <Login />
        )}
      </main>
    </div>
  )
}

const Home: FC<HomePageProps> = ({
  serverContent,
  initialLocale,
  currentSlug,
}) => {
  return (
    <AuthProvider
      serverContent={serverContent}
      initialLocale={initialLocale}
      initialSlug={currentSlug}
    >
      <AppContent />
    </AuthProvider>
  )
}

export default Home
