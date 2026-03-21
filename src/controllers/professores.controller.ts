import { Request, Response } from "express";
import supabase from "../db/supabase";
import { Professor } from "../types";
import { hashPassword } from "../utils/hash";

export const listarProfessores = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("professores").select("*");

    if (error) {
      return res.status(500).json({ erro: "Erro ao buscar professores", detalhe: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: "Erro interno", detalhe: (err as Error).message });
  }
};

export const criarProfessor = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
    }

    const hashedPassword = await hashPassword(senha);

    const { data, error } = await supabase
      .from("professores")
      .insert([{ nome, email, senha: hashedPassword }])
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ erro: "Erro ao criar professor", detalhe: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ erro: "Erro interno", detalhe: (err as Error).message });
  }
};

export const atualizarProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    if (!nome && !email && !senha ) {
      return res.status(400).json({
        erro: "Pelo menos um campo (nome, email, ra, senha ou turma) deve ser fornecido para atualização",
      });
    }
    
    const camposParaAtualizar: Partial<Professor> = {};
    if (nome) camposParaAtualizar.nome = nome;
    if (email) camposParaAtualizar.email = email;
    if (senha) camposParaAtualizar.senha = await hashPassword(senha);

    const { data, error } = await supabase
      .from("professores")
      .update(camposParaAtualizar)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ erro: "Erro ao atualizar professor", detalhe: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: "Erro interno", detalhe: (err as Error).message });
  }
};

export const deletarProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase.from("professores").delete().eq("id", id);

    if (error) {
      return res.status(500).json({ erro: "Erro ao deletar professor", detalhe: error.message });
    }

    return res.status(200).json({
      mensagem: "Professor deletado com sucesso",
    });
  } catch (err) {
    return res.status(500).json({ erro: "Erro interno", detalhe: (err as Error).message });
  }
};

export const buscarProfessorPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase.from("professores").select("*").eq("id", id).single();

    if (error || !data) {
      return res.status(404).json({ erro: "Professor não encontrado" });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: "Erro interno", detalhe: (err as Error).message });
  }
};