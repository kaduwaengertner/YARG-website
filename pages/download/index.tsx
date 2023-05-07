export default function DownloadPage() {
    return <></>
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "https://github.com/EliteAsian123/YARG/releases/latest",
            permanent: true
        }
    }
};