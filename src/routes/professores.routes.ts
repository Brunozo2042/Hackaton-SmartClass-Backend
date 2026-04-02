import express from 'express';
import {
  listarProfessores,
  criarProfessor,
  atualizarProfessor,
  deletarProfessor,
  buscarProfessorPorId,
} from '../controllers/professores.controller';

/**
 * @swagger
 * /professores:
 *   get:
 *     summary: Lista todos os professores
 *     tags:
 *       - Professores
 *     responses:
 *       200:
 *         description: Lista de professores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   senha:
 *                     type: string
 *                   materias:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         nome:
 *                           type: string
 *       500:
 *         description: Erro ao listar professores
 *
 *   post:
 *     summary: Cria um novo professor
 *     tags:
 *       - Professores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               materias:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 senha:
 *                   type: string
 *                 materias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *       400:
 *         description: Dados obrigatórios ausentes
 *       500:
 *         description: Erro ao criar professor
 *
 * /professores/{id}:
 *   get:
 *     summary: Busca um professor pelo ID
 *     tags:
 *       - Professores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 senha:
 *                   type: string
 *                 materias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro ao buscar professor
 *
 *   put:
 *     summary: Atualiza os dados de um professor
 *     tags:
 *       - Professores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               materias:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       400:
 *         description: Nenhum campo fornecido para atualização
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro ao atualizar professor
 *
 *   delete:
 *     summary: Deleta um professor pelo ID
 *     tags:
 *       - Professores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Professor deletado com sucesso
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro ao deletar professor
 */

const router = express.Router();

router.get('/', listarProfessores);
router.post('/', criarProfessor);
router.get('/:id', buscarProfessorPorId);
router.put('/:id', atualizarProfessor);
router.delete('/:id', deletarProfessor);

export default router;
