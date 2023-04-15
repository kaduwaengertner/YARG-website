import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Barlow } from 'next/font/google';

const barlow = Barlow({ weight: ['600', '700'], subsets: ["latin"] });
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <style jsx global>{`
    
    html {
      font-family: ${barlow.style.fontFamily};
    }
    
    `}</style>
    <Component {...pageProps} />
  </>);
}
