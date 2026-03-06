export type Conteudo = {
  id: string
  nome: string
  descricao: string
  url_documento: string
  public_id: string
  data_liberacao: Date
}

export type Trabalho = {
  id: string
  nome: string
  valor: number
}

export type Etapa = {
  id: string
  nome: string
  data_inicio: Date
  data_fim: Date
  nota_maxima_etapa: number
  trabalhos: Trabalho[]
  conteudos: Conteudo[]
}

export type ClassDetailData = {

  id: string
  nome: string
  periodo: {
    nome: string
    etapas: Etapa[]
  }
}