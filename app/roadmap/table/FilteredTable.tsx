"use client";

import type { Roadmap } from '@/lib/roadmap';
import Row from './Row';
import { useContext } from 'react';
import { FiltersContext } from '../filters/provider';

type Props = {
  list: Roadmap[],
};

const FilteredTable: React.FC<Props> = ({ list }) => {

  const { filterCheck } = useContext(FiltersContext);

  return (<>

    {
      list
        .filter(task => filterCheck(task))
        .map(task => <Row key={task.task} task={task} />)
    }

  </>);
}

export default FilteredTable;