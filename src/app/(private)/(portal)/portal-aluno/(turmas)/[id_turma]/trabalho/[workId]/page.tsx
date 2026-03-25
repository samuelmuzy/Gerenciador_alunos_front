import { WorkDetail } from "../../../components/features/work/WorkDetail";



export default async function WorkPage({
    params,
}: {
    params: Promise<{ workId: string }>
}) {
    const { workId } = await params;

    console.log(workId);
    

    return (
        <WorkDetail workId={workId} />
    )
}