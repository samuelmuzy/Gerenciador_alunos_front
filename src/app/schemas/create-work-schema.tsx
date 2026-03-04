import { z } from "zod";

export const workSchema = z
  .object({
    description: z
      .string()
      .min(1, { message: "A descrição é obrigatória" }),
    value: z
      .string()
      .min(1, { message: "O valor é obrigatório" })
      .refine((val) => parseFloat(val) > 0, {
        message: "O valor deve ser maior que zero",
      }),
    startDate: z
      .string()
      .min(1, { message: "A data de início é obrigatória" }),
    endDate: z
      .string()
      .min(1, { message: "A data de término é obrigatória" }),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      data.startDate <= data.endDate,
    {
      path: ["endDate"],
      message:
        "A data de término deve ser posterior à data de início",
    }
  );

export type WorkFormSchema = z.infer<typeof workSchema>;