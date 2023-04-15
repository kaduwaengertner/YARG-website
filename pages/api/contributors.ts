import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    try {
        const raw = await fetch(
            "https://api.github.com/repos/EliteAsian123/YARG/contributors", {
            headers: { "User-Agent": "YARG" }
        }).then(res => res.json());

        const contributorsNames = raw.map((contribuitor: any) => contribuitor.login);

        res.setHeader('Cache-Control', 's-maxage=86400');
        res.json(contributorsNames);
    } catch (e) {
        console.error(e);
        res.status(400).json([])
    }

}