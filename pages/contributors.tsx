import Footer from '@/components/Footer'
import MenuHeader from '@/components/MenuHeader'
import PageTitle from '@/components/PageTitle';
import Head from 'next/head'

export default function Roadmap() {
    return (<>
        <Head>
            <title>Features - Yet Another Rhythm Game</title>
        </Head>

        <MenuHeader />

        <PageTitle title="Contributors" description="The talented people behind our project" />

        <Footer />
        </>
    );
}