import useSWR from '@/hooks/useSWR';
import type { Version } from '@/pages/api/version';

const DownloadButton: React.FC = () => {

    const { data: version } = useSWR<Version>('api/version');

    return (
    <a href="https://yarg.in/download">
    <div className="download">
        DOWNLOAD {version && version.version}
        <style jsx>{`
            .download {
                background: rgb(var(--accent));
                color: var(--background);
                padding: 10px 20px;
                border-radius: 50px;
                border: 3px solid rgba(255, 255, 255, 0.5);
                font-weight: 700;
            }
        `}
        </style>
    </div>
    </a>);
}

export default DownloadButton;