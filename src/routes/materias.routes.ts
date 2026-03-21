import express from "express";
import {
  listarMaterias,
  criarMateria,
  buscarMateria,
  deletarMateria,
  editarMateria,
} from "../controllers/materias.controller";

const router = express.Router();

router.get("/", listarMaterias);
router.get("/:id", buscarMateria);
router.post("/", criarMateria);
router.put("/:id", editarMateria);
router.delete("/:id", deletarMateria);

export default router;