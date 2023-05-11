import styles from './Live.module.css';
import { TwitchStream } from '@/lib/twitch';

type Props = {
    stream: TwitchStream,
};

const Live: React.FC<Props> = ({ stream }) => {
    return (
        <a className={styles.stream} href={`https://twitch.tv/${stream.user_name}`}>
            <div className={styles.live} style={{backgroundImage: `url(${stream.thumbnail_url.replace('{width}', '640').replace('{height}', '360')})`}}>
            </div>
        </a>
    );
}

export { Live }