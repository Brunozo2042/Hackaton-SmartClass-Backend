import express from "express";
import {
  listarQuestoes,
  criarQuestoes,
  buscarQuestoes,
  deletarQuestoes,
  editarQuestoes,
} from "../controllers/questoes.controller";

const router = express.Router();

router.get("/", listarQuestoes);
router.get("/:id", buscarQuestoes);
router.post("/", criarQuestoes);
router.put("/:id", editarQuestoes);
router.delete("/:id", deletarQuestoes);

export default router;