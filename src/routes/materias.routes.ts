import express from 'express';
import {
  listarMaterias,
  criarMateria,
  buscarMateria,
  deletarMateria,
  editarMateria,
} from '../controllers/materias.controller';

/**
 * @swagger
 * /materias:
 *   get:
 *     summary: Lista todas as matérias
 *     tags:
 *       - Matérias
 *     responses:
 *       200:
 *         description: Lista de matérias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Materia'
 *       500:
 *         description: Erro ao listar matérias
 *
 *   post:
 *     summary: Cria uma nova matéria
 *     tags:
 *       - Matérias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Materia'
 *     responses:
 *       201:
 *         description: Matéria criada com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 *       500:
 *         description: Erro ao criar matéria
 *
 * /materias/{id}:
 *   get:
 *     summary: Busca uma matéria pelo ID
 *     tags:
 *       - Matérias
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matéria encontrada com sucesso
 *       404:
 *         description: Matéria não encontrada
 *       500:
 *         description: Erro ao buscar matéria
 *
 *   put:
 *     summary: Atualiza os dados de uma matéria
 *     tags:
 *       - Matérias
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
 *             $ref: '#/components/schemas/Materia'
 *     responses:
 *       200:
 *         description: Matéria atualizada com sucesso
 *       400:
 *         description: Nenhum campo fornecido para atualização
 *       404:
 *         description: Matéria não encontrada
 *       500:
 *         description: Erro ao atualizar matéria
 *
 *   delete:
 *     summary: Deleta uma matéria pelo ID
 *     tags:
 *       - Matérias
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matéria deletada com sucesso
 *       404:
 *         description: Matéria não encontrada
 *       500:
 *         description: Erro ao deletar matéria
 */

const router = express.Router();

router.get('/', listarMaterias);
router.get('/:id', buscarMateria);
router.post('/', criarMateria);
router.put('/:id', editarMateria);
router.delete('/:id', deletarMateria);

export default router;
