import express from "express";
import {
  listarTurmas,
  criarTurma,
  buscarTurma,
  editarTurma,
  deletarTurma,
} from "../controllers/turmas.controller.js";

const router = express.Router();

router.get("/", listarTurmas);
router.get("/:id", buscarTurma);
router.post("/", criarTurma);
router.put("/:id", editarTurma);
router.delete("/:id", deletarTurma);

export default router;
