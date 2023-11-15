import './globals.css'
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Providers } from './providers/Providers'

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Github issue tracker',
  description: 'Next.js 14 Github oauth第三方登入實作',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
