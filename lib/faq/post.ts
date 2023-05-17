import { glob } from "glob";
import { FAQData, FAQPost, PostsPath } from "./index";
import fs from 'fs/promises';
import matter from "gray-matter";
import path from "path";
import { fetchCategory } from "./category";

async function fetchPosts(categoryId: string) {
    const root = path.join(PostsPath, categoryId);
    const paths = await glob(`${root}/*.md`);

    const posts = paths.map(path => {
        const fileName = path.substring(root.length + 1);
        const [ postId ] = fileName.split('.md');

        return fetchPost(categoryId, postId);
    });
    
    return Promise.all(posts);
};

async function fetchPost(categoryId: string, postId: string): Promise<FAQPost> {
    const category = await fetchCategory(categoryId);
    const path = `${PostsPath}/${categoryId}/${postId}.md`;

    const raw = await fs.readFile(path, { encoding: 'utf-8' });
    const { content, data } = matter(raw);

    return {
        category,
        data: { id: postId, ...data } as FAQData,
        content
    };
};

export { fetchPosts, fetchPost };