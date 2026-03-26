import express from "express";
import {
  listarAtividades,
  criarAtividade,
  buscarAtividade,
  deletarAtividade,
  editarAtividades,
} from "../controllers/atividades.controller";

const router = express.Router();

router.get("/", listarAtividades);
router.get("/:id", buscarAtividade);
router.post("/", criarAtividade);
router.put("/:id", editarAtividades);
router.delete("/:id", deletarAtividade);

export default router;