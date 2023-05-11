import 'server-only';

const baseUrl = "https://api.twitch.tv/helix";

async function getAuthorizationBearer() {
    const { access_token } = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_APPLICATION_ID}&client_secret=${process.env.TWITCH_APPLICATION_SECRET}&grant_type=client_credentials`, {
        method: 'POST'
    }).then(res => res.json());

    return access_token;
};

async function api(path: string, options?: Object) {

    const token = await getAuthorizationBearer();

    return fetch(`${baseUrl}/${path}`, {
        headers: {
            "Client-ID": process.env.TWITCH_APPLICATION_ID as string,
            "Authorization": `Bearer ${token}`
        },
        ...options
    }).then(res => res.json());

};

type TwitchStream = {
    id: string,
    user_id: string,
    user_login: string,
    user_name: string,
    game_id: string,
    game_name: string,
    type: 'live'|'',
    title: string,
    viewer_count: number,
    started_at: string,
    language: string,
    thumbnail_url: string,
    tag_ids: string[],
    tags: string[],
    is_mature: boolean
}

async function getStreams() {
    const streams = await api(`streams?type=live&first=10&game_id=${process.env.TWITCH_GAME_CATEGORY_ID}`, { next: { revalidate: 300 } });
    return streams.data as TwitchStream[];
};

export { getStreams };
export type { TwitchStream };