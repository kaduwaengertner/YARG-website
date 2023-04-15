import Footer from '@/components/Footer'
import MenuHeader from '@/components/MenuHeader'
import PageTitle from '@/components/PageTitle';
import Head from 'next/head'

export default function Roadmap() {
    return (<>
        <Head>
            <title>Roadmap - Yet Another Rhythm Game</title>
        </Head>

        <MenuHeader />

        <PageTitle title="Roadmap" description="Upcoming features and plans" />

        <Footer />
        </>
    );
}