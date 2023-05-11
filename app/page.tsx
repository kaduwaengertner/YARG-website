import Image from 'next/image'
import styles from './page.module.css'
import { FullLogo } from './components/Logo'
import gameScreenshot from '@/public/game-screenshot.png';
import { HeaderButton } from './components/HomeHeader';
import { Footer } from './components/Footer';
import { getVersion } from '@/lib/github';
import { getStreams } from '@/lib/twitch';
import HomeComponent from './components/HomeComponent';
import Tag from './components/Tags';
import { Live } from './components/Live';

export const metadata = {
  title: "YARG | Yet Another Rhythm Game"
}

export default async function Home() {

  const version = await getVersion();
  const streams = await getStreams();

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
            DOWNLOAD { version }
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

      {
        streams.length > 0 ? (<>

          <HomeComponent title="Live">
            <a href="https://www.twitch.tv/directory/game/YARG" target="_blank">
              <Tag background="rgb(var(--accent))" color="var(--background)" style={{ fontSize: "1em" }}>Browse on Twitch</Tag>
            </a>
          </HomeComponent>
          <div className={styles.lives}>
            {
              streams.slice(0, 3).map(stream => <Live key={stream.id} stream={stream} />)
            }
          </div>
          
        </>) : <></>
      }

    </main>
    
    {/* @ts-expect-error Server Component */}
    <Footer />

  </>)
}
