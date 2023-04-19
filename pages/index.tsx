import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Footer from '@/components/Footer'
import { FullLogo } from '@/components/Logo'
import { CSSProperties } from 'react'
import gameScreenshot from '@/public/game-screenshot.png';
export default function Home() {
  return (
    <>
      <Head>
        <title>YARG - Yet Another Rhythm Game</title>
        <meta name="description" content="Yet Another Rhythm Game inspired off of Rockband, Guitar Hero, Clone Hero, or similar." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      </Head>

      <header className={styles.header}>
        <FullLogo className={styles.logo}/>
        <div className={styles.video}>
          <Image src={gameScreenshot} alt="In-game Screenshot"/>
        </div>
        <div className={styles.buttons}>
          <a href="https://github.com/EliteAsian123/YARG/releases/latest">
            <HeaderButton background="rgb(var(--accent))" style={{textTransform: "none"}}>DOWNLOAD v0.8.2</HeaderButton>
          </a>
          <a href="https://discord.gg/sqpu4R552r" target='_blank'>
            <HeaderButton>Join our Discord</HeaderButton>
          </a>
        </div>
      </header>

      <Footer/>
    </>
  )
}

type HeaderButtonProps = {
  background?: string,
  color?: string,
  children?: React.ReactNode
  style?: CSSProperties,
}

const HeaderButton: React.FC<HeaderButtonProps> = ({background, color = "var(--background)", children, style}) => {
  return <button style={{...style, background, color}}>{children}</button>;
}