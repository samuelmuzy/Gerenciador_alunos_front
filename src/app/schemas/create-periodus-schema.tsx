import { z } from "zod";

const etapaSchema = z.object({
  nota_maxima_etapa: z.number().min(1, "Mínimo 1").max(100, "Máximo 100"),
  id_periodo: z.string(),
  data_inicio: z.string().min(1, "Data início da etapa é obrigatória"),
  data_fim: z.string().min(1, "Data fim da etapa é obrigatória"),
});

export const createPeriodusRegularSchema = z
  .object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }).max(255),
    descricao: z.string().min(1, { message: "Descrição é obrigatória" }).max(500),
    data_inicio: z.string().min(1, "Data início é obrigatória"),
    data_fim: z.string().min(1, "Data fim é obrigatória"),
    quantidade_etapas: z.number().min(1, "Mínimo 1 etapa").max(20, "Máximo 20 etapas"),
    nota_corte: z.number().min(0, "Mínimo 0").max(100, "Máximo 100"),
    nota_maxima: z.number().min(0, "Mínimo 0").max(100, "Máximo 100").optional(),
    etapas: z.array(etapaSchema).optional(),
  })
  .superRefine((data, ctx) => {
    // Validação das etapas quando quantidade > 1
    if (data.quantidade_etapas > 1) {
      if (
        !Array.isArray(data.etapas) ||
        data.etapas.length !== data.quantidade_etapas
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Número de etapas não corresponde à quantidade informada.",
          path: ["etapas"],
        });
        return;
      }

      data.etapas.forEach((etapa, index) => {
        if (!etapa.data_inicio) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Data início é obrigatória",
            path: ["etapas", index, "data_inicio"],
          });
        }
        if (!etapa.data_fim) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Data fim é obrigatória",
            path: ["etapas", index, "data_fim"],
          });
        }
        if (!etapa.nota_maxima_etapa || etapa.nota_maxima_etapa <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Nota máxima é obrigatória",
            path: ["etapas", index, "nota_maxima_etapa"],
          });
        }
      });
    }

    // Validação da nota_maxima: obrigatória apenas quando quantidade_etapas === 1
    if (data.quantidade_etapas === 1 && (data.nota_maxima === undefined || data.nota_maxima === null)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nota máxima é obrigatória quando há apenas 1 etapa.",
        path: ["nota_maxima"],
      });
    }
  });

export type CreatePeriodusRegularSchema = z.infer<typeof createPeriodusRegularSchema>;