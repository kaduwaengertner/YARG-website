import { getVersion } from '@/lib/github';
import styles from './DownloadButton.module.css';

const DownloadButton = async () => {

    const version = await getVersion();

    return (
        <a href="https://yarg.in/download">
            <div className={styles.download}>
                DOWNLOAD {version}
            </div>
        </a>
    );
}

export default DownloadButton;