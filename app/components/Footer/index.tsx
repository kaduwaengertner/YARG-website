import { getContributors } from '@/lib/contributors';
import styles from './Footer.module.css';

const Footer = async () => {

    const contributors = await getContributors();

    return (<footer className={styles.footer}>
        <div className={styles.socials}>
            <a className={styles.twitter} href="https://twitter.com/EliteAsian123" aria-label="EliteAsian123's Twitter"></a>
            <a className={styles.discord} href="https://discord.gg/sqpu4R552r" aria-label="YARG Discord Group"></a>
            <a className={styles.github} href="https://github.com/YARC-Official/YARG" aria-label="YARG Github Repository"></a>
        </div>
        <div className={styles.text}>
            Made with a lot of by <span className={styles.contributorsCount}>{contributors?.length || ""}</span> amazing people
        </div>
        <div className={styles.text}>
            Website by <a href="https://twitter.com/pantotone">@Pantotone</a> and <a href="https://twitter.com/kaduwaengertner" target='_blank'>@KaduWaengertner</a>
        </div>
    </footer>);
}

export { Footer };