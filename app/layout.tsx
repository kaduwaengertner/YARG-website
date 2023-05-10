import './globals.css'
import { Barlow } from 'next/font/google'

const barlow = Barlow({ weight: ['400', '500', '600', '700'], subsets: ["latin"] })

export const metadata = {
  title: {
    template: '%s | Yet Another Rhythm Game',
  },

  description: 'Yet Another Rhythm Game inspired off of Rockband, Guitar Hero, Clone Hero, or similar.',
  keywords: ["YARG", "Yet Another Rhythm Game", "Rock Band", "Guitar Hero", "Clone Hero"],
  creator: "@EliteAsian123",
  themeColor: "#080b13",

  openGraph: {
    locale: "en-US",
    type: "website",
    title: "YARG | Yet Another Rhythm Game",
    siteName: "YARG | Yet Another Rhythm Game",
    description: "Yet Another Rhythm Game inspired off of Rockband, Guitar Hero, Clone Hero, or similar.",
    url: "https://yarg.in",
  },

  twitter: {
    card: "summary_large_image",
    title: "YARG | Yet Another Rhythm Game", 
    description: "Yet Another Rhythm Game inspired off of Rockband, Guitar Hero, Clone Hero, or similar.",
    site: "https://yarg.in",
    creator: "@EliteAsian123",
    image: "https://yarg.in/banner.png",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={barlow.className}>{children}</body>
    </html>
  )
}
