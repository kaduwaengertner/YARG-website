import Footer from '@/components/Footer'
import MenuHeader from '@/components/MenuHeader'
import PageTitle, { PageButton, PageButtons } from '@/components/PageTitle';
import SearchBar, { searchCheck } from '@/components/SearchBar';
import Tag from '@/components/Tag';
import { Roadmap, getRoadmap } from '@/lib/roadmap';
import styles from '@/styles/Roadmap.module.css';
import { transformName } from '@/util/StringUtils';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head'
import { Dispatch, SetStateAction, useState } from 'react';

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

    function getList(key: keyof Roadmap) {
        const allList = roadmap.map(task => transformName(task[key]));
        const uniqueSet = new Set(allList);
        return Array.from(uniqueSet);
    }
    
    const categoryList = getList('type');
    const priorityList = getList('taskSize');
    const statusList = getList('status');
    
    /* Filters */
    const [filterView, setFilterView] = useState(false);
    const [searchFilter, setSearchFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(categoryList);
    const [priorityFilter, setPriorityFilter] = useState(priorityList);
    const [statusFilter, setStatusFilter] = useState(statusList);

    const filterCheck = (task: Roadmap) => {
        return searchCheck(task.task, searchFilter) &&
        statusFilter.includes(transformName(task.status)) &&
        categoryFilter.includes(transformName(task.type)) &&
        priorityFilter.includes(transformName(task.taskSize))
    }

    function toggleFilter(setter: Dispatch<SetStateAction<string[]>>, rawName: string, toggle?: boolean) {
        const name = transformName(rawName);

        const add = (list: string[]) => (!list.includes(name)) ? [...list, name] : list;
        const remove = (list: string[]) => list.filter(item => item !== name);

        if(typeof toggle === "undefined") {
            return setter(list => list.includes(name) ? remove(list) : add(list));
        } else {
            return toggle === true ? setter(add) : setter(remove);
        }
    }

    const toggleFilterView = (toggle?: boolean) => setFilterView(current => typeof toggle === "boolean" ? toggle : !current);
    const toggleCategory = (name: string, toggle?: boolean) => toggleFilter(setCategoryFilter, name, toggle);
    const togglePriority = (name: string, toggle?: boolean) => toggleFilter(setPriorityFilter, name, toggle);
    const toggleStatus = (name: string, toggle?: boolean) => toggleFilter(setStatusFilter, name, toggle);

    const Row: React.FC<Roadmap> = (task) => {

        const statusColor = getStatusColor(task.status);
        const priorityColor = getPriorityColor(task.taskSize);
    
        return (<>
    
        <tr>
            <td>
                <span className={styles.title}>{task.task}</span>
                <span className={styles.description}>{task.description}</span>
            </td>
            <td><Tag className="clickable" onClick={() => {setCategoryFilter([transformName(task.type)])}} >{task.type}</Tag></td>
            <td><Tag className="clickable" onClick={() => {setPriorityFilter([transformName(task.taskSize)])}} background={priorityColor.background} color={priorityColor.color}>{task.taskSize}</Tag></td>
            <td><Tag className="clickable" onClick={() => {setStatusFilter([transformName(task.status)])}} background={statusColor.background} color={statusColor.color}>{task.status}</Tag></td>
        </tr>
    
        </>)
    }

    return (<>
        <Head>
            <title>Roadmap - Yet Another Rhythm Game</title>
        </Head>

        <MenuHeader />

        <main>
            <PageTitle title="Roadmap" description="Upcoming features and plans">
                <PageButtons>
                    <SearchBar setter={setSearchFilter}/>
                    <PageButton onClick={() => {toggleFilterView()}}><FontAwesomeIcon icon={faFilter} /></PageButton>
                </PageButtons>
            </PageTitle>

            {filterView && (
            <div className={styles.filterGrid}>
                <div>
                    <div className={styles.title}>
                        Category List
                        <Tag className="clickable" onClick={() => {setCategoryFilter(categoryList)}}>All</Tag>
                        <Tag className="clickable" onClick={() => {setCategoryFilter([])}}>None</Tag>
                    </div>

                    {categoryList.map(category => {
                        return (
                            <Tag key={category} onClick={() => {toggleCategory(category)}} attributes={{"data-active": categoryFilter.includes(transformName(category))}} className="clickable">
                                <span>{category}</span>
                            </Tag>
                        )
                    })}
                </div>

                <div>
                    <div className={styles.title}>
                        Priority List
                        <Tag className="clickable" onClick={() => {setPriorityFilter(priorityList)}}>All</Tag>
                        <Tag className="clickable" onClick={() => {setPriorityFilter([])}}>None</Tag>
                    </div>

                    {priorityList.map(priority => {
                        const color = getPriorityColor(priority);
                        return (
                            <Tag key={priority} onClick={() => {togglePriority(priority)}} attributes={{"data-active": priorityFilter.includes(transformName(priority))}} className="clickable" background={color.background} color={color.color}>
                                <span>{priority}</span>
                            </Tag>
                        )
                    })}
                </div>

                <div>
                    <div className={styles.title}>
                        Status List
                        <Tag className="clickable" onClick={() => {setStatusFilter(statusList)}}>All</Tag>
                        <Tag className="clickable" onClick={() => {setStatusFilter([])}}>None</Tag>
                    </div>

                    {statusList.map(status => {
                        const color = getStatusColor(status);
                        return (
                            <Tag key={status} onClick={() => {toggleStatus(status)}} attributes={{"data-active": statusFilter.includes(transformName(status))}} className="clickable" background={color.background} color={color.color}>
                                <span>{status}</span>
                            </Tag>
                        );
                    })}
                </div>
            </div>
            )}


            <table className={styles.table}>
                <tbody>
                    <tr className={styles.header}>
                        <th>Task</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                    { 
                        roadmap
                        .filter(task => filterCheck(task))
                        .map(task => Row(task)) 
                    }
                </tbody>
            </table>
        </main>


        <Footer />
        </>
    );
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