import { Periodus } from "./Periodus"

export type ClassStudent = {
  id: string
  nome: string
  id_periodo: string
  periodo?: Periodus
}

export type StepAndClass = {
  id_periodo: string;
  id: string;
  nome: string;

  periodo: {
    id: string;
    nome: string;
    descricao: string;
    nota_corte: number;
    id_periodo_regular: string | null;

    etapas: {
      id: string;
      data_inicio: Date;
      data_fim: Date;
      nota_maxima_etapa: number;
      id_periodo: string;
      provas: {
        id: string;
        nome: string;
        valor: number;
        id_etapa: string;
      }[]
      trabalhos: {
        id: string;
        nome: string;
        valor: number;
        id_etapa: string;
      }[]
    }[];
  };
}

export type StepAndContent = {
  etapas: {
    id: string;
    data_inicio: Date;
    data_fim: Date;
    nota_maxima_etapa: number;
    id_periodo: string;
    provas: {
      id: string;
      nome: string;
      valor: number;
      id_etapa: string;
    }[]
    trabalhos: {
      id: string;
      nome: string;
      valor: number;
      id_etapa: string;
    }[]
  };
}