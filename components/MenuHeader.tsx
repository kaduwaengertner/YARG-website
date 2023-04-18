import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import DownloadButton from './DownloadButton';
import styles from '@/styles/Header.module.css'

const MenuHeader: React.FC = () => {


    return <header className={styles.header}>

        <Link href="/">
            <Logo className={styles.logo}/>
        </Link>

        <div className={styles.links}>
            {/* <Link className={styles.link} href="/features">Features</Link> */}
            <Link className={styles.link} href="/roadmap">Roadmap</Link>
            {/* <Link className={styles.link} href="/contributors">Contributors</Link> */}

            <DownloadButton />
        </div>

        </header>;
    }

export default MenuHeader;
