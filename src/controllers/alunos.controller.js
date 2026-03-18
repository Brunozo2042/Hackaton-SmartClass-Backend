import supabase from "../db/supabase.js";

// GET /alunos
export async function listarAlunos(req, res) {
  try {
    const { data, error } = await supabase.from("alunos").select("*");

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar alunos",
      detalhe: err.message,
    });
  }
}

// POST /alunos
export async function criarAluno(req, res) {
  try {
    const { nome, email, idade } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        erro: "Nome e email são obrigatórios",
      });
    }

    const { data, error } = await supabase
      .from("alunos")
      .insert([{ nome, email, idade }])
      .select();

    if (error) throw error;

    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar aluno",
      detalhe: err.message,
    });
  }
}

// GET /alunos/:id
export async function buscarAluno(req, res) {
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
      detalhe: err.message,
    });
  }
}

// DELETE /alunos/:id
export async function deletarAluno(req, res) {
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
      detalhe: err.message,
    });
  }
}
