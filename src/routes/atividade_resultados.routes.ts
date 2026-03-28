import express  from 'express';

import {enviarAtividade, 
        corrigirAtividade,
        buscarAtividadeRespondida

} from "../controllers/atividade_resultados.controller";

const router = express.Router();

router.get('/:id', buscarAtividadeRespondida);
router.put('/corrigir', corrigirAtividade);
router.post('/enviar', enviarAtividade);


export default router;