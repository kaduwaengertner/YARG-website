
import PageTitle from "@/app/components/PageTitle";
import style from './FAQ.module.css';
import FAQItem from "./Item";

export const metadata = {
    title: "FAQ"
};

export default async function FAQ() {

    return (<>
        <PageTitle sticky title="F.A.Q." description="Frequently Asked Questions" />


        <div className={style.category}>
            <div className={style.title}>Category name</div>

            <div className={style.items}>

                <FAQItem 
                    title="How to make a great title" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." 
                />

                <FAQItem 
                    title="How to make a great title" 
                />

                <FAQItem 
                    title="How to make a great title" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." 
                />


            </div>

        </div>

    </>);

}
