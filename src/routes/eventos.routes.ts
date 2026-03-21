import express from "express";
import {
  listarEventos,
  criarEvento,
  buscarEvento,
  deletarEvento,
  editarEvento,
} from "../controllers/eventos.controller";

const router = express.Router();

router.get("/", listarEventos);
router.get("/:id", buscarEvento);
router.post("/", criarEvento);
router.put("/:id", editarEvento);
router.delete("/:id", deletarEvento);

export default router;