import { getContributors } from '@/lib/contributors';
import { NextResponse } from 'next/server';

export async function GET() {

    const contributors = await getContributors();

    return NextResponse.json(contributors);
}