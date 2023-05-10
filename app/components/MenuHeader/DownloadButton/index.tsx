import styles from './DownloadButton.module.css';

const DownloadButton = async () => {

    const { "tag_name": version } = await fetch("https://api.github.com/repos/YARC-Official/YARG/releases/latest", {
        headers: { "User-Agent": "YARG" }
      }).then(res => res.json());

    return (
        <a href="https://yarg.in/download">
            <div className={styles.download}>
                DOWNLOAD {version}
            </div>
        </a>
    );
}

export default DownloadButton;