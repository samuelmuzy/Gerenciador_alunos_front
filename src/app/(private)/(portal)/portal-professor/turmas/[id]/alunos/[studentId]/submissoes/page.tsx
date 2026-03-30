import { StudentSubmissionsClient } from "../../../../components/features/student-submissions/StudentSubmissionsClient";



export default async function StudentSubmissionsPage({ params }: { params: Promise<{ id: string, studentId: string }>; }) {
    const { id, studentId } = await params;

    return (
        <StudentSubmissionsClient studentClassId={id} studentId={studentId}/>
    )
}