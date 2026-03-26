import supabase from "../db/supabase";
import { Request, Response } from "express";
import { Questoes, tipoQuestao } from "../types/index";

// GET /questoes
export async function listarQuestoes(req: Request, res: Response) {
  try {
 
   const {data: questoes, error} = await supabase.from("questoes").select("*");

   if (error) throw error;
    
   const dadosSaida = await Promise.all(questoes.map(async(questao) => {

    let itens = null;

    if(questao.tipo ==="Dissertativa"){

      const { data } = await supabase
      .from("dissertativas")
      .select()
      .eq("questao_id",questao.id)
      .single();

      itens = data;
    }
    else {const { data } = await supabase
          .from("alternativas")
          .select()
          .eq("questao_id",questao.id)
          .single();

      itens = data; 
    }

    return {
    ...questao,
    itens: itens
    };

   }));


    if (error) throw error;
    
    return res.status(200).json({"Questoes": dadosSaida});
    
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar questões",
      detalhe: (err as Error).message,
    });
  }
}

// POST /atividades
export async function criarQuestoes(req: Request, res: Response) {
 
  try {
    const { atividade_id, tipo, enunciado, valor, pontuacao, itens }: Questoes = req.body;
 
    if (!atividade_id || !tipo || !enunciado || (valor === undefined || valor === null)) {
      return res.status(400)
      .json({erro: "Todos os campos são obrigatórios"});
    }

    if (!itens || itens.length === 0) {
      return res.status(400)
      .json({ erro: "A questão precisa de pelo menos uma alternativa." });
    }
 

    const { data, error } = await supabase
      .from("questoes")
      .insert([{ atividade_id, tipo, enunciado, valor, pontuacao}])
      .select();

    if (error) throw error;

    const questao = data[0];

    if(questao && questao.id){

      const salvarItemQuesta = itens.map(item =>({
        questao_id: questao.id,
        texto: item.texto,
        correta : item.correta
      }));
      
      
      if(questao.tipo === 'Alternativa'){
        
        const {data, error} = await supabase
        .from("alternativas")
        .insert(salvarItemQuesta)
        .select();

        return res.status(201)
        .json({questao,"itens":data});
      }
      else if(questao.tipo === 'Dissertativa'){
        
        const {data, error} = await supabase
        .from("dissertativas")
        .insert(salvarItemQuesta)
        .select();

        return res.status(201)
        .json({questao,"itens":data});
      }

        if (error) throw error;
    }
    
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar questões",
      detalhe: (err as Error).message,
    });
  }
}

// GET /questoes/:id
export async function buscarQuestoes(req: Request, res: Response) {
  try {
    
    const { id } = req.params;

    const { data: questao, error } = await supabase
      .from("questoes")
      .select("*")
      .eq("id", id)
      .single();

    if (!questao) {
      return res.status(404).json({
        erro: "Questão não encontrado",
      });
    }
 
    if (error) throw error;
     
    let itens = null;
     
    if(questao.tipo === "Dissertativa"){
 
       const {data} = await supabase
       .from("dissertativas")
       .select("*")
       .eq("questao_id", questao.id);

      itens = data;

    }else{
      const {data} = await supabase
       .from("alternativas")
       .select("*")
       .eq("questao_id", questao.id);

      itens = data;

    }

    const dadosSaida = {
      ...questao,
      itens
    }
    return res.status(200).json(dadosSaida);

  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao buscar questão",
      detalhe: (err as Error).message,
    });
  }
}

// DELETE /questoes/:id
export async function deletarQuestoes(req: Request, res: Response) {
  try {
    const { id } = req.params;

     const {data: questao, error } = await supabase.from("questoes").select("*").eq("id",id).single();
    
    if(!questao){
      return res.status(400).json({mensagem: "Questão não encontrada para exclusão"});
    }

    const { error: _erro } = await supabase.from("questoes").delete().eq("id", id);

    if (_erro) throw _erro;

    return res.status(200).json({
      mensagem: "Questão deletada com sucesso!",
    });
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao deletar questão",
      detalhe: (err as Error).message,
    });
  }
}

// PUT /questoes/:id
export async function editarQuestoes(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { atividade_id, tipo, enunciado, valor} = req.body;

    if (!atividade_id && !tipo && !enunciado && !valor) {
      return res.status(400).json({
        erro: "Pelo menos um campo (atividade_id, tipo, enunciado, valor) deve ser fornecido para atualização",
      });
    }

    const { data: dados, error: erro } = await supabase
      .from("questoes")
      .select(`*, dissertativas (*), alternativas (*)`)
      .eq("id", id)
      .single();
    
      if (erro) throw erro;
  
      if((dados.dissertativas.length || dados.alternativas.length) && dados.tipo !== tipo ){
        
        return res
        .status(400)
        .json({erro:"Não foi possível alterar a questão",
          detalhe: `A questão possui registro filho com tipo diferente do que está alterando: ${tipo}`,
        });
      }
       
    const tiposValidos = Object.values(tipoQuestao).filter(v => typeof v === 'string');
    if(!tiposValidos.includes(tipo)){
      return res.status(400).json({
        erro: `A atividade precisa ser uma das opções: ${tiposValidos}`,
      });
    }
    
    const camposParaAtualizar: Partial<Questoes> = {};
    if (atividade_id) camposParaAtualizar.atividade_id = atividade_id;
    if (tipo) camposParaAtualizar.tipo = tipo;
    if (enunciado) camposParaAtualizar.enunciado = enunciado;
    if (valor) camposParaAtualizar.valor = valor;

    const { data, error } = await supabase
      .from("questoes")
      .update(camposParaAtualizar)
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data.length) {
      return res.status(404).json({
        erro: "Questão não encontrado",
      });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao editar questão",
      detalhe: (err as Error).message,
    });
  }
}
