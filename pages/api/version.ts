import type { NextApiRequest, NextApiResponse } from 'next'

type Version = {
    version: string,
    link: string
};

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

    try {
        const data = await fetch(
            "https://api.github.com/repos/YARC-Official/YARG/releases/latest", {
            headers: { "User-Agent": "YARG" }
        }).then(res => res.json());

        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
        res.json({version: data["tag_name"], link: data["html_url"]});
    } catch (e) {
        console.error(e);
        res.status(400).json({version: "", link: "https://github.com/YARC-Official/YARG/releases/latest"})
    }

};

export type { Version };