import supabase from "../db/supabase";
import { Request, Response } from "express"; 

//POST envio da atividade respondida pelo aluno
export async function enviarAtividade(req: Request, res: Response){
  try{

    const { atividade_id, aluno_id } = req.body;
    const respostas = req.body.respostas;

    if(!atividade_id || !aluno_id){

        return res.status(400).json({mensagem: "Os campos(atividade_id, aluno_id) são obrigatórios!"});
    }
     
    const {data: questoes, error} = await supabase
    .from("questoes")
    .select("id,tipo,valor")
    .eq("atividade_id",atividade_id);
    
    if(error) throw error;
 
    const promise  = respostas.map(async(item: any)=>{

      let filtroQuestao = questoes?.find(questao => questao.id === item.questao_id);
      
      return{
        ...item,
       ["pontuacao"]: filtroQuestao ? filtroQuestao.valor : 0,
       ["corrected_at"]: new Date() 
      };

    });
      
    const dadosInsert = await Promise.all(promise);
    
    const {data: respostasEnviadas, error: err_env}= await supabase
    .from("respostas")
    .insert(dadosInsert)
    .select()
    
    if(err_env) throw err_env;
    
     const pontuacaoTotal = dadosInsert?.reduce((acc, curr)=> acc+(curr.pontuacao||0),0)||0;
    const { data: envioDaAtividade, error: err_ativ} = await supabase
    .from("atividade_resultados")
    .insert({atividade_id,
             aluno_id,
             nota_alternativas: pontuacaoTotal,
             sent_at : new Date(),
             corrected_at: new Date(),
             nota_final : pontuacaoTotal
            })
    .select();       
    
     if(err_env) throw err_ativ;


    return res.status(200).json({mensagem:"Sucesso", envioDaAtividade});

  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao enviar a atividade",
      detalhe: (err as Error).message,
    });
  }

} 

//PUT/atividade-resultados/corrigir?avaliacao_id=1&aluno_id=3
//professor avaliando as questões dissertativas e fechando a avaliação
export async function corrigirAtividade(req: Request, res: Response){
  try{

    //id_avaliacao da avaliacao
    const { avaliacao_id, aluno_id } = req.query; 
    const [{resposta_id, pontuacao}] = req.body.itens;

    if(!avaliacao_id || !aluno_id){
      return res
      .status(400)
      .json({mensagem:"Os parâmetros(avaliacao_id, aluno_id), são obrigatórios!"}); 
    }
    
    if(!resposta_id || !pontuacao){
      return res
      .status(400)
      .json({mensagem:"No corpo da requisição(resposta_id, pontuacao), são obrigatórios!"}); 
    }
    
    const questoes = req.body.itens;
    const promessas = questoes.map(async(questao: any)=>{

      const { data: resposta, error: err_res} = await supabase
      .from("respostas")
      .update({pontuacao: questao.pontuacao,
               corrected_at: new Date()})
      .eq("id", questao.resposta_id)
      .select()
      .single();
      
      if(err_res) throw err_res
      
      return resposta;

    });
  
     const questoessAvalidados = await Promise.all(promessas);
     return res.status(200).json({mensagem:"Sucesso", questoessAvalidados});
     
  } catch (err) {
    return res.status(500).json({
      erro: "Erro ao corrigir a atividade",
      detalhe: (err as Error).message,
    });
  }

}

export async function buscarAtividadeRespondida(req: Request, res: Response){
  try{
    const{ id } = req.params;

    const {data: atividades, error: err_res} = await supabase
    .from("atividade_resultados")
    .select("*")
    .eq("atividade_id", id);

    if(err_res) throw err_res;

    return res.status(200).json({mensagem:'Sucesso', atividades});

  }catch (err) {
    return res.status(500).json({
      erro: "Erro ao buscar atividades",
      detalhe: (err as Error).message,
    });
  }


}