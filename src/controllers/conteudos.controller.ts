import supabase from "../db/supabase";
import { Request, Response } from "express";

export async function listarConteudos(req: Request, res: Response) {
  try {
    const { data, error } = await supabase.from("conteudos").select("*");

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar conteúdos",
      detalhe: (err as Error).message,
    });
  }
}

export async function criarConteudo(req: Request, res: Response) {
  try {
    const { titulo, descricao, materia_id } = req.body;

    if (!titulo || !descricao || !materia_id) {
      return res.status(400).json({
        erro: "Título, descrição e matéria são obrigatórios",
      });
    }

    const { data, error } = await supabase
      .from("conteudos")
      .insert([{ titulo, descricao, materia_id }])
      .select();

    if (error) throw error;

    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar conteúdo",
      detalhe: (err as Error).message,
    });
  }
}

export async function buscarConteudo(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("conteudos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        erro: "Conteúdo não encontrado",
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao buscar conteúdo",
      detalhe: (err as Error).message,
    });
  }
}

export async function deletarConteudo(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("conteudos").delete().eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      mensagem: "Conteúdo deletado com sucesso",
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao deletar conteúdo",
      detalhe: (err as Error).message,
    });
  }
}

export async function editarConteudo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { titulo, descricao, materia_id } = req.body;

    if (!titulo && !descricao && !materia_id) {
      return res.status(400).json({
        erro: "Pelo menos um campo (título, descrição ou matéria) deve ser fornecido para atualização",
      });
    }

    const camposParaAtualizar: Partial<{ titulo: string; descricao: string; materia_id: number }> = {};
    if (titulo) camposParaAtualizar.titulo = titulo;
    if (descricao) camposParaAtualizar.descricao = descricao;
    if (materia_id) camposParaAtualizar.materia_id = materia_id;

    const { data, error } = await supabase
      .from("conteudos")
      .update(camposParaAtualizar)
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data.length) {
      return res.status(404).json({
        erro: "Conteúdo não encontrado",
      });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao editar conteúdo",
      detalhe: (err as Error).message,
    });
  }
}