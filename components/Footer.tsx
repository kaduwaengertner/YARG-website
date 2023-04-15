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
            <a className={styles.twitter} href="https://twitter.com/EliteAsian123"><FontAwesomeIcon icon={faTwitter} /></a>
            <a className={styles.discord} href="https://discord.gg/sqpu4R552r"><FontAwesomeIcon icon={faDiscord} /></a>
            <a className={styles.github} href="https://github.com/EliteAsian123/YARG"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
        <div className={styles.text}>
            Made with a lot of <FontAwesomeIcon icon={faHeart} /> by <span className={styles.contributorsCount}>{contributors?.length || ""}</span> amazing people
        </div>
    </footer>);
}

export default Footer;