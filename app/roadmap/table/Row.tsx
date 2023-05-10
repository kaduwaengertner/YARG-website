import type { Roadmap } from '@/lib/roadmap';
import styles from '../Roadmap.module.css';
import Tag from '@/app/components/Tags';

const Row: React.FC<{task: Roadmap}> = ({task}) => {
  return (<tr>
    <td data-cell="task">
        <span className={styles.title}>{task.task}</span>
        <span className={styles.description}>{task.description}</span>
    </td>
    <td data-cell="category">
        <Tag className="clickable">{task.type}</Tag>
    </td>
    <td data-cell="priority">
        <Tag className="clickable">{task.taskSize}</Tag>
    </td>
    <td data-cell="status">
        <Tag className="clickable">{task.status}</Tag>
    </td>
  </tr>);
}

export default Row;