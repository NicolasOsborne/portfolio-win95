import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Locale } from '@/types/contentType'
import '@/../sass/main.scss'

export type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export const metadata: Metadata = {
  title: 'Nicoo | Portfolio',
  description:
    "Nicoo c'est qui ? Découvrez le portfolio de Nicolas Osborne, Développeur Front-End et Intégrateur Web à Grenoble.",
}

const RootLayout = async (props: Readonly<LocaleLayoutProps>) => {
  const { children, params } = props
  const { locale } = await params

  const currentLocale = locale || 'fr'

  return (
    <html lang={currentLocale}>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
