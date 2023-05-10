import { getVersion } from '@/lib/github';
import { NextResponse } from 'next/server';

type Version = {
    version: string,
    link: string
};

export async function GET() {

    const version = await getVersion();

    return NextResponse.json({ version });

}

export const revalidate = 1800;