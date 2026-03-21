import supabase from "../db/supabase";
import { Request, Response } from "express";

export async function listarEventos(req: Request, res: Response) {
  try {
    const { data, error } = await supabase.from("eventos").select("*");

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar eventos",
      detalhe: (err as Error).message,
    });
  }
}

export async function criarEvento(req: Request, res: Response) {
  try {
    const { titulo, data, descricao } = req.body;

    if (!titulo || !data || !descricao) {
      return res.status(400).json({
        erro: "Título, data e descrição são obrigatórios",
      });
    }

    const { data: eventoCriado, error } = await supabase
      .from("eventos")
      .insert([{ titulo, data, descricao }])
      .select();

    if (error) throw error;

    return res.status(201).json(eventoCriado[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar evento",
      detalhe: (err as Error).message,
    });
  }
}

export async function buscarEvento(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        erro: "Evento não encontrado",
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao buscar evento",
      detalhe: (err as Error).message,
    });
  }
}

export async function deletarEvento(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("eventos").delete().eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      mensagem: "Evento deletado com sucesso",
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao deletar evento",
      detalhe: (err as Error).message,
    });
  }
}

export async function editarEvento(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { titulo, data, descricao } = req.body;

    if (!titulo && !data && !descricao) {
      return res.status(400).json({
        erro: "Pelo menos um campo (título, data ou descrição) deve ser fornecido para atualização",
      });
    }

    const camposParaAtualizar: Partial<{ titulo: string; data: string; descricao: string }> = {};
    if (titulo) camposParaAtualizar.titulo = titulo;
    if (data) camposParaAtualizar.data = data;
    if (descricao) camposParaAtualizar.descricao = descricao;

    const { data: eventoAtualizado, error } = await supabase
      .from("eventos")
      .update(camposParaAtualizar)
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!eventoAtualizado.length) {
      return res.status(404).json({
        erro: "Evento não encontrado",
      });
    }

    return res.status(200).json(eventoAtualizado[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao editar evento",
      detalhe: (err as Error).message,
    });
  }
}