export interface Aluno {
  id?: number;
  nome: string;
  email: string;
  ra: string;
  senha: string;
  turma_id: number;
}
export interface Turma {
  id?: number;
  nome: string;
  ano_letivo?: number;
}
export interface Professor {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}
export interface Materia {
  id?: number;
  nome: string;
}
export interface Conteudo {
  id?: number;
  materia_id: number;
  professor_id: number;
  conteudo: string;
}
export interface Evento {
  id?: number;
  titulo: string;
  descricao: string;
  data: string;
}
