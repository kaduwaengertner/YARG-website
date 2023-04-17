import { toCamelCase, transformName } from '@/util/StringUtils';
import Papa, { ParseResult } from 'papaparse';

type Roadmap = {
    task: string,
    description: string,
    type: string,
    taskSize: string,
    assignees: string,
    status: string,
    notes: string
}

async function getRoadmap():Promise<Roadmap[]> {
    const raw = await fetch(`https://docs.google.com/spreadsheets/d/1XMSkLs-BX2Il0D41sgrrOOo1J9Lje_Anj-4XJt0AZOo/export?format=csv`).then(res => res.text());
    
    const { data } = Papa.parse<Roadmap>(raw, {
        header: true,
        transformHeader: header => toCamelCase(header)
    });

    const transformed = data.map(task => {
        if(transformName(task.type).length <= 0) { task.type = "Other" }
        if(transformName(task.taskSize).length <= 0) { task.taskSize = "Undefined" }
        if(transformName(task.status).length <= 0) { task.status = "Undefined" }
        return task;
    });

    return transformed;
}

export { getRoadmap };
export type { Roadmap };