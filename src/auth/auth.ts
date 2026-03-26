import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../utils/hash';
import supabase from '../db/supabase';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     description: Retorna um token JWT para autenticação com base nas credenciais fornecidas.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O e-mail do usuário.
 *               senha:
 *                 type: string
 *                 description: A senha do usuário.
 *               tipo:
 *                 type: string
 *                 description: O tipo de usuário (aluno, professor, admin).
 *             required:
 *               - email
 *               - senha
 *               - tipo
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: O token JWT gerado.
 *       400:
 *         description: Requisição inválida (dados ausentes ou tipo inválido).
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, senha, tipo } = req.body;

    if (!email || !senha || !tipo) {
      return res.status(400).json({ erro: 'E-mail, senha e tipo são obrigatórios' });
    }

    // Determinar a tabela com base no tipo
    let tabela;
    if (tipo === 'aluno') {
      tabela = 'alunos';
    } else if (tipo === 'professor') {
      tabela = 'professores';
    } else if (tipo === 'admin') {
      tabela = 'administradores';
    } else {
      return res.status(400).json({ erro: 'Tipo de usuário inválido' });
    }

    // Buscar o usuário na tabela correspondente
    const { data, error } = await supabase
      .from(tabela)
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !data) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Verificar a senha
    const senhaValida = await verifyPassword(senha, data.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: data.id, email: data.email, tipo }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({
      erro: 'Erro ao realizar login',
      detalhe: (err as Error).message,
    });
  }
});

export default router;
