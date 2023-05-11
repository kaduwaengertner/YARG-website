"use client";

import SearchBar from "@/app/components/SearchBar";
import { Dispatch, SetStateAction, useContext } from "react";
import { FilterDispatchContext } from "./provider";

const Search: React.FC = () => {

    const { setSearchFilter } = useContext(FilterDispatchContext);

    return <SearchBar setter={setSearchFilter as Dispatch<SetStateAction<any>>} />;
}

export default Search;