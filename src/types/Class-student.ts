import { Periodus } from "./Periodus"

export type ClassStudent = {
  id: string
  nome: string
  id_periodo: string
  periodo?: Periodus
}

export type StepAndClass = {
  id: string;
  nome: string;
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
  conteudos: {
    id: string;
    nome: string;
    descricao: string;
    url_documento:string
    data_liberacao: Date;
    public_id:string;
    id_etapa: string;
  }[]

}

export type StepAndContent = {
  step: {
    id: string;
    nome: string;
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
    conteudos: {
      id: string;
      nome: string;
      descricao: string;
      url_documento:string
      public_id:string;
      data_liberacao: Date;
      id_etapa: string;
    }[]

  }
}