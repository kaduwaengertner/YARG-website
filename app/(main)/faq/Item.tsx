import style from './FAQ.module.css';
import { ChevronRight } from 'lucide-react';

type Props = {
    title?: string,
    description?: string,
}

const FAQItem: React.FC<Props> = ({title, description}) => {
  return (<div className={style.item}>

    <div className={style.info}>
        <div className={style.title}>{ title }</div>
        <div className={style.description}>{ description }</div>
    </div>

    <div className={style.button}>
        <ChevronRight />
    </div>
  </div>);
}

export default FAQItem;