'use client'
import { GraduationCap, Layers } from "lucide-react";
import { StudentCard } from "../components/StudentCard";
import { ReleasesSection } from "../components/ReleasesSection";
import { StepCard } from "../components/StepCard";
import CreateInviteLinkCard from "../components/CreateInviteLink";
import { useEffect, useState } from "react";
import { StepAndClass } from "@/src/types/Class-student";

export default function ClassClient({ id }: { id: string }) {
    

    const [stepes, setStepes] = useState<StepAndClass | null>(null);

    const [error, setError] = useState('')

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
    ];

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
    ];

    const handleGetStepes = async () => {
        setError('');
        try {
            const response = await fetch(`/api/student-class/get-stepes-by-class-id/${id}`);

            const result = await response.json();

            if (!response.ok) throw new Error(result.message);

            setStepes(result);
            console.log(result)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro ao criar período.');
        }
    }

    useEffect(() => {
        handleGetStepes();
    }, [])

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
                                {alunosMock.length}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 border border-purple-100">
                            <h3 className="text-sm text-gray-500">Etapas Ativas</h3>
                            <p className="text-3xl font-bold text-purple-700 mt-2">
                                {etapasMock.length}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Students Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-purple-700">
                        Lista de Alunos
                    </h2>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {alunosMock.map((aluno) => (
                            <StudentCard key={aluno.id} aluno={aluno} />
                        ))}
                    </div>
                </section>

                {/* Steps Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Layers className="text-purple-600" />
                        <h2 className="text-2xl font-semibold text-purple-700">
                            Etapas do Período Letivo
                        </h2>
                    </div>

                    <div className="grid gap-6">
                        {stepes?.periodo.etapas.map((etapa) => (
                            <StepCard key={etapa.id} etapas={etapa} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
