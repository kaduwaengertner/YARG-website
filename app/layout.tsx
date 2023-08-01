import './globals.css'
import { Barlow } from 'next/font/google'

const barlow = Barlow({ weight: ['400', '500', '600', '700'], subsets: ["latin"] })

const defaultTitle = "YARG | Yet Another Rhythm Game";
const description = "YARG (a.k.a. Yet Another Rhythm Game) is a free, open-source, plastic guitar game that is still in development. It supports guitar (five fret), drums (plastic or e-kit), vocals, pro-guitar, and more!";
const twitterAccount = "@YARGGame";

export const metadata = {
  title: {
    template: '%s | Yet Another Rhythm Game',
  },

  description: description,
  keywords: ["YARG", "Yet Another Rhythm Game", "Rock Band", "Guitar Hero", "Clone Hero"],
  creator: twitterAccount,
  themeColor: "#080b13",

  openGraph: {
    locale: "en-US",
    type: "website",
    title: defaultTitle,
    siteName: defaultTitle,
    description: description,
    url: "https://yarg.in",
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle, 
    description: description,
    site: "https://yarg.in",
    creator: twitterAccount,
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
