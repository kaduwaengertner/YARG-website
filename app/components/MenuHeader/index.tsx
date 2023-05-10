import Link from 'next/link';
import { Logo } from '../Logo';
import DownloadButton from './DownloadButton';
import styles from './Header.module.css'

const MenuHeader: React.FC = () => {


    return <header className={styles.header}>

        <Link href="/">
            <Logo className={styles.logo}/>
        </Link>

        <div className={styles.links}>
            {/* <Link className={styles.link} href="/features">Features</Link> */}
            <Link className={styles.link} href="/roadmap">Roadmap</Link>
            {/* <Link className={styles.link} href="/contributors">Contributors</Link> */}

            {/* @ts-expect-error Server Component */}
            <DownloadButton />
        </div>

        </header>;
    }

export { MenuHeader };