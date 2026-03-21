import supabase from "../db/supabase";
import { Request, Response } from "express";
import { Aluno } from "../types/index";
import { hashPassword } from "../utils/hash";

// GET /alunos
export async function listarAlunos(req: Request, res: Response) {
  try {
    const { data, error } = await supabase.from("alunos").select("*");

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar alunos",
      detalhe: (err as Error).message,
    });
  }
}

// POST /alunos
export async function criarAluno(req: Request, res: Response) {
  try {
    const { nome, email, ra, senha, turma_id } = req.body;

    if (!nome || !email || !ra || !senha || !turma_id) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios",
      });
    }

    const hashedPassword = await hashPassword(senha);

    const { data, error } = await supabase
      .from("alunos")
      .insert([{ nome, email, ra, senha: hashedPassword, turma_id }])
      .select();

    if (error) throw error;

    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar aluno",
      detalhe: (err as Error).message,
    });
  }
}

// GET /alunos/:id
export async function buscarAluno(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("alunos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        erro: "Aluno não encontrado",
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao buscar aluno",
      detalhe: (err as Error).message,
    });
  }
}

// DELETE /alunos/:id
export async function deletarAluno(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("alunos").delete().eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      mensagem: "Aluno deletado com sucesso",
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao deletar aluno",
      detalhe: (err as Error).message,
    });
  }
}

// PUT /alunos/:id
export async function editarAluno(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, email, ra, senha, turma_id } = req.body;

    if (!nome && !email && !ra && !senha && !turma_id) {
      return res.status(400).json({
        erro: "Pelo menos um campo (nome, email, ra, senha ou turma) deve ser fornecido para atualização",
      });
    }

    const camposParaAtualizar: Partial<Aluno> = {};
    if (nome) camposParaAtualizar.nome = nome;
    if (email) camposParaAtualizar.email = email;
    if (ra) camposParaAtualizar.ra = ra;
    if (senha) camposParaAtualizar.senha = await hashPassword(senha);
    if (turma_id) camposParaAtualizar.turma_id = turma_id;

    const { data, error } = await supabase
      .from("alunos")
      .update(camposParaAtualizar)
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data.length) {
      return res.status(404).json({
        erro: "Aluno não encontrado",
      });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao editar aluno",
      detalhe: (err as Error).message,
    });
  }
}
