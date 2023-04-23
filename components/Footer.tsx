import React, { useEffect, useState } from 'react';
import styles from '@/styles/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import useSWR from '@/hooks/useSWR';

const Footer: React.FC = () => {

    const { data: contributors } = useSWR<[string]>('api/contributors');

    return (<footer className={styles.footer}>
        <div className={styles.socials}>
            <a className={styles.twitter} href="https://twitter.com/EliteAsian123" aria-label="EliteAsian123's Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
            <a className={styles.discord} href="https://discord.gg/sqpu4R552r" aria-label="YARG Discord Group"><FontAwesomeIcon icon={faDiscord} /></a>
            <a className={styles.github} href="https://github.com/EliteAsian123/YARG" aria-label="YARG Github Repository"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
        <div className={styles.text}>
            Made with a lot of <FontAwesomeIcon icon={faHeart} color="#FF9494" /> by <span className={styles.contributorsCount}>{contributors?.length || ""}</span> amazing people
        </div>
        <div className={styles.text}>
            Website by <a href="https://twitter.com/pantotone">@Pantotone</a> and <a href="https://twitter.com/kaduwaengertner" target='_blank'>@KaduWaengertner</a>
        </div>
    </footer>);
}

export default Footer;