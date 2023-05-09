import 'server-only';

import { BooleanCell, getCSV } from '@/util/GoogleSheets';
import Papa from 'papaparse';

type Contributors = {
    name: string,
    image: string,
    github: string,
    twitter: string,
    artist: boolean,
    developer: boolean,
    extra: string
}

async function getContributors():Promise<Contributors[]> {
    const raw = await getCSV("1R1iXgoAeXhv6TLay-tnQew9Vu7ySIBUyhAE1lVImwDI");
    
    const { data } = Papa.parse<Contributors>(raw, {
        header: true,

        transform: (value) => {
            return value.trim();
        },
    });

    const transformed = data.map(task => {
        task.artist = BooleanCell(task.artist);
        task.developer = BooleanCell(task.developer);
        
        return task;
    });

    return transformed;
}

export { getContributors };
export type { Contributors };