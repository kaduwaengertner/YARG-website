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
    category: FAQCategory,
    content: string,
};

type FAQCategory = {
    id: string,
    name: string,
    description?: string
};

export { RootPath, PostsPath };
export type { FAQData, FAQCategory, FAQPost };