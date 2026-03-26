import express from 'express';
import {
  listarEventos,
  criarEvento,
  buscarEvento,
  deletarEvento,
  editarEvento,
} from '../controllers/eventos.controller';

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Lista todos os eventos
 *     tags:
 *       - Eventos
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 *       500:
 *         description: Erro ao listar eventos
 *
 *   post:
 *     summary: Cria um novo evento
 *     tags:
 *       - Eventos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 *       500:
 *         description: Erro ao criar evento
 *
 * /eventos/{id}:
 *   get:
 *     summary: Busca um evento pelo ID
 *     tags:
 *       - Eventos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado com sucesso
 *       404:
 *         description: Evento não encontrado
 *       500:
 *         description: Erro ao buscar evento
 *
 *   put:
 *     summary: Atualiza os dados de um evento
 *     tags:
 *       - Eventos
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
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Nenhum campo fornecido para atualização
 *       404:
 *         description: Evento não encontrado
 *       500:
 *         description: Erro ao atualizar evento
 *
 *   delete:
 *     summary: Deleta um evento pelo ID
 *     tags:
 *       - Eventos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 *       404:
 *         description: Evento não encontrado
 *       500:
 *         description: Erro ao deletar evento
 */

const router = express.Router();

router.get('/', listarEventos);
router.get('/:id', buscarEvento);
router.post('/', criarEvento);
router.put('/:id', editarEvento);
router.delete('/:id', deletarEvento);

export default router;
