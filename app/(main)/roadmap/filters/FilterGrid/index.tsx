"use client";

import { useContext } from 'react';
import styles from './FilterGrid.module.css';
import { FilterDispatchContext, FiltersContext } from '../provider';
import Tag from '@/app/components/Tags';
import TagButton from './TagButton';

type Props = {
    categoryList: string[],
    priorityList: string[],
    statusList: string[],
}

const FilterGrid: React.FC<Props> = ({categoryList, priorityList, statusList}) => {

    const { filterView } = useContext(FiltersContext);

    const { 
        setCategoryFilter, 
        setPriorityFilter, 
        setStatusFilter, 
    } = useContext(FilterDispatchContext);

   
    return (

        filterView ? (
            <div className={styles.filterGrid}>
                <div>
                    <div className={styles.title}>
                        Category List
                        <div className={styles.titleButtons}>
                            <Tag className="clickable" onAction={() => { setCategoryFilter([]) }}>All</Tag>
                            <Tag className="clickable" onAction={() => { setCategoryFilter(categoryList) }}>None</Tag>
                        </div>
                    </div>

                    { categoryList.map(category => <TagButton key={category}  name={category} type="category" />) }
                    
                </div>

                <div>
                    <div className={styles.title}>
                        Priority List
                        <div className={styles.titleButtons}>
                            <Tag className="clickable" onAction={() => { setPriorityFilter([]) }}>All</Tag>
                            <Tag className="clickable" onAction={() => { setPriorityFilter(priorityList) }}>None</Tag>
                        </div>
                    </div>

                    { priorityList.map(priority => <TagButton key={priority}  name={priority} type="priority" />) }

                </div>

                <div>
                    <div className={styles.title}>
                        Status List
                        <div className={styles.titleButtons}>
                            <Tag className="clickable" onAction={() => { setStatusFilter([]) }}>All</Tag>
                            <Tag className="clickable" onAction={() => { setStatusFilter(statusList) }}>None</Tag>
                        </div>
                    </div>

                    { statusList.map(status => <TagButton key={status}  name={status} type="status" />) }

                </div>
            </div>
        ) : <></>

    );
}

export default FilterGrid;