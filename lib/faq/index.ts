import path from "path";

const RootPath = path.join(process.cwd(), 'faq');
const PostsPath = path.join(RootPath, 'posts');

type FAQData = {
    id: string,
    title: string,
    description?: string,
    category: string,
    tags: string[],
};

type FAQPost = {
    data: FAQData,
    content: string,
};

type FAQCategory = {
    id: string,
    name: string,
    description?: string
};

type FetchOptions = {
    id?: string,
    path?: string,
};

function getIdByPath(path: string, offset: number = -1) {
    const fileName = path.split('/').at(offset) as string;
    const [ id ] = fileName.split('.');

    return id;
};

export { RootPath, PostsPath, getIdByPath };
export type { FAQData, FAQCategory, FAQPost, FetchOptions };