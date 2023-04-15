import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Barlow } from 'next/font/google';

const barlow = Barlow({ weight: ['600', '700'], subsets: ["latin"] });

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
