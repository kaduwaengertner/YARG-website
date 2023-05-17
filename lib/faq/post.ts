import { glob } from "glob";
import { FAQData, FAQPost, PostsPath } from "./index";
import fs from 'fs/promises';
import matter from "gray-matter";
import path from "path";

async function fetchPosts(categoryId: string) {
    const root = path.join(PostsPath, categoryId);
    const paths = await glob(`${root}/*.md`);

    const posts = paths.map(path => {
        const fileName = path.substring(root.length + 1);
        const [ postId ] = fileName.split('.md');

        return fetchPost({ postId, categoryId });
    });
    
    return Promise.all(posts);
};

type FetchOptions = {
    categoryId: string,
    postId: string,
};

async function fetchPost({categoryId, postId}: FetchOptions): Promise<FAQPost> {
    const path = `${PostsPath}/${categoryId}/${postId}.md`;

    const raw = await fs.readFile(path, { encoding: 'utf-8' });
    const { content, data } = matter(raw);

    return {
        data: { id: postId, ...data } as FAQData,
        content
    };
};

export { fetchPosts, fetchPost };