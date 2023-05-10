"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styles from './SearchBar.module.css';
import { transformName } from '@/util/StringUtils';
import { Search } from 'lucide-react';

type Props = {
    setter: Dispatch<SetStateAction<string>>,
}

const SearchBar: React.FC<Props> = ({setter}) => {

    const [text, setText] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const raw = event.target.value;
        const search = transformName(raw);

        setText(search);
        return setter(search);
    }

    return (
        <label className={styles.search} data-active={text.length > 0}>
                <Search size={20} />
                <input 
                    type="text" 
                    onChange={onChange}
                />
        </label>
    );
}

export default SearchBar;

const searchCheck = (name: string, stringFilter: string) => {
    if(stringFilter.length <= 0) return true;
    return transformName(name).includes(transformName(stringFilter))
}

export { searchCheck }