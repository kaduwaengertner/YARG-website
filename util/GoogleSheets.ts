import 'server-only';

import { stringToBoolean } from "./StringUtils";

type Options = {
    gid?: string | number,
    tag?: string,
}

async function getCSV(id: string, options?: Options) {
    const raw = await fetch(
        `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${options?.gid || 0}`,
        {
            next: {
                revalidate: 1800,
                tags: options?.tag ? ['sheet', options.tag] : ['sheet']
            }
        }).then(res => res.text());

    return raw;
};

function BooleanCell(value: unknown): boolean {
    if(typeof value === "string") { return stringToBoolean(value) }

    return false;
}

export { getCSV, BooleanCell };