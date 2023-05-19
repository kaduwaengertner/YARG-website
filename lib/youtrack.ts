const baseURL = "https://yarg.youtrack.cloud/api";

async function api(path: string) {
    const raw = await fetch(
        `${baseURL}/${path}`,
        {
            next: {
                revalidate: 1800,
                tags: ["youtrack"]
            }
        }).then(res => res.json());

    return raw;
};

type Issue = {
    task: string,
    description: string,
    category: string,
    priority: string,
    status: string,
    version: string
}

async function getIssues(): Promise<Issue[]> {

    const raw = await api("issues?fields=summary,description,resolved,customFields(value(name),projectCustomField(field(name)))");

    const issues = raw.map((issue: any) => ({
        task: issue.summary,
        description: issue.description,
        category: getCustomField(issue, "Type")?.value?.name || "",
        priority: getCustomField(issue, "Priority")?.value?.name || "",
        status: getCustomField(issue, "State")?.value?.name || "",
        version: getCustomField(issue, "Version")?.value?.name || "",
    }));
    
    return issues;
};

function getCustomField(issue: any, customFieldName: string) {
    const customField = issue?.customFields?.find((customField: any) => customField?.projectCustomField?.field?.name?.toLowerCase() === customFieldName.toLowerCase());
    console.log(customField);
    return customField
};

export { getIssues };
export type { Issue };