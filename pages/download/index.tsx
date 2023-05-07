export default function DownloadPage() {
    return <></>
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "https://github.com/YARC-Official/YARG/releases/latest",
            permanent: true
        }
    }
};