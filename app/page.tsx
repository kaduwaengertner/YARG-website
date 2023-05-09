import Image from 'next/image'
import styles from './page.module.css'
import { FullLogo } from './components/Logo'
import gameScreenshot from '@/public/game-screenshot.png';
import { HeaderButton } from './components/HomeHeader';
import { Footer } from './components/Footer';

export const metadata = {
  title: "YARG | Yet Another Rhythm Game"
}

export default async function Home() {

  const { "tag_name": version } = await fetch("https://api.github.com/repos/YARC-Official/YARG/releases/latest", {
    headers: { "User-Agent": "YARG" }
  }).then(res => res.json());

  return (<>

    <header className={styles.header}>
      <FullLogo className={styles.logo}/>
      
      <div className={styles.video}>
        <video autoPlay muted loop playsInline poster={gameScreenshot.src}>
          <source src="/ingame-video.webm" type="video/webm" />
        </video>
      </div>
    
      <div className={styles.buttons}>

        <a href="https://github.com/YARC-Official/YARG/releases/latest">
          <HeaderButton background="rgb(var(--accent))" style={{ textTransform: "none" }}>
            DOWNLOAD {version}
          </HeaderButton>
        </a>

        <a href="https://discord.gg/sqpu4R552r" target='_blank'>
          <HeaderButton>
            Join our Discord
          </HeaderButton>
        </a>

      </div>
    </header>

    <main>

    </main>
    
    {/* @ts-expect-error Server Component */}
    <Footer />

  </>)
}
