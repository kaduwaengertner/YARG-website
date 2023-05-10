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

    const { 
        filterView, 
        categoryFilter,
        priorityFilter,
        statusFilter
    } = useContext(FiltersContext);

    const { 
        toggleCategory, 
        setCategoryFilter, 
        togglePriority, 
        setPriorityFilter, 
        toggleStatus,
        setStatusFilter, 
    } = useContext(FilterDispatchContext);

   
    return (

        filterView ? (
            <div className={styles.filterGrid}>
                <div>
                    <div className={styles.title}>
                        Category List
                        <div className={styles.titleButtons}>
                            <Tag className="clickable" onAction={() => { setCategoryFilter(categoryList) }}>All</Tag>
                            <Tag className="clickable" onAction={() => { setCategoryFilter([]) }}>None</Tag>
                        </div>
                    </div>

                    {categoryList.map(category => <TagButton key={category}  name={category} type="category" />)}
                    
                </div>

                <div>
                    <div className={styles.title}>
                        Priority List
                        <div className={styles.titleButtons}>
                            <Tag className="clickable" onAction={() => { setPriorityFilter(priorityList) }}>All</Tag>
                            <Tag className="clickable" onAction={() => { setPriorityFilter([]) }}>None</Tag>
                        </div>
                    </div>

                    {priorityList.map(priority => <TagButton key={priority}  name={priority} type="priority" />)}

                </div>

                <div>
                    <div className={styles.title}>
                        Status List
                        <div className={styles.titleButtons}>
                            <Tag className="clickable" onAction={() => { setStatusFilter(statusList) }}>All</Tag>
                            <Tag className="clickable" onAction={() => { setStatusFilter([]) }}>None</Tag>
                        </div>
                    </div>

                    {statusList.map(status => <TagButton key={status}  name={status} type="status" />)}

                </div>
            </div>
        ) : <></>

    );
}

export default FilterGrid;