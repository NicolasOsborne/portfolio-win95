import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '@/../sass/main.scss'

export type LayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Nicoo | Portfolio',
  description:
    "Nicoo c'est qui ? Découvrez le portfolio de Nicolas Osborne, Développeur Front-End et Intégrateur Web à Grenoble.",
}

const RootLayout = (props: Readonly<LayoutProps>) => {
  const { children } = props

  return (
    <html lang='fr'>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
