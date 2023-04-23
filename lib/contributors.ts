import { stringToBoolean } from '@/util/StringUtils';
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
    const raw = await fetch(`https://docs.google.com/spreadsheets/d/1R1iXgoAeXhv6TLay-tnQew9Vu7ySIBUyhAE1lVImwDI/export?format=csv`).then(res => res.text());
    
    const { data } = Papa.parse<Contributors>(raw, {
        header: true,
    });

    const transformed = data.map(task => {
        task.artist = typeof task.artist === "string" ? stringToBoolean(task.artist as unknown as string) : task.artist;
        task.developer = typeof task.developer === "string" ? stringToBoolean(task.developer as unknown as string) : task.developer
        
        return task;
    });

    return transformed;
}

export { getContributors };
export type { Contributors };