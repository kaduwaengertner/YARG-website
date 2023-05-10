"use client";

import { useContext, useEffect } from 'react';
import styles from './FilterGrid.module.css';
import { FilterDispatchContext, FiltersContext } from '../provider';
import { transformName } from '@/util/StringUtils';
import Tag from '@/app/components/Tags';

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

                    {categoryList.map(category => {
                        return (
                            <Tag key={category} onAction={() => { toggleCategory(category) }} attributes={{ "data-active": categoryFilter.includes(transformName(category)) }} className="clickable">
                                <span>{category}</span>
                            </Tag>
                        )
                    })}
                </div>

                <div>
                    <div className={styles.title}>
                        Priority List
                        <div className={styles.titleButtons}>
                            <Tag className="clickable" onAction={() => { setPriorityFilter(priorityList) }}>All</Tag>
                            <Tag className="clickable" onAction={() => { setPriorityFilter([]) }}>None</Tag>
                        </div>
                    </div>

                    {priorityList.map(priority => {
                        const color = getPriorityColor(priority);
                        return (
                            <Tag key={priority} onAction={() => { togglePriority(priority) }} attributes={{ "data-active": priorityFilter.includes(transformName(priority)) }} className="clickable" background={color.background} color={color.color}>
                                <span>{priority}</span>
                            </Tag>
                        )
                    })}
                </div>

                <div>
                    <div className={styles.title}>
                        Status List
                        <div className={styles.titleButtons}>
                            <Tag className="clickable" onAction={() => { setStatusFilter(statusList) }}>All</Tag>
                            <Tag className="clickable" onAction={() => { setStatusFilter([]) }}>None</Tag>
                        </div>
                    </div>

                    {statusList.map(status => {
                        const color = getStatusColor(status);
                        return (
                            <Tag key={status} onAction={() => { toggleStatus(status) }} attributes={{ "data-active": statusFilter.includes(transformName(status)) }} className="clickable" background={color.background} color={color.color}>
                                <span>{status}</span>
                            </Tag>
                        );
                    })}
                </div>
            </div>
        ) : <></>

    );
}

export default FilterGrid;

type TagColor = {
    background: string,
    color: string
}

function getPriorityColor(taskSize: string): TagColor {
    return {
        background: "var(--tag-background)",
        color: "rgb(var(--accent))"
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
        color: "rgb(var(--accent))"
    }
}