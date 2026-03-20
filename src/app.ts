// libs externas
import express from "express";
import dotenv from "dotenv";

// middlewares
import { autenticarToken } from "./middlewares/auth";
import logger from "./middlewares/logger";

// rotas
import authRoutes from "./auth/auth";
import alunosRoutes from "./routes/alunos.routes";
import turmasRoutes from "./routes/turmas.routes";

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());

app.use(logger);

app.use("/auth", authRoutes);

app.use("/alunos", autenticarToken, alunosRoutes);
app.use("/turmas", autenticarToken, turmasRoutes);

export default app;
