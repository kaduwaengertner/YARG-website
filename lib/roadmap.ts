import toCamel from '@/util/toCamelCase';
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

async function getRoadmap():Promise<[Roadmap]> {
    const raw = await fetch(`https://docs.google.com/spreadsheets/d/1XMSkLs-BX2Il0D41sgrrOOo1J9Lje_Anj-4XJt0AZOo/export?format=csv`).then(res => res.text());
    
    const parser = Papa.parse(raw, {
        header: true,
        transformHeader: header => toCamel(header)
    });

    const data = parser.data as [Roadmap];
    return data;
}

export { getRoadmap };