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
                destination: 'https://github.com/YARC-Official/YARG-BleedingEdge/releases/latest',
                permanent: true,
            },

        ];
    },
}

module.exports = nextConfig
