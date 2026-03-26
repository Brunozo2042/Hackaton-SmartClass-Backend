import express from 'express';
import {
  listarAlunos,
  criarAluno,
  buscarAluno,
  deletarAluno,
  editarAluno,
} from '../controllers/alunos.controller';

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags:
 *       - Alunos
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 *       500:
 *         description: Erro ao listar alunos
 *
 *   post:
 *     summary: Cria um novo aluno
 *     tags:
 *       - Alunos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 *       500:
 *         description: Erro ao criar aluno
 *
 * /alunos/{id}:
 *   get:
 *     summary: Busca um aluno pelo ID
 *     tags:
 *       - Alunos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno encontrado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro ao buscar aluno
 *
 *   put:
 *     summary: Atualiza os dados de um aluno
 *     tags:
 *       - Alunos
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
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       400:
 *         description: Nenhum campo fornecido para atualização
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro ao atualizar aluno
 *
 *   delete:
 *     summary: Deleta um aluno pelo ID
 *     tags:
 *       - Alunos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno deletado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro ao deletar aluno
 */

const router = express.Router();

router.get('/', listarAlunos);
router.get('/:id', buscarAluno);
router.post('/', criarAluno);
router.put('/:id', editarAluno);
router.delete('/:id', deletarAluno);

export default router;
