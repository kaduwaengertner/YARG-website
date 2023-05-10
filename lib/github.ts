async function getVersion() {

    const { tag_name } = await fetch("https://api.github.com/repos/YARC-Official/YARG/releases/latest", {
        next: {
            revalidate: 1800,
            tags: ['github', 'version']
        },
        headers: {
            "User-Agent": "YARG"
        },
    }).then(res => res.json());

    return tag_name;

};

export { getVersion };