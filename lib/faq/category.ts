import { glob } from 'glob';
import { FAQCategory, FetchOptions, PostsPath, getIdByPath } from './index';
import fs from 'fs/promises';

async function fetchCategories() {
    const paths = await glob(`${PostsPath}/**/category.json`);
    const categories = paths.map(path => fetchCategory({ path }));

    return Promise.all(categories);
};

async function fetchCategory(options: FetchOptions): Promise<FAQCategory> {
    if (!options.id && !options.path) throw new Error('Missing id/path');

    const id = options.id || getIdByPath(options.path as string, -2);
    const path = options.path || `${PostsPath}/${id}/category.json`;

    const raw = await fs.readFile(path, { encoding: 'utf-8' });
    const information = JSON.parse(raw);
    return { id, ...information };
};

export { fetchCategories, fetchCategory };
