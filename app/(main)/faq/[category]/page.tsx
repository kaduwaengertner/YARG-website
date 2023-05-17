import PageTitle from "@/app/components/PageTitle";
import { fetchCategories, fetchCategory } from "@/lib/faq/category";
import PostsGrid from "../PostsGrid";
import { fetchPosts } from "@/lib/faq/post";

type Props = {
    params: {
        category: string
    }
};

export default async function FAQCategory({ params }: Props) {

    const category = await fetchCategory(params.category);
    const categoryPosts = await fetchPosts(category.id);
    
    return (<>
    
        <PageTitle title={category.name} description={category.description || "Frequently Asked Questions"} />
        <PostsGrid category={category} posts={categoryPosts} />

    </>);
};

export async function generateStaticParams() {
    const categories = await fetchCategories();

    return categories.map(category => ({ category: category.id }));
}