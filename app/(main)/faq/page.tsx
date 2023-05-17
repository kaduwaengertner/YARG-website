
import PageTitle from "@/app/components/PageTitle";
import style from './FAQ.module.css';
import FAQItem from "./Item";
import { fetchCategories } from "@/lib/faq/category";
import { fetchPosts } from "@/lib/faq/post";
import PostsGrid from "./PostsGrid";

export const metadata = {
    title: "FAQ"
};

export default async function FAQ() {

    const categories = await fetchCategories();

    return (<>
        <PageTitle sticky title="F.A.Q." description="Frequently Asked Questions" />

        {
            categories.map(async category => {
                const categoryPosts = await fetchPosts(category.id);
                if (categoryPosts.length < 1) return;

                return (<>
                    <div className={style.category}>
                        <div className={style.title}>{category.name}</div>

                        <PostsGrid category={category} posts={categoryPosts}/>
                    </div>
                </>);
            })
        }

    </>);

}
