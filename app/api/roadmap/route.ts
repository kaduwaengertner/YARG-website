import { getIssues } from '@/lib/youtrack';
import { NextResponse } from 'next/server';

export async function GET() {

    const roadmap = await getIssues();

    return NextResponse.json(roadmap);
}

export const revalidate = 1800;