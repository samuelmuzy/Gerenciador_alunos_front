import { GraduationCap, Layers } from "lucide-react";
import { StudentCard } from "../components/StudentCard";
import { ReleasesSection } from "../components/ReleasesSection";
import { StepCard } from "../components/StepCard";


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

    const etapasMock = [
        {
          id: 1,
          nome: "1ª Etapa",
          periodo: "Fevereiro - Abril",
          conteudos: ["Introdução à disciplina", "Fundamentos teóricos"],
          trabalhos: ["Trabalho 1", "Lista de Exercícios"],
        },
        {
          id: 2,
          nome: "2ª Etapa",
          periodo: "Maio - Julho",
          conteudos: ["Projeto prático", "Revisão geral"],
          trabalhos: ["Projeto Final"],
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

                {/* Etapas do Período Letivo */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Layers className="text-purple-600" />
                        <h2 className="text-2xl font-semibold text-purple-700">
                            Etapas do Período Letivo
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-1 gap-6">
                        {etapasMock.map((etapa) => (
                            <StepCard key={etapa.id} etapa={etapa} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
