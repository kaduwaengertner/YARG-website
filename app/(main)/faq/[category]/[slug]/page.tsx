import PageTitle from "@/app/components/PageTitle";
import { getPostByCategory } from "@/lib/faq";
import { marked } from "marked";

type Props = {
    params: {
        category: string,
        slug: string,
    }
};

export default async function FAQPage({params}: Props) {

    const { category, slug } = params;
    const post = await getPostByCategory(category, decodeURI(slug));
    const body = marked.parse(post?.content || "");

    return (<>
        <PageTitle title={post?.data.title} description={post?.data.description} />

        <div dangerouslySetInnerHTML={{ __html: body }}></div>

    </>);

}