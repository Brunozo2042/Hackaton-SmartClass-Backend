import express from "express";
import {
  listarAlunos,
  criarAluno,
  buscarAluno,
  deletarAluno,
  editarAluno,
} from "../controllers/alunos.controller";

const router = express.Router();

router.get("/", listarAlunos);
router.get("/:id", buscarAluno);
router.post("/", criarAluno);
router.put("/:id", editarAluno);
router.delete("/:id", deletarAluno);

export default router;
