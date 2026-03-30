'use client'
import { GraduationCap, Layers } from "lucide-react";
import { StudentCard } from "../../ui/StudentCard";


import CreateInviteLinkCard from "./CreateInviteLink";
import { useEffect, useState } from "react";
import { StepAndClass, StepAndContent } from "@/src/types/Class-student";
import { ClassAndStudent } from "@/src/types/Student";
import { EmptyStateCard } from "@/src/components/ui/EmptyStateCard";
import { handleResponse } from "@/src/services/handle-response";
import { ApiError } from "@/src/errors/api-error";
import { StepCard } from "./StepCard";

export default function ClassClient({ id }: { id: string }) {


    const [stepes, setStepes] = useState<StepAndClass[] | null>(null);

    const [students, setStudents] = useState<ClassAndStudent | null>(null)

    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            setError('');

            const [stepsRes, studentsRes] = await Promise.all([
                fetch(`/api/student-class/get-stepes-by-class-id/${id}`),
                fetch(`/api/student-class/get-all-student-by-class-id/${id}`)
            ]);

            const stepsData = await handleResponse<StepAndClass[]>(stepsRes);
            const studentsData = await handleResponse<ClassAndStudent>(studentsRes);


            console.log(studentsData)
            console.log(stepsData)

            setStepes(stepsData);
            setStudents(studentsData);



        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.message);
            } else {
                setError("Erro inesperado.");
            }
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-linear-to-br from-white via-purple-50 to-purple-100 p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-2xl">
                            <GraduationCap className="text-purple-600" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-purple-700">
                                Alunos da Turma
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Gerencie alunos, etapas e convites da sua turma
                            </p>
                        </div>
                    </div>
                </div>

                {/* Top Section - Invite + Summary */}
                <section className="grid lg:grid-cols-3 gap-6 items-start">
                    {/* Invite Card */}
                    <div className="lg:col-span-1">
                        <CreateInviteLinkCard idClass={id} />
                    </div>

                    {/* Quick Stats */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-purple-100">
                            <h3 className="text-sm text-gray-500">Total de Alunos</h3>
                            <p className="text-3xl font-bold text-purple-700 mt-2">
                                {students?.alunosTurmas?.length ?? 0}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 border border-purple-100">
                            <h3 className="text-sm text-gray-500">Etapas Ativas</h3>
                            <p className="text-3xl font-bold text-purple-700 mt-2">
                                {stepes?.length}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Students Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-purple-700">
                        Lista de Alunos
                    </h2>

                    {(students?.alunosTurmas?.length ?? 0) === 0 ? (
                        <EmptyStateCard
                            title="Nenhum aluno cadastrado"
                            description="Ainda não há alunos nesta turma. Gere um link de convite para que eles possam entrar."
                        />
                    ) : (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {students?.alunosTurmas?.map(({ aluno }) => (
                                <StudentCard href={`${id}/alunos/${aluno.id}/submissoes`} key={aluno.id} aluno={aluno} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Steps Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Layers className="text-purple-600" />
                        <h2 className="text-2xl font-semibold text-purple-700">
                            Etapas do Período Letivo
                        </h2>
                    </div>

                    {stepes?.length === 0 ? (
                        <EmptyStateCard
                            title="Nenhuma etapa criada"
                            description="Você ainda não criou etapas para este período letivo. Crie uma etapa para organizar conteúdos e trabalhos."
                        />
                    ) : (
                        <div className="grid gap-6">
                            {stepes?.map((etapa) => (
                                <StepCard key={etapa.id} step={etapa} setSteps={setStepes}   />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
