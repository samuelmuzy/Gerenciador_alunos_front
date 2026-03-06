import { SignInFormSchema, signInFormSchema, } from "@/src/app/schemas/sing-in-schema";
import { ApiError } from "@/src/errors/api-error";
import { useAuth } from "@/src/hooks/useAuth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SingInFormStudentProps {
    onToggleUserType: (userType: 'professor' | 'student') => void;
    inviteToken: string | null
}

const SingInFormStudent: React.FC<SingInFormStudentProps> = ({ onToggleUserType, inviteToken }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormSchema>({
        resolver: zodResolver(signInFormSchema),
    });

    const [error, setError] = useState<string | null>(null);
    const { signInStudent } = useAuth();
    const router = useRouter();

    const onSubmit = async (payload: SignInFormSchema) => {
        setError(null);

        try {
            await signInStudent(payload);

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
                            placeholder="Senha"
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
                    >Logar</button>

                    {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
                </form>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => onToggleUserType('professor')}
                        className="text-blue-600 hover:underline mx-2"
                    >
                        Sou Professor
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/register-student')}
                        className="text-blue-600 hover:underline mx-2"
                    >
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SingInFormStudent;