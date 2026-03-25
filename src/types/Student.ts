export type ClassAndStudent = {
  id: string;
  nome: string;
  id_periodo: string;
  alunosTurmas: {
    aluno: {
      id: string;
      matricula: string;
      usuario: {
        nome: string;
        email: string;
      };
    };
  }[];
};