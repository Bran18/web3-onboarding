import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { RootLayoutWrapper } from '@/components/layout/root-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Web3 Onboarding',
  description: 'Learn and explore the world of Web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <RootLayoutWrapper>
            {children}
          </RootLayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}