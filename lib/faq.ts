import { glob } from "glob";
import path from "path";
import fs from 'fs/promises';
import matter from 'gray-matter';

const Path = path.join(process.cwd(), 'faq');

const defaultCategory: FAQCategory = {
    id: "default",
    title: "Other questions"
};

type FAQData = {
    slug: string,
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
    title: string,
}

async function allPosts() {
    const paths = await glob(`${Path}/posts/**/*.md`);

    const posts = paths.map(async path => {
        const post = await getPost({path});
        return post;
    });

    return Promise.all(posts);
};

async function allCategories(): Promise<FAQCategory[]> {
    const file = await fs.readFile(`${Path}/categories.json`, { encoding: 'utf-8' });
    const categories: FAQCategory[] = JSON.parse(file);

    return [...categories, defaultCategory];
}

type getPostOptions = {
    slug?: string,
    path?: string,
};

async function getPost(options: getPostOptions): Promise<FAQPost> {
    if(!options.path && !options.slug) throw new Error('FAQ.getPost: missing slug/path;');

    const path = options.path || await getPathBySlug(options.slug as string);
    const slug = options.slug || getSlugByPath(options.path as string);

    const file = await fs.readFile(path);

    const { content, data } = matter(file);

    return {
        data: {slug, ...data} as FAQData,
        content 
    };
};

async function postsByCategory(categoryId: string, posts: FAQPost[]) {
    const categories = (await allCategories()).map(category => category.id);
    
    return posts.filter(post =>
        (categoryId === defaultCategory.id) ?
            !categories.includes(post.data.category)
            : post.data.category === categoryId
    );
}

/* Utils */

async function getPathBySlug(slug: string) {
    const paths = await glob(`${Path}/posts/**/${slug}.md`);
    return paths[0];
};

function getSlugByPath(path: string) {
    const fileName = path.split('/').at(-1) as string;
    const [ slug ] = fileName.split('.');

    return slug;
};

export { allPosts, allCategories, getPost, postsByCategory };
export type { FAQCategory, FAQPost, FAQData };
