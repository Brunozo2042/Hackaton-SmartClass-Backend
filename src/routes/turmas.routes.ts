import express from 'express';
import {
  listarTurmas,
  criarTurma,
  buscarTurma,
  editarTurma,
  deletarTurma,
} from '../controllers/turmas.controller';

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: Lista todas as turmas
 *     tags:
 *       - Turmas
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turma'
 *       500:
 *         description: Erro ao listar turmas
 *
 *   post:
 *     summary: Cria uma nova turma
 *     tags:
 *       - Turmas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 *       500:
 *         description: Erro ao criar turma
 *
 * /turmas/{id}:
 *   get:
 *     summary: Busca uma turma pelo ID
 *     tags:
 *       - Turmas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Turma encontrada com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao buscar turma
 *
 *   put:
 *     summary: Atualiza os dados de uma turma
 *     tags:
 *       - Turmas
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
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       400:
 *         description: Nenhum campo fornecido para atualização
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao atualizar turma
 *
 *   delete:
 *     summary: Deleta uma turma pelo ID
 *     tags:
 *       - Turmas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Turma deletada com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro ao deletar turma
 */

const router = express.Router();

router.get('/', listarTurmas);
router.get('/:id', buscarTurma);
router.post('/', criarTurma);
router.put('/:id', editarTurma);
router.delete('/:id', deletarTurma);

export default router;
