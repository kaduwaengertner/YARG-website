
import PageTitle from "@/app/components/PageTitle";
import style from './FAQ.module.css';
import FAQItem from "./Item";
import { allCategories, allPosts, postsByCategory } from "@/lib/faq";

export const metadata = {
    title: "FAQ"
};

export default async function FAQ() {

    const posts = await allPosts();
    const categories = await allCategories();

    return (<>
        <PageTitle sticky title="F.A.Q." description="Frequently Asked Questions" />

        {
            categories.map(async category => {
                const categoryPosts = await postsByCategory(category.id, posts);
                if (categoryPosts.length < 1) return;

                return (<>
                    <div className={style.category}>
                        <div className={style.title}>{category.title}</div>

                        <div className={style.items}>
                            {
                                categoryPosts.map(post => <FAQItem key={post.data.title} category={category} data={post.data} />)
                            }
                        </div>
                    </div>
                </>);
            })
        }

    </>);

}
