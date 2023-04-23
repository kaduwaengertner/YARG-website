import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>

        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content="#080b13" />
        <meta name="description" content="Yet Another Rhythm Game inspired off of Rockband, Guitar Hero, Clone Hero, or similar." />
        <meta name="keywords" content="YARG, Yet Another Rhythm Game, Rock Band, Guitar Hero, Clone Hero" />
        <meta name="author" content="@EliteAsian123" />

        <meta name="og:locale" content="en-US"/>
        <meta name="og:type" content="website" />
        <meta name="og:title" content="YARG | Yet Another Rhythm Game"/>
        <meta name="og:site_name" content="YARG | Yet Another Rhythm Game"/>
        <meta name="og:description" content="Yet Another Rhythm Game inspired off of Rockband, Guitar Hero, Clone Hero, or similar." />
        <meta name="og:url" content="https://yarg.in/" />
        <meta name="og:image" content="/banner.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YARG | Yet Another Rhythm Game" />
        <meta name="twitter:description" content="Yet Another Rhythm Game inspired off of Rockband, Guitar Hero, Clone Hero, or similar." />
        <meta name="twitter:site" content="https://yarg.in"/>
        <meta name="twitter:creator" content="@EliteAsian123" />
        <meta name="twitter:image" content="https://yarg.in/banner.png" />
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
