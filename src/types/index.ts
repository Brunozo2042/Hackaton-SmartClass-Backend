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

export enum tipoAtividade{
  "Prova",
  "Trabalho"
}

export interface Atividade {
  id?: number;
  materia_id: number;
  professor_id: number;
  tipo: tipoAtividade;
  titulo: string;
  descricao: string;
}

export interface Resposta {
  id?: number;
  questao_id: number;
  aluno_id: number;
  alternativa_id?: number;
  dissertativa_id?: number;
  resposta_dissertativa?: string;
  pontuacao: number;
}

export enum tipoQuestao{
  "Dissertativa",
  "Alternativa"
}

export interface Alternativa {
  texto: string;
  correta: boolean;
}

export interface Dissertativa {
  texto: string;
  correta: string;
}
export interface Questoes{
  atividade_id: number;
  tipo: tipoQuestao;
  enunciado: string;
  valor: number;
  pontuacao: number;
  itens: Alternativa[]|Dissertativa[];
}