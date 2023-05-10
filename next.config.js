/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/download',
                destination: 'https://github.com/YARC-Official/YARG/releases/latest',
                permanent: true,
            },

            {
                source: '/download/latest',
                destination: 'https://github.com/YARC-Official/YARG/releases/latest',
                permanent: true,
            },

            {
                source: '/download/dev',
                destination: 'https://drive.google.com/drive/folders/1WAxRqtQ-EF1ryF99sH8GJSS8SjMJj06u?usp=share_link',
                permanent: true,
            },

        ];
    },
}

module.exports = nextConfig
