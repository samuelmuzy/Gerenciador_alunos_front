import { z } from "zod";

const etapaSchema = z.object({

  nota_maxima_etapa: z.number().min(1, "Mínimo 1 etapa").max(5),
  id_periodo: z.string(),
  data_inicio: z.string().min(1, "Data início da etapa é obrigatória"),
  data_fim: z.string().min(1, "Data fim da etapa é obrigatória"),
});

export const createPeriodusRegularSchema = z
  .object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }).max(255),
    descricao: z.string().min(1, { message: "Descrição é obrigatória" }).max(500),
    data_inicio: z.string(),
    data_fim: z.string(),
    quantidade_etapas: z.number().min(1, "Mínimo 1 etapa").max(5),
    nota_corte: z.number().min(0, "Mínimo 0").max(100),
    etapas: z.array(etapaSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.quantidade_etapas <= 1) return true;
      return (
        Array.isArray(data.etapas) &&
        data.etapas.length === data.quantidade_etapas &&
        data.etapas.every((e) => e.data_inicio && e.data_fim)
      );
    },
    { message: "Preencha as datas de início e fim de cada etapa.", path: ["etapas"] }
  );

export type CreatePeriodusRegularSchema = z.infer<typeof createPeriodusRegularSchema>;