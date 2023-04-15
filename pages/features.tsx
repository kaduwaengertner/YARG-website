import Feature from '@/components/Feature';
import Footer from '@/components/Footer'
import MenuHeader from '@/components/MenuHeader'
import PageTitle from '@/components/PageTitle';
import styles from '@/styles/Features.module.css';
import Head from 'next/head'

export default function Roadmap() {
    return (<>
        <Head>
            <title>Features - Yet Another Rhythm Game</title>
        </Head>

        <MenuHeader />

        <PageTitle title="Features" description="Discover our game's awesome features!" />

        <main>
            <div className={styles.grid}>
                <Feature title="Pro Drums Support" description="Pro Drums Support" image="https://cdn.streamelements.com/uploads/f8ec6582-1c4b-41c7-b33f-1766d0db0c81.jpeg"/>
                <Feature title="Pro Drums Support" description="Pro Drums Support" />
                <Feature title="Pro Drums Support" description="Pro Drums Support" />
                <Feature title="Pro Drums Support" description="Pro Drums Support" />
                <Feature title="Pro Drums Support" description="Pro Drums Support" />
            </div>
        </main>

        <Footer />
        </>
    );
}