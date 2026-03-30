import { SignInFormSchema, signInFormSchema, } from "@/src/app/schemas/sing-in-schema";
import { ApiError } from "@/src/errors/api-error";
import { useAuth } from "@/src/hooks/useAuth";

import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap } from "lucide-react";
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-violet-50 to-indigo-100 p-6">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-indigo-100/70">
                <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400" />
                <div className="p-8">
                    <div className="mb-6 flex flex-col items-center text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white shadow-sm">
                            <GraduationCap className="h-7 w-7 text-violet-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Portal do Aluno</h2>
                <p className="text-center text-gray-600 mb-6">Acesse sua conta para visualizar suas notas e informações.</p>
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
                            <div className="text-red-500 text-xs">{errors?.email?.message}</div>
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
                            <div className="text-red-500 text-xs">
                                {errors?.senha?.message}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >Logar</button>

                    {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
                </form>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => onToggleUserType('professor')}
                        className="mx-2 text-sm font-medium text-violet-600 transition-colors hover:text-violet-700"
                    >
                        Sou Professor
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/register-student')}
                        className="mx-2 text-sm font-medium text-violet-600 transition-colors hover:text-violet-700"
                    >
                        Registrar
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
export default SingInFormStudent;
