"use client";

import { PageButton } from '@/app/components/PageTitle/buttons';
import React, { useContext } from 'react';
import styles from '../Roadmap.module.css';
import { FilterDispatchContext, FiltersContext } from './provider';

const ViewFilterButton: React.FC = () => {

    const { filterView } = useContext(FiltersContext);
    const { toggleFilterView } = useContext(FilterDispatchContext);

    return (
        <PageButton className={styles.filterButton}
            disabled={!filterView} 
            onAction={() => {toggleFilterView()}}
        >
            {/* <FontAwesomeIcon icon={faFilter} /> */}
            <span>Filters</span>
        </PageButton>
    );
}

export default ViewFilterButton;