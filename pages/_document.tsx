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

        <script 
          type="application/ld+json"
          key="game-jsonld"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              
              "@context": "http://schema.org",
              "@type": ["VideoGame", "GameApplication"],
              "name": "YARG",
              "playMode": ["SinglePlayer", "MultiPlayer"],
              "url": "https://yarg.in",
              "image": "https://yarg.in/Game_Cover_Art.png",
              "logo": "https://yarg.in/Icon.png",
              "description": "Yet Another Rhythm Game inspired off of Rockband, Guitar Hero, Clone Hero, or similar.",
              "author": {
                "@type": "Person",
                "name": "EliteAsian123",
                "url": "https://twitter.com/eliteasian123"
              },
              "publisher": "EliteAsian123",
              "genre": ["Rhythm"],
              "gamePlatform":["Windows", "Mac", "Linux"],
              // "video": {
              //   "@type": "VideoObject",
              //   "name": "YARG v0.9 - Developer Update and Trailer",
              //   "caption": "YARG v0.9 - Developer Update and Trailer",
              //   "description": "It's still in its early stages, but progress is coming along nicely. Among the Clone Hero-styled games this is the only one with support for vocals, Pro Guitar and Keys. Bring your entire band and rock on! More features are coming each day! The project is entirely Open Source, so feel free to contribute! Subscribe for more news and updates.",
              //   "uploadDate": "2023-04-20T08:00:00+08:00",
              //   "duration": "PT4M55S",
              //   "thumbnailUrl": "https://i3.ytimg.com/vi/DQPA3r00bZo/maxresdefault.jpg",
              //   "embedUrl": "https://www.youtube.com/embed/DQPA3r00bZo",
              //   "url": "https://www.youtube.com/watch?v=DQPA3r00bZo"
              // }

            })
          }}
        />

      </body>
    </Html>
  )
}
