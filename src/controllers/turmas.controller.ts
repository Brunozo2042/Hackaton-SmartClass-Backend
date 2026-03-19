import supabase from "../db/supabase.js";
import { Request, Response } from "express";
import { Turma } from "../interfaces/index.js";

// GET /turmas
export async function listarTurmas(req: Request, res: Response) {
  try {
    const { data, error } = await supabase.from("turmas").select("*");

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar turmas",
      detalhe: (err as Error).message,
    });
  }
}

// POST /turmas
export async function criarTurma(req: Request, res: Response) {
  try {
    const { nome, ano_letivo } = req.body;

    if (!nome || !ano_letivo) {
      return res.status(400).json({
        erro: "O nome e o ano letivo da turma são obrigatórios",
      });
    }

    const { data, error } = await supabase
      .from("turmas")
      .insert([{ nome, ano_letivo }])
      .select();

    if (error) throw error;

    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar turma",
      detalhe: (err as Error).message,
    });
  }
}

// GET /turmas/:id
export async function buscarTurma(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("turmas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        erro: "Turma não encontrada",
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao buscar turma",
      detalhe: (err as Error).message,
    });
  }
}

// PUT /turmas/:id
export async function editarTurma(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, ano_letivo } = req.body;

    if (!nome && !ano_letivo) {
      return res.status(400).json({
        erro: "Pelo menos um campo (nome ou ano letivo) deve ser fornecido para atualização",
      });
    }

    const camposParaAtualizar: Partial<Turma> = {};
    if (nome) camposParaAtualizar.nome = nome;
    if (ano_letivo) camposParaAtualizar.ano_letivo = ano_letivo;

    const { data, error } = await supabase
      .from("turmas")
      .update(camposParaAtualizar)
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data.length) {
      return res.status(404).json({
        erro: "Turma não encontrada",
      });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao editar turma",
      detalhe: (err as Error).message,
    });
  }
}

// DELETE /turmas/:id
export async function deletarTurma(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("turmas").delete().eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      mensagem: "Turma deletada com sucesso",
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao deletar turma",
      detalhe: (err as Error).message,
    });
  }
}
