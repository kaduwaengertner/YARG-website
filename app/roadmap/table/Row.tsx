import type { Roadmap } from '@/lib/roadmap';
import styles from '../Roadmap.module.css';
import Tag from '@/app/components/Tags';
import { colorsByType } from '../filters/FilterGrid/TagButton';

const Row: React.FC<{task: Roadmap}> = ({task}) => {
  return (<tr>
    
    <td data-cell="task">
        <span className={styles.title}>{task.task}</span>
        <span className={styles.description}>{task.description}</span>
    </td>

    <td data-cell="category">
      <Tag
        background={colorsByType['category'](task.type).background}
        color={colorsByType['category'](task.type).color}
      >{task.type}</Tag>
    </td>

    <td data-cell="priority">
      <Tag
        background={colorsByType['priority'](task.taskSize).background}
        color={colorsByType['priority'](task.taskSize).color}
      >{task.taskSize}</Tag>
    </td>

    <td data-cell="status">
        <Tag 
          background={ colorsByType['status'](task.status).background }
          color={ colorsByType['status'](task.status).color }
        >{task.status}</Tag>
    </td>

  </tr>);
}

export default Row;