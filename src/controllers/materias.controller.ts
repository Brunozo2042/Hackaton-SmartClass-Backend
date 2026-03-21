import supabase from "../db/supabase";
import { Request, Response } from "express";

export async function listarMaterias(req: Request, res: Response) {
  try {
    const { data, error } = await supabase.from("materias").select("*");

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar matérias",
      detalhe: (err as Error).message,
    });
  }
}

export async function criarMateria(req: Request, res: Response) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        erro: "Nome é obrigatório",
      });
    }

    const { data, error } = await supabase
      .from("materias")
      .insert([{ nome }])
      .select();

    if (error) throw error;

    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar matéria",
      detalhe: (err as Error).message,
    });
  }
}

export async function buscarMateria(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("materias")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        erro: "Matéria não encontrada",
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao buscar matéria",
      detalhe: (err as Error).message,
    });
  }
}

export async function deletarMateria(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("materias").delete().eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      mensagem: "Matéria deletada com sucesso",
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao deletar matéria",
      detalhe: (err as Error).message,
    });
  }
}

export async function editarMateria(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        erro: "Nome é obrigatório",
      });
    }

    const camposParaAtualizar: Partial<{ nome: string;}> = {};
    if (nome) camposParaAtualizar.nome = nome;

    const { data, error } = await supabase
      .from("materias")
      .update(camposParaAtualizar)
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data.length) {
      return res.status(404).json({
        erro: "Matéria não encontrada",
      });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao editar matéria",
      detalhe: (err as Error).message,
    });
  }
}