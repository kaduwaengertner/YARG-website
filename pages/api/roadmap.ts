import { getRoadmap } from '@/lib/roadmap'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    try {
        const roadmap = await getRoadmap();
        res.json(roadmap);
    } catch (e) {
        console.error(e);
        res.status(400).json([])
    }

}