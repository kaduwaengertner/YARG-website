import PageTitle from "@/app/components/PageTitle";
import { fetchCategory } from "@/lib/faq/category";
import PostsGrid from "../PostsGrid";
import { fetchPosts } from "@/lib/faq/post";

type Props = {
    params: {
        category: string
    }
};

export default async function FAQCategory({ params }: Props) {

    const category = await fetchCategory({id: params.category});
    const categoryPosts = await fetchPosts(category.id);
    
    return (<>
    
        <PageTitle title={category.name} description={category.description || "Frequently Asked Questions"} />
        <PostsGrid category={category} posts={categoryPosts} />

    </>);
};
