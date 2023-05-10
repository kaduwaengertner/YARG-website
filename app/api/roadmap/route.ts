import { getRoadmap } from '@/lib/roadmap';
import { NextResponse } from 'next/server';

export async function GET() {

    const roadmap = await getRoadmap();

    return NextResponse.json(roadmap);
}