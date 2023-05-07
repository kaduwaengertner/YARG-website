import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Footer from '@/components/Footer'
import { FullLogo } from '@/components/Logo'
import { CSSProperties } from 'react'
import gameScreenshot from '@/public/game-screenshot.png';
import videoOverlay from '@/public/video-overlay.png';
import HomeComponent from '@/components/HomeComponent'
import Tag from '@/components/Tag'
import useSWR from '@/hooks/useSWR'
import type { Version } from './api/version'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const getStaticProps: GetStaticProps = async () => {

  const latestVersion = await fetch(
      "https://api.github.com/repos/YARC-Official/YARG/releases/latest", {
      headers: { "User-Agent": "YARG" }
  }).then(res => res.json());

  return {
      props: {
          version: latestVersion["tag_name"] as string,
      },
      revalidate: 1800,
  }
};

export default function Home({version}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <link rel="canonical" href="https://yarg.in"/>
        <title>YARG - Yet Another Rhythm Game</title>
      </Head>

      <header className={styles.header}>
        <FullLogo className={styles.logo}/>
        <div className={styles.video}>
          <video autoPlay muted loop playsInline poster={gameScreenshot.src}>
            <source src="/ingame-video.webm" type="video/webm" />
          </video>
          <Image src={videoOverlay} loading={"eager"} alt="In-game Video" draggable={false} className={styles.overlay}/>
        </div>
        <div className={styles.buttons}>
          <a href="https://github.com/EliteAsian123/YARG/releases/latest">
            <HeaderButton background="rgb(var(--accent))" style={{textTransform: "none"}}>DOWNLOAD {version}</HeaderButton>
          </a>
          <a href="https://discord.gg/sqpu4R552r" target='_blank'>
            <HeaderButton>Join our Discord</HeaderButton>
          </a>
        </div>
      </header>

      <main>
        {/* <HomeComponent title="Latest Updates" description="Latest tweets by Elite with #YARG hashtag?"></HomeComponent> */}


        {/* <HomeComponent title="Live">
          <a href="https://www.twitch.tv/directory/game/YARG" target="_blank">
            <Tag background="rgb(var(--accent))" color="var(--background)" style={{fontSize: "1em"}}>Browse on Twitch</Tag>
          </a>
        </HomeComponent>
        <div className={styles.lives}>
          <Live></Live>
          <Live></Live>
          <Live></Live>
        </div> */}

      </main>

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

type LiveProps = {

}

const Live: React.FC<LiveProps> = ({}) => {
  return <div className={styles.live}></div>
}