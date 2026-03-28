import supabase from "../db/supabase";
import { Request, Response } from "express";
import { Aluno, Usuarios } from "../types/index";
import { hashPassword } from "../utils/hash";

// GET - qualquer usuario do sistema por e-mail
export async function buscarUsuario(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if(!email || email.trim() === ""){
      return res.status(400).json({mensagem: "É obrigatório informar um email no corpo da requisição"});
    }
    
    let usuario: Usuarios[] | null = null;

    const { data: aluno, error: err_aluno } = await supabase
    .from("alunos").select("id, nome, email, ra, turma_id, created_at")
    .eq("email", email);

    if (err_aluno) throw err_aluno;

     usuario = aluno;

    if(!aluno){

      const { data: professor, error: err_prof } = await supabase
      .from("professores").select("id, nome, email, created_at")
      .eq("email", email);

      if(err_prof) throw err_prof;

      usuario = professor;
    }
    
    return res.status(200).json({mensagem: "Sucesso", usuario});

  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar alunos",
      detalhe: (err as Error).message,
    });
  }
}
