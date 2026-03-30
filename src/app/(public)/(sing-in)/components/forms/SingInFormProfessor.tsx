'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signInFormSchema, SignInFormSchema } from '@/src/app/schemas/sing-in-schema';
import { useAuth } from '@/src/hooks/useAuth';
import { ApiError } from '@/src/errors/api-error';
import { GraduationCap } from 'lucide-react';


interface SingInFormProfessorProps {
    onToggleUserType: (userType: 'professor' | 'student') => void;
}

const SingInFormProfessor: React.FC<SingInFormProfessorProps> = ({ onToggleUserType }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormSchema>({
        resolver: zodResolver(signInFormSchema),
    });

    const [error, setError] = useState<string | null>(null);
    const { signInProfessor } = useAuth();
    const router = useRouter();

    const onSubmit = async (payload: SignInFormSchema) => {
        setError(null);

        try {
            await signInProfessor(payload);
            router.push('/portal-professor');

        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.message); // "Email já existe"
            } else {
                setError("Erro inesperado.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-violet-50 to-indigo-100 p-6">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-indigo-100/70">
                <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400" />

                <div className="p-8">
                    <div className="mb-6 flex flex-col items-center text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white shadow-sm">
                            <GraduationCap className="h-7 w-7 text-violet-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Portal do Professor</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">Acesse sua conta para gerenciar suas disciplinas e alunos.</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div>
                            <input
                                placeholder="Email"
                                type="email"
                                {...register("email")}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            {errors?.email && (
                                <div className="text-xs text-red-500">{errors?.email?.message}</div>
                            )}
                        </div>
                        <div>
                            <input
                                placeholder="Senha"
                                type="password"
                                {...register("senha")}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            {errors?.senha && (
                                <div className="text-xs text-red-500">
                                    {errors?.senha?.message}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >Logar</button>
                        {error && <div className="mt-4 text-center text-sm text-red-500">{error}</div>}
                    </form>
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={() => onToggleUserType('student')}
                            className="mx-2 text-sm font-medium text-violet-600 transition-colors hover:text-violet-700"
                        >
                            Sou Aluno
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingInFormProfessor;
