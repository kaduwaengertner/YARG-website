import { transformName } from "@/util/StringUtils";
import { useContext } from "react";
import { FilterDispatchContext, FiltersContext } from "../provider";
import Tag from "@/app/components/Tags";

type filterTypes = 'category' | 'priority' | 'status';

type Props = {
    name: string,
    type: filterTypes,
}

const TagButton: React.FC<Props> = ({name, type}) => {

    const filters = useContext(FiltersContext);
    const dispatch = useContext(FilterDispatchContext);

    const filtersByType: {[key in filterTypes]: string[]} = {
        'category': filters.categoryFilter,
        'priority': filters.priorityFilter,
        'status': filters.statusFilter,
    }

    const togglerByType: {[key in filterTypes]: Function} = {
        'category': dispatch.toggleCategory,
        'priority': dispatch.togglePriority,
        'status': dispatch.toggleStatus,
    }

    return (
        <Tag 
            key={name} 
            onAction={() => { togglerByType[type](name) }} 
            attributes={{ "data-active": !filtersByType[type].includes(transformName(name)) }} 
            className="clickable"
            background={colorsByType[type](name).background}
            color={colorsByType[type](name).color}
        >
            <span>{name}</span>
        </Tag>

    );
}

export default TagButton;


type TagColor = {
    background: string,
    color: string
}

function getDefaultColor(): TagColor {
    return {
        background: "var(--tag-background)",
        color: "rgb(var(--accent))"
    }}

export const colorsByType: {[key in filterTypes]: Function} = {
    'category': getDefaultColor,
    'priority': getDefaultColor,
    'status': getStatusColor,
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