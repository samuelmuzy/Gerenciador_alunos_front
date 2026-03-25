export type SubmissaoStatus = "pendente" | "enviado" | "aprovado" | "reprovado"

export type Submissao = {
  id: string
  url_documento: string
  public_id: string
  criado_em: Date
  status: SubmissaoStatus
}

export type TrabalhoDetail = {
  id: string
  nome: string
  valor: number
  descricao?: string
  data_entrega?: Date
  data_fim: Date,
  data_inicio: Date
  id_etapa: string
  etapa: {
    nome: string
    data_fim: Date
  }
  ja_submeteu?: boolean
  mensagem_submissao?: string
  submissao?: Submissao | null // current user's submission if any
}