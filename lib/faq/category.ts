import { glob } from 'glob';
import { FAQCategory, PostsPath } from './index';
import fs from 'fs/promises';

async function fetchCategories() {
    const paths = await glob(`${PostsPath}/**/category.json`);
    const categories = paths.map(path => {
        const id = path.split("/").at(-2) as string;
        return fetchCategory(id);
    });

    return Promise.all(categories);
};

async function fetchCategory(id: string): Promise<FAQCategory> {

    const path = `${PostsPath}/${id}/category.json`;

    const raw = await fs.readFile(path, { encoding: 'utf-8' });
    const information = JSON.parse(raw);
    return { id, ...information };
};

export { fetchCategories, fetchCategory };
