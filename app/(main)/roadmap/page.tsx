import { transformName } from "@/util/StringUtils";
import PageTitle from "@/app/components/PageTitle";
import { PageButtons } from "@/app/components/PageTitle/buttons";
import styles from './Roadmap.module.css';
import FilterGrid from "./filters/FilterGrid";
import Search from "./filters/SearchFilter";
import ViewFilterButton from "./filters/ViewFilterButton";
import FiltersProvider from './filters/provider';
import { Roadmap, getRoadmap } from '@/lib/roadmap';
import FilteredTable from "./table/FilteredTable";

export const metadata = {
    title: "Roadmap"
};

export default async function Roadmap() {

    const roadmap = await getRoadmap();

    function getList(key: keyof Roadmap) {
        const allList = roadmap.map(task => transformName(task[key]));
        const uniqueSet = new Set(allList);
        return Array.from(uniqueSet);
    }

    const categoryList = getList('type');
    const priorityList = getList('taskSize');
    const statusList = getList('status');
    
    return (<>
      
            <FiltersProvider>
                <PageTitle sticky title="Roadmap" description="Upcoming features and plans">
                    <PageButtons>
                        <Search />
                        <ViewFilterButton />
                    </PageButtons>
                </PageTitle>

                <FilterGrid categoryList={categoryList} priorityList={priorityList} statusList={statusList} />

                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.header}>
                            <th>Task</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Status</th>
                        </tr>
                        <FilteredTable list={roadmap} />
                    </tbody>
                </table>

            </FiltersProvider>
    
    </>);

}
