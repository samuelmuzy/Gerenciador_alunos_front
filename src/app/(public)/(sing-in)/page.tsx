'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import {useForm} from "react-hook-form";
import { signUpFormSchema, SignUpFormSchema } from '../../_schemas/sing-in-schema';
import { zodResolver } from '@hookform/resolvers/zod';

const SingIn = () => {

    const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<SignUpFormSchema>({
		resolver: zodResolver(signUpFormSchema),
	});
    
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (payload: SignUpFormSchema) => {
        setError(null);

        try {
            // Fazendo a requisição POST para o seu Route Handler
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                // Login bem-sucedido
                console.log('Login successful:', data);
                // Redireciona para uma página protegida, por exemplo
                router.push('/dashboard');
            } else {
                // Login falhou
                setError(data.message || 'Login failed');
                console.error('Login failed:', data);
            }
        } catch (err) {
            console.error('Network or server error:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-96 mx-auto mt-10"
        >
            <div>
                <input placeholder="Email" type="email" {...register("email")} />
                {errors?.email && (
                    <div className="text-red-500 text-xs">{errors?.email?.message}</div>
                )}
            </div>
            <div>
                <input placeholder="Senha" type="password" {...register("password")} />
                {errors?.password && (
                    <div className="text-red-500 text-xs">
                        {errors?.password?.message}
                    </div>
                )}
            </div>
            <button>Logar</button>
        </form>
    )
}

export default SingIn;