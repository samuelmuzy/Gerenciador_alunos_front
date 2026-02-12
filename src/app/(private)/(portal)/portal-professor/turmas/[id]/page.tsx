import { GraduationCap } from "lucide-react";
import { StudentCard } from "../components/StudentCard";
import { ReleasesSection } from "../components/ReleasesSection";


export default async function TurmaPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const alunosMock = [
        {
            id: 1,
            nome: "Ana Souza",
            email: "ana@email.com",
            idade: 20,
            nota: 8.5,
        },
        {
            id: 2,
            nome: "Carlos Lima",
            email: "carlos@email.com",
            idade: 22,
            nota: 7.8,
        },
    ]


    return (
        <div className="min-h-screen bg-linear-to-br from-white to-purple-50 p-10">
            <div className="max-w-6xl mx-auto space-y-10">
                <div className="flex items-center gap-3">
                    <GraduationCap className="text-purple-600" size={32} />
                    <h1 className="text-3xl font-bold text-purple-700">
                        Alunos da Turma
                    </h1>
                </div>


                <div className="grid md:grid-cols-2 gap-6">
                    {alunosMock.map((aluno) => (
                        <StudentCard key={aluno.id} aluno={aluno} />
                    ))}
                </div>


                <ReleasesSection />
            </div>
        </div>
    )
}
