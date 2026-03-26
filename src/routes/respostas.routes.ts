import express from "express";
import {
  buscarResposta,
  criaResposta,
  avaliarDissertativa,
  alterarResposta,
  deletarResposta
} from "../controllers/respostas.controller";

const router = express.Router();

router.get("/:id", buscarResposta);
router.post("/", criaResposta);
router.put("/avaliar-dissertativa/:id", avaliarDissertativa); 
router.put("/:id", alterarResposta);
router.delete("/:id", deletarResposta);

export default router;