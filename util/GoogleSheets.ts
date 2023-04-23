import { stringToBoolean } from "./StringUtils";

type Options = {
    gid?: string | number,
}

async function getCSV(id: string, options?: Options) {
    const raw = await fetch(`https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${options?.gid || 0}`).then(res => res.text());

    return raw;
};

function BooleanCell(value: unknown): boolean {
    if(typeof value === "string") { return stringToBoolean(value) }

    return false;
}

export { getCSV, BooleanCell };