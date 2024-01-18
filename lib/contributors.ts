import 'server-only';

type Socials = {
    Twitter?: string;
    Twitch?: string;
    Github?: string;
    VideoService?: string;
    Discord?: string;
    Email?: string;
    Website?: string;
};

type Contributions = {
    "OpenSource"?: string[];
    "YARC-Charters"?: string[];
    "YARC-Launcher"?: string[];
    "YARG"?: string[];
    "Community"?: string[];
};

type Contributor = {
    Name: string;
    SpecialRole?: string;
    Socials?: Socials;
    Contributions?: Contributions;
};

async function getContributors():Promise<Contributor[]> {
    const raw = await fetch(
        `https://raw.githubusercontent.com/YARC-Official/Contributors/master/contributors.json`,
        {
            next: {
                revalidate: 1800,
                tags: ['contributors']
            }
        }).then(res => res.json());

    return raw;
}

export { getContributors };
export type { Contributor };