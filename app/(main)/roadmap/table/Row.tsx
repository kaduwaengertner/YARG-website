import styles from '../Roadmap.module.css';
import Tag from '@/app/components/Tags';
import { colorsByType } from '../filters/FilterGrid/TagButton';
import type { Issue } from '@/lib/youtrack';

const Row: React.FC<{task: Issue}> = ({task}) => {
  return (<tr>
    
    <td data-cell="task">
      <a className={styles.title} href={`https://yarg.youtrack.cloud/issue/${task.id}`} target="_blank">
        {task.task}
      </a>
    </td>

    <td data-cell="category">
      <Tag
        background={colorsByType['category'](task.category).background}
        color={colorsByType['category'](task.category).color}
      >{task.category}</Tag>
    </td>

    <td data-cell="priority">
      <Tag
        background={colorsByType['priority'](task.priority).background}
        color={colorsByType['priority'](task.priority).color}
      >{task.priority}</Tag>
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