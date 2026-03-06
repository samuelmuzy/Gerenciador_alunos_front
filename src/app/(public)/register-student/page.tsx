'use client'
import { useForm } from "react-hook-form";
import { signUpFormSchema, SignUpFormSchema } from "../../schemas/sing-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleResponse } from "@/src/services/handle-response";
import { ApiError } from "@/src/errors/api-error";

const RegisterStudent = () => {

    const searchParams = useSearchParams();

    const inviteToken = searchParams.get('invite');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpFormSchema),
    });

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (payload: SignUpFormSchema) => {
        setError(null);

        try {
            const response = await fetch('/api/auth/sing-up-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await handleResponse(response);


            if (inviteToken) {
                router.replace(`/invite/${inviteToken}/accept`)
                return
            }

            router.push('/portal-aluno');

        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.message); // "Email já existe"
            } else {
                setError("Erro inesperado.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 rounded-lg shadow-md bg-white w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-gray-600">Portal do Aluno</h2>
                <p className="text-center text-gray-600 mb-6">Acesse sua conta para visualizar suas notas e informações.</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    <div>
                        <input
                            placeholder="nome"
                            type="text"
                            {...register("nome")}
                            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.nome && (
                            <div className="text-red-500 text-xs">
                                {errors?.nome?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            placeholder="Email"
                            type="email"
                            {...register("email")}
                            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.email && (
                            <div className="text-red-500 text-xs">{errors?.email?.message}</div>
                        )}
                    </div>
                    <div>
                        <input
                            placeholder="senha"
                            type="password"
                            {...register("senha")}
                            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.senha && (
                            <div className="text-red-500 text-xs">
                                {errors?.senha?.message}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >Cadastro</button>

                    {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
                </form>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="text-blue-600 hover:underline mx-2"
                    >
                        Já tenho uma conta
                    </button>
                </div>
            </div>
        </div>
    );
}
export default RegisterStudent;