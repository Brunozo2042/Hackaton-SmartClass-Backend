import express from 'express';
import {
  buscarUsuario
} from '../controllers/usuarios.controller';

const router = express.Router();

router.get('/', buscarUsuario);


export default router;
