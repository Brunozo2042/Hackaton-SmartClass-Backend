import supabase from "../db/supabase";
import { Request, Response } from "express";
import { Resposta } from "../types/index";



// POST /respostas/:id
export async function criaResposta(req: Request, res: Response){
    try{

        const { questao_id, aluno_id, alternativa_id, resposta_dissertativa, dissertativa_id } :Resposta = req.body;

        if(!questao_id || !aluno_id || !alternativa_id && !dissertativa_id){

            return res.status(400).json({erro:"Os seguintes campos (questao_id, aluno_id,alternativa_id ou dissertativa_id), são obrigatórios!"});
        }

        const {data, error:_error} = await supabase
        .from("questoes")
        .select("tipo")
        .eq("id", questao_id)
        .single();
        
        console.log(data?.tipo);

        //tratamento de resposta conflitante
        let _dissertativa_id = (data?.tipo === "Dissertativa")? dissertativa_id : null;
        let _resposta_dissertativa  = (data?.tipo === "Dissertativa")? resposta_dissertativa : null;
        let _alternativa_id  = (data?.tipo === "Alternativa")? alternativa_id : null;
        
        if(data?.tipo === "Dissertativa" && dissertativa_id === null){

            return res.status(400).json({erro: "Para uma questão dissertativa, (dissertativa_id) não pode ser nulo "});

        }else if(data?.tipo === "Alternativa" && alternativa_id === null){

            return res.status(400).json({erro: "Para uma questão alternativa, (alternativa_id) não pode ser nulo "});

        }

        const {data: respostas, error} = await supabase
        .from("respostas")
        .insert([{questao_id, 
                    aluno_id, 
                    alternativa_id : _alternativa_id,
                    resposta_dissertativa : _resposta_dissertativa, 
                    dissertativa_id : _dissertativa_id
                }])
        .select();

        if(error) throw error;

        return res.status(200).json(respostas);


    }catch (err) {
    return res.status(500).json({
      erro: "Erro ao criar respostas",
      detalhe: (err as Error).message,
    });
  }


}

// GET /questoes/:id --  passar o código da questão
export async function buscarResposta(req: Request, res: Response){
    try{   
        const { id } = req.params;

        const {data: respostas, error} = await supabase
        .from("respostas")
        .select("*")
        .eq("questao_id", id);
        
        console.log(respostas);
        if(!respostas){
            return res.status(400).json({mensagem: "Respostas não encontradas!"});
        }

        if(error) throw error;
        
        return res.status(200).json(respostas);

    }catch (err) {
    return res.status(500).json({
      erro: "Erro ao listar respostas",
      detalhe: (err as Error).message,
    });
  }

}

/* PUT /avalia-dissertativa/:id -- passar o codigo da dissertativa 
   Esse recurso é para o professor avaliar o aluno.
*/
export async function avaliarDissertativa(req: Request, res: Response){
    try{

        const {id} = req.params;
        const { pontuacao } = req.body;

        if(!pontuacao){
            return res.status(400).json({mensagem: "É obrigatório informar a pontuacao no corpo da requisição!"});
        }

        const {data: resposta, error} = await supabase
        .from("respostas")
        .update([{pontuacao}])
        .eq("id", id)
        .select();

        console.log(resposta);
        if(!resposta){
            return res.status(400).json({mensagem:"Resposta não encontrada com esse id"});
        }

        if(error) throw error;

        return res.status(200).json(resposta);


    }catch (err) {
    return res.status(500).json({
      erro: "Erro ao tentar avaliar a resposta",
      detalhe: (err as Error).message,
    });
  }

}
//PUT / 
export async function alterarResposta(req: Request, res: Response){
    try{
          const { id } = req.params;
          const { questao_id } = req.query;
          const {alternativa_id, resposta_dissertativa } = req.body;

        if(!req.query.questao_id){
        
            return res
            .status(400)
            .json({erro: "A url deve conter os seguintes parametros id = id da resposta e &questao_id = id da questão"});
        }

        const {data, error} = await supabase
        .from("questoes")
        .select("tipo")
        .eq("id", questao_id)
        .single();

        if(!data){
          return res.status(400).json({mensagem:"Questão não encontrada com  o parâmetro(questao_id) informado!"});
        }
        if(error) throw error;
        
        const tipoQuestao = data?.tipo;

        let saidaRespostaAlterada = null;

        if(tipoQuestao === "Alternativa"){
            
            const {data, error} = await supabase
            .from("respostas")
            .update({alternativa_id})
            .eq("id", id)
            .select()
            .single(); 
            
            if(!data){
                return res.status(200).json({mensagem:"Resposta não encontrada para alteração!"});
            }
        
            if(error) throw error;
            
            saidaRespostaAlterada = data;
       
        }else{
            
            const {data, error} = await supabase
            .from("respostas")
            .update({alternativa_id})
            .select()
            .eq("id", id)
            .single(); 

            if(!data){
                return res.status(200).json({mensagem:"Resposta não encontrada para alteração!"});
            }

            if(error) throw error;

            saidaRespostaAlterada = data;
        }

        return res.status(200).json(saidaRespostaAlterada);
        
    }catch (err) {
    return res.status(500).json({
      erro: "Erro ao tentar alterar a resposta",
      detalhe: (err as Error).message,
    });

    }
}
//DELETE -- Excluir uma resposta se necessário
export async function deletarResposta(req: Request, res: Response){
    try{
            const { id } = req.params;

            const { data, error } = await supabase
            .from("respostas")
            .delete()
            .eq("id", id);

            if(error) throw error;

            return res.status(200).json({mensagem:"Resposta deletada com sucesso!"});

        }catch (err) {
        return res.status(500).json({
        erro: "Erro ao tentar alterar a resposta",
        detalhe: (err as Error).message,
        });
    }
}
