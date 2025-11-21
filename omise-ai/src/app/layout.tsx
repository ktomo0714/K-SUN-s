import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'おみせ開業AI - 簡易シミュレーション',
  description: 'あなたの夢を、実現可能なビジネスプランに。飲食店開業の簡易シミュレーションで、夢を具体的なプランに変えましょう。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
