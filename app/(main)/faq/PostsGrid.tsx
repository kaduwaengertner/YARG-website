import { FAQCategory, FAQPost } from '@/lib/faq';
import style from './FAQ.module.css';
import FAQItem from './Item';

type Props = {
  category: FAQCategory,
  posts: FAQPost[],
}

const PostsGrid: React.FC<Props> = ({category, posts}) => {
  return (<div className={style.items}>
    {
      posts.map(post => <FAQItem key={post.data.title} category={category} data={post.data} />)
    }
  </div>);
}

export default PostsGrid;