export default function DownloadPage() {
    return <></>
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "https://drive.google.com/drive/folders/1WAxRqtQ-EF1ryF99sH8GJSS8SjMJj06u?usp=share_link",
            permanent: true
        }
    }
};