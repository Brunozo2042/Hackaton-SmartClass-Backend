// libs externas
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// middlewares
import { autenticarToken } from './middlewares/auth';
import logger from './middlewares/logger';

// rotas
import authRoutes from "./auth/auth";
import alunosRoutes from "./routes/alunos.routes";
import turmasRoutes from "./routes/turmas.routes";
import professoresRoutes from "./routes/professores.routes";
import materiasRoutes from "./routes/materias.routes";
import conteudosRoutes from "./routes/conteudos.routes";
import eventosRoutes from "./routes/eventos.routes";
import atividadesRoutes from "./routes/atividades.routes";
import questoesRoutes  from "./routes/questoes.routes";
import atividadesResultadoRoutes from "./routes/atividade_resultados.routes";
import usuariosRoutes from './routes/usuarios.routes';


dotenv.config({ quiet: true });

const app = express();

app.use(express.json());

app.use(logger);

app.use('/auth', authRoutes);

app.use("/alunos", autenticarToken, alunosRoutes);
app.use("/turmas", autenticarToken, turmasRoutes);
app.use("/professores", autenticarToken, professoresRoutes);
app.use("/materias", autenticarToken, materiasRoutes);
app.use("/conteudos", autenticarToken, conteudosRoutes);
app.use("/eventos", autenticarToken, eventosRoutes);
app.use("/atividades", autenticarToken, atividadesRoutes);
app.use("/questoes", autenticarToken, questoesRoutes);
app.use("/atividade-resultados", autenticarToken, atividadesResultadoRoutes);
app.use("/usuarios", autenticarToken, usuariosRoutes);
export default app;
