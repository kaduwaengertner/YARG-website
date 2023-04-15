import React, { useEffect, useState } from 'react';
import styles from '@/styles/Footer.module.css'

const Footer: React.FC = () => {

    const [contributorsCount, setContributorsCount] = useState(null);

    useEffect(() => {
        fetch("api/contributors")
        .then(res => res.json())
        .then(contributors => setContributorsCount(contributors.length))
    }, []);

    return <footer className={styles.footer}>
        <div className={styles.socials}>
            <a className={styles.twitter} href="https://twitter.com/EliteAsian123">Twitter</a>
            <a className={styles.discord} href="https://discord.gg/sqpu4R552r">Discord</a>
            <a className={styles.github} href="https://github.com/EliteAsian123/YARG">GitHub</a>
        </div>
        <div className={styles.text}>
            Made with a lot of <i className="fa-solid fa-heart fa-heart-red"></i> by <span className={styles.contributorsCount}>{contributorsCount}</span> amazing people
        </div>
    </footer>;
}

export default Footer;