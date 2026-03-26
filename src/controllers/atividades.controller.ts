import supabase from "../db/supabase";
import { Request, Response } from "express";
import { Atividade, tipoAtividade } from "../types/index";
 
// GET /atividades
export async function listarAtividades(req: Request, res: Response) {
  try {
    const { data, error } = await supabase.from("atividades").select("*");

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar atividades",
      detalhe: (err as Error).message,
    });
  }
}

// POST /atividades
export async function criarAtividade(req: Request, res: Response) {
 
  try {
    const { materia_id, professor_id, tipo, titulo, descricao } = req.body;

    if (!materia_id || !professor_id || !tipo || !titulo || !descricao) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios",
      });
    }

    const tiposValidos = Object.values(tipoAtividade).filter(v => typeof v === 'string');
    if(!tiposValidos.includes(tipo)){
      return res.status(400).json({
        erro: `A atividade precisa ser uma das opções: ${tiposValidos}`,
      });
    }

    const { data, error } = await supabase
      .from("atividades")
      .insert([{ materia_id, professor_id, tipo, titulo, descricao }])
      .select();

    if (error) throw error;

    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar atividade",
      detalhe: (err as Error).message,
    });
  }
}

// GET /atividades/:id
export async function buscarAtividade(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("atividades")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        erro: "Atividade não encontrado",
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao buscar atividade",
      detalhe: (err as Error).message,
    });
  }
}

// DELETE /atividades/:id
export async function deletarAtividade(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("atividades").delete().eq("id", id);

    if (error) throw error;

    return res.status(200).json({
      mensagem: "Atividade deletado com sucesso",
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao deletar atividade",
      detalhe: (err as Error).message,
    });
  }
}

// PUT /atividades/:id
export async function editarAtividades(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { materia_id, professor_id, tipo, titulo, descricao } = req.body;

    if (!materia_id && !professor_id && !tipo && !titulo && !descricao) {
      return res.status(400).json({
        erro: "Pelo menos um campo (materia_id, professor_id, tipo, titulo, descricao) deve ser fornecido para atualização",
      });
    }
    
    const tiposValidos = Object.values(tipoAtividade).filter(v => typeof v === 'string');
    if(!tiposValidos.includes(tipo)){
      return res.status(400).json({
        erro: `A atividade precisa ser uma das opções: ${tiposValidos}`,
      });
    }
    
    const camposParaAtualizar: Partial<Atividade> = {};
    if (materia_id) camposParaAtualizar.materia_id = materia_id;
    if (professor_id) camposParaAtualizar.professor_id = professor_id;
    if (tipo) camposParaAtualizar.tipo = tipo;
    if (titulo) camposParaAtualizar.titulo = titulo;
    if (descricao) camposParaAtualizar.descricao = descricao;

    const { data, error } = await supabase
      .from("atividades")
      .update(camposParaAtualizar)
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data.length) {
      return res.status(404).json({
        erro: "Atividade não encontrado",
      });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao editar atividade",
      detalhe: (err as Error).message,
    });
  }
}
