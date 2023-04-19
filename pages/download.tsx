export default function DownloadPage() {
    return <></>
}

export async function getStaticProps() {
    return {
        redirect: {
            destination: "https://github.com/EliteAsian123/YARG/releases/latest",
            permanent: true
        }
    }
};