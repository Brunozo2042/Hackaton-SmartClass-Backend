import { Request, Response } from 'express';
import supabase from '../db/supabase';
import { Professor } from '../types';
import { hashPassword } from '../utils/hash';

export const listarProfessores = async (req: Request, res: Response) => {
  try {
    // Buscar todos os professores
    const { data: professores, error: errorProfessores } = await supabase
      .from('professores')
      .select('*');

    if (errorProfessores) {
      return res
        .status(500)
        .json({ erro: 'Erro ao buscar professores', detalhe: errorProfessores.message });
    }

    // Buscar todas as relações entre professores e matérias
    const { data: professorMaterias, error: errorProfessorMaterias } = await supabase
      .from('professor_materias')
      .select('*');

    if (errorProfessorMaterias) {
      return res.status(500).json({
        erro: 'Erro ao buscar relações professor-materias',
        detalhe: errorProfessorMaterias.message,
      });
    }

    // Buscar todas as matérias
    const { data: materias, error: errorMaterias } = await supabase.from('materias').select('*');

    if (errorMaterias) {
      return res
        .status(500)
        .json({ erro: 'Erro ao buscar matérias', detalhe: errorMaterias.message });
    }

    // Mapear os professores com suas respectivas matérias
    const resultado = professores.map((professor) => {
      const materiasDoProfessor = professorMaterias
        .filter((pm) => pm.professor_id === professor.id)
        .map((pm) => materias.find((materia) => materia.id === pm.materia_id));

      return {
        ...professor,
        materias: materiasDoProfessor,
      };
    });

    return res.status(200).json(resultado);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhe: (err as Error).message });
  }
};

export const criarProfessor = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, materias } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
    }

    const hashedPassword = await hashPassword(senha);

    // Criar o professor
    const { data: professor, error: errorProfessor } = await supabase
      .from('professores')
      .insert([{ nome, email, senha: hashedPassword }])
      .select('*')
      .single();

    if (errorProfessor) {
      return res
        .status(500)
        .json({ erro: 'Erro ao criar professor', detalhe: errorProfessor.message });
    }

    let materiasAssociadas = [];

    // Associar matérias ao professor, se fornecidas
    if (materias && Array.isArray(materias)) {
      const professorMaterias = materias.map((materiaId: number) => ({
        professor_id: professor.id,
        materia_id: materiaId,
      }));

      const { error: errorMaterias } = await supabase
        .from('professor_materias')
        .insert(professorMaterias);

      if (errorMaterias) {
        return res.status(500).json({
          erro: 'Erro ao associar matérias ao professor',
          detalhe: errorMaterias.message,
        });
      }

      // Buscar os detalhes das matérias associadas
      const { data: materiasDetalhes, error: errorMateriasDetalhes } = await supabase
        .from('materias')
        .select('*')
        .in('id', materias);

      if (errorMateriasDetalhes) {
        return res.status(500).json({
          erro: 'Erro ao buscar detalhes das matérias associadas',
          detalhe: errorMateriasDetalhes.message,
        });
      }

      materiasAssociadas = materiasDetalhes || [];
    }

    return res.status(201).json({
      ...professor,
      materias: materiasAssociadas,
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhe: (err as Error).message });
  }
};

export const atualizarProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, materias } = req.body;

    if (!nome && !email && !senha && !materias) {
      return res.status(400).json({
        erro: 'Pelo menos um campo (nome, email, senha ou matérias) deve ser fornecido para atualização',
      });
    }

    const camposParaAtualizar: Partial<Professor> = {};
    if (nome) camposParaAtualizar.nome = nome;
    if (email) camposParaAtualizar.email = email;
    if (senha) camposParaAtualizar.senha = await hashPassword(senha);

    // Atualizar os dados do professor
    const { data: professor, error: errorProfessor } = await supabase
      .from('professores')
      .update(camposParaAtualizar)
      .eq('id', id)
      .select('*')
      .single();

    if (errorProfessor) {
      return res
        .status(500)
        .json({ erro: 'Erro ao atualizar professor', detalhe: errorProfessor.message });
    }

    // Atualizar as matérias associadas ao professor, se fornecidas
    if (materias && Array.isArray(materias)) {
      // Remover associações antigas
      const { error: errorDelete } = await supabase
        .from('professor_materias')
        .delete()
        .eq('professor_id', id);

      if (errorDelete) {
        return res.status(500).json({
          erro: 'Erro ao remover matérias antigas do professor',
          detalhe: errorDelete.message,
        });
      }

      // Adicionar novas associações
      const novasAssociacoes = materias.map((materiaId: number) => ({
        professor_id: id,
        materia_id: materiaId,
      }));

      const { error: errorInsert } = await supabase
        .from('professor_materias')
        .insert(novasAssociacoes);

      if (errorInsert) {
        return res.status(500).json({
          erro: 'Erro ao associar novas matérias ao professor',
          detalhe: errorInsert.message,
        });
      }
    }

    return res.status(200).json(professor);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhe: (err as Error).message });
  }
};

export const deletarProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase.from('professores').delete().eq('id', id);

    if (error) {
      return res.status(500).json({ erro: 'Erro ao deletar professor', detalhe: error.message });
    }

    return res.status(200).json({
      mensagem: 'Professor deletado com sucesso',
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhe: (err as Error).message });
  }
};

export const buscarProfessorPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar o professor pelo ID
    const { data: professor, error: errorProfessor } = await supabase
      .from('professores')
      .select('*')
      .eq('id', id)
      .single();

    if (errorProfessor || !professor) {
      return res.status(404).json({ erro: 'Professor não encontrado' });
    }

    // Buscar as matérias associadas ao professor
    const { data: professorMaterias, error: errorProfessorMaterias } = await supabase
      .from('professor_materias')
      .select('materia_id')
      .eq('professor_id', id);

    if (errorProfessorMaterias) {
      return res.status(500).json({
        erro: 'Erro ao buscar matérias do professor',
        detalhe: errorProfessorMaterias.message,
      });
    }

    // Buscar os detalhes das matérias
    const materiaIds = professorMaterias?.map((pm) => pm.materia_id) || [];
    const { data: materias, error: errorMaterias } = await supabase
      .from('materias')
      .select('*')
      .in('id', materiaIds);

    if (errorMaterias) {
      return res
        .status(500)
        .json({ erro: 'Erro ao buscar detalhes das matérias', detalhe: errorMaterias.message });
    }

    // Retornar o professor com as matérias associadas
    return res.status(200).json({
      ...professor,
      materias,
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhe: (err as Error).message });
  }
};
