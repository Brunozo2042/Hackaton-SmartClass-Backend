import express from "express";
import {
  listarProfessores,
  criarProfessor,
  atualizarProfessor,
  deletarProfessor,
  buscarProfessorPorId,
} from "../controllers/professores.controller";

const router = express.Router();

router.get("/", listarProfessores);
router.post("/", criarProfessor);
router.get("/:id", buscarProfessorPorId);
router.put("/:id", atualizarProfessor);
router.delete("/:id", deletarProfessor);

export default router;