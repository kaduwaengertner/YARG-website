import React, { useEffect, useState } from 'react';

type Version = {
    version: string,
    link: string
};

const DownloadButton: React.FC = () => {

    const [version, setVersion] = useState<Version>();

    useEffect(() => {
        fetch("api/version")
        .then(res => res.json())
        .then(version => setVersion(version))
    }, []);

    return <div className="download">
        DOWNLOAD {version && version.version}
        <style jsx>{`
            .download {
                background: var(--accent);
                color: var(--background);
                padding: 10px 20px;
                border-radius: 50px;
                border: 3px solid rgba(255, 255, 255, 0.5);
            }
        `}
        </style>
    </div>;
}

export default DownloadButton;