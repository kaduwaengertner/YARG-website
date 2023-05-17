import PageTitle from "@/app/components/PageTitle";
import { fetchCategories } from "@/lib/faq/category";
import { fetchPost, fetchPosts } from "@/lib/faq/post";
import { marked } from "marked";

type Props = {
    params: {
        category: string,
        slug: string,
    }
};

export default async function FAQPage({params}: Props) {

    const { category, slug } = params;

    const post = await fetchPost(category, decodeURI(slug));
    const body = marked.parse(post.content);

    return (<>
        <PageTitle title={post?.data.title} description={post?.data.description} />

        <div dangerouslySetInnerHTML={{ __html: body }}></div>

    </>);

}

export async function generateStaticParams() {
    const categories = await fetchCategories();

    const postsPerCategory = await Promise.all(
        categories.map(category => fetchPosts(category.id))
    );

    const allPosts = postsPerCategory.flat();
    
    return allPosts.map(post => ({category: post.category.id, slug: post.data.id}));
}