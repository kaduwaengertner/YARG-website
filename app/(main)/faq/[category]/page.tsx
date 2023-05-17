import PageTitle from "@/app/components/PageTitle";
import { getCategory } from "@/lib/faq";

type Props = {
    params: {
        category: string
    }
};

export default async function FAQCategory({ params }: Props) {

    const category = await getCategory(params.category);

    return (<>
    
        <PageTitle title={category?.title} description="Frequently Asked Questions" />
    
    </>);
};
