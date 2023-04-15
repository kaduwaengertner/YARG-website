import Footer from '@/components/Footer'
import MenuHeader from '@/components/MenuHeader'
import PageTitle from '@/components/PageTitle';
import Tag from '@/components/Tag';
import { Roadmap, getRoadmap } from '@/lib/roadmap';
import styles from '@/styles/Roadmap.module.css';
import Head from 'next/head'

export async function getStaticProps() {

    const roadmap = await getRoadmap();

    return {
        props: {
            roadmap
        },
        revalidate: 3600,
    }
};

export default function Roadmap({roadmap}: {roadmap: [Roadmap]}) {
    return (<>
        <Head>
            <title>Roadmap - Yet Another Rhythm Game</title>
        </Head>

        <MenuHeader />

        <main>
            <PageTitle title="Roadmap" description="Upcoming features and plans" />

            <table className={styles.table}>
                <tbody>
                    <tr className={styles.header}>
                        <th>Task</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                    { roadmap.map(task => Row(task)) }
                </tbody>
            </table>
        </main>


        <Footer />
        </>
    );
}

const Row: React.FC<Roadmap> = (task) => {

    const statusColor = getStatusColor(task.status);
    const priorityColor = getPriorityColor(task.taskSize);

    return (<>

    <tr>
        <td>
            <span className={styles.title}>{task.task}</span>
            <span className={styles.description}>{task.description}</span>
        </td>
        <td><Tag>{task.type}</Tag></td>
        <td><Tag background={priorityColor.background} color={priorityColor.color}>{task.taskSize}</Tag></td>
        <td><Tag background={statusColor.background} color={statusColor.color}>{task.status}</Tag></td>
    </tr>

    </>)
}

type TagColor = {
    background: string,
    color: string
}

function getPriorityColor(taskSize: string): TagColor {
    return {
        background: "var(--tag-background)",
        color: "var(--accent)"
    }
}

function getStatusColor(status: string): TagColor {

    const lowercase = status.toLowerCase();

    if(lowercase.includes('done')) return {
        background: "var(--green)",
        color: "var(--background)"
    }

    if(lowercase.includes('todo')) return {
        background: "var(--red)",
        color: "var(--background)"
    }

    if(lowercase.includes('stalled')) return {
        background: "var(--blue)",
        color: "var(--background)"
    }

    if(lowercase.includes('doing')) return {
        background: "var(--yellow)",
        color: "var(--background)"
    }

    return {
        background: "var(--tag-background)",
        color: "var(--accent)"
    }
}