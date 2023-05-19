"use client";

import Row from './Row';
import { useContext } from 'react';
import { FiltersContext } from '../filters/provider';
import { Issue } from '@/lib/youtrack';

type Props = {
  list: Issue[],
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