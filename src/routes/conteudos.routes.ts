import express from "express";
import {
  listarConteudos,
  criarConteudo,
  buscarConteudo,
  deletarConteudo,
  editarConteudo,
} from "../controllers/conteudos.controller";

const router = express.Router();

router.get("/", listarConteudos);
router.get("/:id", buscarConteudo);
router.post("/", criarConteudo);
router.put("/:id", editarConteudo);
router.delete("/:id", deletarConteudo);

export default router;