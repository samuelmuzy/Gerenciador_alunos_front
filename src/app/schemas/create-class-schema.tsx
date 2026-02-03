import {z} from "zod";

export const createClassSchema = z
  .object({
    nome: z.string().min(1, {message: "Nome é obrigatório"}).max(255),
    id_periodo: z.string().min(1, {message: "Período é obrigatório"}),
  })
export type CreateClassSchema = z.infer<typeof createClassSchema>;