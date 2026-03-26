// libs externas
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// middlewares
import { autenticarToken } from './middlewares/auth';
import logger from './middlewares/logger';

// rotas
<<<<<<< HEAD
import authRoutes from "./auth/auth";
import alunosRoutes from "./routes/alunos.routes";
import turmasRoutes from "./routes/turmas.routes";
import professoresRoutes from "./routes/professores.routes";
import materiasRoutes from "./routes/materias.routes";
import conteudosRoutes from "./routes/conteudos.routes";
import eventosRoutes from "./routes/eventos.routes";
import atividadesRoutes from "./routes/atividades.routes";
import questoesRoutes  from "./routes/questoes.routes";
import respotasRoutes from './routes/respostas.routes';
=======
import authRoutes from './auth/auth';
import alunosRoutes from './routes/alunos.routes';
import turmasRoutes from './routes/turmas.routes';
import professoresRoutes from './routes/professores.routes';
import materiasRoutes from './routes/materias.routes';
import conteudosRoutes from './routes/conteudos.routes';
import eventosRoutes from './routes/eventos.routes';
import swaggerOptions from './utils/swagger';

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints relacionados à autenticação
 *   - name: Alunos
 *     description: Endpoints relacionados aos alunos
 *   - name: Turmas
 *     description: Endpoints relacionados às turmas
 *   - name: Professores
 *     description: Endpoints relacionados aos professores
 *   - name: Materias
 *     description: Endpoints relacionados às matérias
 *   - name: Conteúdos
 *     description: Endpoints relacionados aos conteúdos
 *   - name: Eventos
 *     description: Endpoints relacionados aos eventos
 */
>>>>>>> origin/main

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());

app.use(logger);

app.use('/auth', authRoutes);

<<<<<<< HEAD
app.use("/alunos", autenticarToken, alunosRoutes);
app.use("/turmas", autenticarToken, turmasRoutes);
app.use("/professores", autenticarToken, professoresRoutes);
app.use("/materias", autenticarToken, materiasRoutes);
app.use("/conteudos", autenticarToken, conteudosRoutes);
app.use("/eventos", autenticarToken, eventosRoutes);
app.use("/atividades", autenticarToken, atividadesRoutes);
app.use("/questoes", autenticarToken, questoesRoutes);
app.use("/respostas", autenticarToken, respotasRoutes);
=======
app.use('/alunos', autenticarToken, alunosRoutes);
app.use('/turmas', autenticarToken, turmasRoutes);
app.use('/professores', autenticarToken, professoresRoutes);
app.use('/materias', autenticarToken, materiasRoutes);
app.use('/conteudos', autenticarToken, conteudosRoutes);
app.use('/eventos', autenticarToken, eventosRoutes);

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Configuração da rota /api-docs para servir a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

>>>>>>> origin/main
export default app;
