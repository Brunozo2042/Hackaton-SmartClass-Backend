import express from 'express';
import {
  listarConteudos,
  criarConteudo,
  buscarConteudo,
  deletarConteudo,
  editarConteudo,
} from '../controllers/conteudos.controller';

/**
 * @swagger
 * /conteudos:
 *   get:
 *     summary: Lista todos os conteúdos
 *     tags:
 *       - Conteúdos
 *     responses:
 *       200:
 *         description: Lista de conteúdos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conteudo'
 *       500:
 *         description: Erro ao listar conteúdos
 *
 *   post:
 *     summary: Cria um novo conteúdo
 *     tags:
 *       - Conteúdos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conteudo'
 *     responses:
 *       201:
 *         description: Conteúdo criado com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 *       500:
 *         description: Erro ao criar conteúdo
 *
 * /conteudos/{id}:
 *   get:
 *     summary: Busca um conteúdo pelo ID
 *     tags:
 *       - Conteúdos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conteúdo encontrado com sucesso
 *       404:
 *         description: Conteúdo não encontrado
 *       500:
 *         description: Erro ao buscar conteúdo
 *
 *   put:
 *     summary: Atualiza os dados de um conteúdo
 *     tags:
 *       - Conteúdos
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
 *             $ref: '#/components/schemas/Conteudo'
 *     responses:
 *       200:
 *         description: Conteúdo atualizado com sucesso
 *       400:
 *         description: Nenhum campo fornecido para atualização
 *       404:
 *         description: Conteúdo não encontrado
 *       500:
 *         description: Erro ao atualizar conteúdo
 *
 *   delete:
 *     summary: Deleta um conteúdo pelo ID
 *     tags:
 *       - Conteúdos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conteúdo deletado com sucesso
 *       404:
 *         description: Conteúdo não encontrado
 *       500:
 *         description: Erro ao deletar conteúdo
 */

const router = express.Router();

router.get('/', listarConteudos);
router.get('/:id', buscarConteudo);
router.post('/', criarConteudo);
router.put('/:id', editarConteudo);
router.delete('/:id', deletarConteudo);

export default router;
