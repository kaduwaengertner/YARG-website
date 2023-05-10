import { NextResponse } from 'next/server';

type Version = {
    version: string,
    link: string
};

export async function GET() {

    const data = await fetch(
        "https://api.github.com/repos/YARC-Official/YARG/releases/latest", {
        headers: { "User-Agent": "YARG" }
    }).then(res => res.json());

    return NextResponse.json({ version: data["tag_name"], link: data["html_url"] });

}

export const revalidate = 1800;