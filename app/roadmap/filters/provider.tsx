'use client';
 
import { searchCheck } from '@/app/components/SearchBar';
import { Roadmap } from '@/lib/roadmap';
import { transformName } from '@/util/StringUtils';
import { Dispatch, SetStateAction, createContext, useState } from 'react';


type Filters = {
    filterView: boolean,
}

type FilterDispatch = {
    toggleFilterView: Function,
}

export const FiltersContext = createContext<{[key: string]: any}>({});
export const FilterDispatchContext = createContext<{[key: string]: Function}>({});

type ProviderProps = {
    children?: React.ReactNode,
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

const FiltersProvider: React.FC<ProviderProps> = ({children}) => {

    const [filterView, setFilterView] = useState<boolean>(false);
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
    const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);


    const toggleFilterView = (toggle?: boolean) => setFilterView(current => typeof toggle === "boolean" ? toggle : !current);
    const toggleCategory = (name: string, toggle?: boolean) => toggleFilter(setCategoryFilter, name, toggle);
    const togglePriority = (name: string, toggle?: boolean) => toggleFilter(setPriorityFilter, name, toggle);
    const toggleStatus = (name: string, toggle?: boolean) => toggleFilter(setStatusFilter, name, toggle);

    const filterCheck = (task: Roadmap) => {
        return searchCheck(task.task, searchFilter) &&
        !statusFilter.includes(transformName(task.status)) &&
        !categoryFilter.includes(transformName(task.type)) &&
        !priorityFilter.includes(transformName(task.taskSize))
    }

    return (
        <FiltersContext.Provider value={{
            filterView, 
            searchFilter,
            categoryFilter,
            priorityFilter,
            statusFilter,
            filterCheck
        }}>
            <FilterDispatchContext.Provider value={{
                toggleFilterView,
                setSearchFilter,

                toggleCategory,
                setCategoryFilter,

                togglePriority,
                setPriorityFilter,

                toggleStatus,
                setStatusFilter,
            }}>

                {children}

            </FilterDispatchContext.Provider>
        </FiltersContext.Provider>
    );
}

export default FiltersProvider;