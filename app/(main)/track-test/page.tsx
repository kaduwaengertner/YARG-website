import NoSSR from "@/app/components/NoSSR";
import Track3D from "@/app/components/Track3D";

export default async function TrackTest() {

    return (<>
        <NoSSR>
            <Track3D />
        </NoSSR>
    </>)

}