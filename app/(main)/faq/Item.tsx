import { FAQCategory, FAQData } from '@/lib/faq';
import style from './FAQ.module.css';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
    category: FAQCategory,
    data: FAQData,
}

const FAQItem: React.FC<Props> = ({ category, data }) => {
  return (<Link href={`faq/${category.id}/${data.slug}`}>
    <div className={style.item}>

      <div className={style.info}>
        <div className={style.title}>{data.title}</div>
        <div className={style.description}>{data.description}</div>
      </div>

      <div className={style.button}>
        <ChevronRight />
      </div>
    </div>
  </Link>
  );
}

export default FAQItem;