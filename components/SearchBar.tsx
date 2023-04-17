import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from '@/styles/SearchBar.module.css';
import { transformName } from '@/util/StringUtils';

type Props = {
    setter: Dispatch<SetStateAction<string>>,
}

const SearchBar: React.FC<Props> = ({setter}) => {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const raw = event.target.value;
        const search = transformName(raw);

        return setter(search);
    }

    return (<div className={styles.search}>
        <input type="text" onChange={onChange}/>
    </div>);
}

export default SearchBar;

const searchCheck = (name: string, stringFilter: string) => {
    if(stringFilter.length <= 0) return true;
    return transformName(name).includes(transformName(stringFilter))
}

export { searchCheck }