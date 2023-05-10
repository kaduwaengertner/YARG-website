import styles from './PageTitle.module.css';

type Props = {
    title?: string,
    description?: string,
    sticky?: boolean,
    children?: React.ReactNode
}

const PageTitle: React.FC<Props> = ({title, description, children, sticky = false}) => {
  return <div data-sticky={sticky}  className={styles.titleBox}>
    <div className={styles.text}>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.description}>{description}</span>
    </div>
    <div className={styles.children}>
      {children}
    </div>
  </div>;
}

export default PageTitle;
