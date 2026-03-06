import StudentClassClient from "../components/StudentClassClient";

export default async function TurmaPage({
    params,
}: {
    params: Promise<{ id_turma: string }>
}) {
    const { id_turma } = await params;

    return (
        <StudentClassClient id_turma={id_turma} />
    )
}