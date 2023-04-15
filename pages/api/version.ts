import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    try {
        const data = await fetch(
            "https://api.github.com/repos/EliteAsian123/YARG/releases/latest", {
            headers: { "User-Agent": "YARG" }
        }).then(res => res.json());

        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
        res.json({version: data["tag_name"], link: data["html_url"]});
    } catch (e) {
        console.error(e);
        res.status(400).json({version: "", link: "https://github.com/EliteAsian123/YARG/releases/latest"})
    }

}