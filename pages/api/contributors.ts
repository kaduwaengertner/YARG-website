import { getContributors } from '@/lib/contributors';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    try {
        const contributors = await getContributors();

        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
        res.json(contributors);
    } catch (e) {
        console.error(e);
        res.status(400).json([])
    }

}