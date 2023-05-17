import { glob } from "glob";
import { FAQData, FAQPost, FetchOptions, PostsPath, getIdByPath } from "./index";
import fs from 'fs/promises';
import matter from "gray-matter";

async function fetchPosts(categoryId: string) {
    const paths = await glob(`${PostsPath}/${categoryId}/*.md`);
    const posts = paths.map(path => fetchPost({ path }));
    
    return Promise.all(posts);
};

async function fetchPost(options: FetchOptions): Promise<FAQPost> {
    if (!options.id && !options.path) throw new Error('Missing id/path');

    const id = options.id || getIdByPath(options.path as string);
    const path = options.path || `${PostsPath}/${options.id}/category.json`;

    const raw = await fs.readFile(path, { encoding: 'utf-8' });
    const { content, data } = matter(raw);

    return {
        data: { id, ...data } as FAQData,
        content
    };
};

export { fetchPosts, fetchPost };