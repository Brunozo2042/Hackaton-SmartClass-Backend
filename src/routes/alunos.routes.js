import express from "express";
import {
  listarAlunos,
  criarAluno,
  buscarAluno,
  deletarAluno,
} from "../controllers/alunos.controller.js";

const router = express.Router();

router.get("/", listarAlunos);
router.get("/:id", buscarAluno);
router.post("/", criarAluno);
router.delete("/:id", deletarAluno);

export default router;
