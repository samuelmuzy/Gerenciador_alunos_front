import { z } from "zod";

export const createContentSchema = z
    .object({
        nome: z.string().min(1, { message: "Nome é obrigatório" }).max(255),
        descricao: z.string().min(1, { message: "Nome é obrigatório" }).max(255),
        file: z
            .instanceof(File, { message: "Arquivo é obrigatório" })
            .refine((file) => file.size > 0, "Arquivo inválido")
            .refine(
                (file) => file.size <= 5 * 1024 * 1024,
                "Arquivo deve ter no máximo 5MB"
            )
            .refine(
                (file) =>
                    ["application/pdf", "image/png", "image/jpeg"].includes(file.type),
                "Formato inválido. Apenas PDF, PNG ou JPG"
            ),
    })
export type CreateContentFormSchema  = z.infer<typeof createContentSchema>;