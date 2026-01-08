import {z} from "zod";

export const signUpFormSchema = z
  .object({
    email: z.email({message: "Email inválido"}).max(255),
    senha: z
      .string()
      .min(5, {message: "Senha deve ter pelo menos 8 caracteres"})
      .max(255),
    
  })
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;