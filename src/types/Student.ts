export type ClassAndStudent = {
    id: string;
    nome: string;
    id_periodo: string;
    alunos: {
      id: string
      matricula: string
      usuario: {
        nome: string;
        email: string
      }
    }[]
  }