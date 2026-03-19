import express from "express";
import dotenv from "dotenv";
import logger from "./middlewares/logger..js";
import alunosRoutes from "./routes/alunos.routes.js";
import turmasRoutes from "./routes/turmas.routes.js";

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());

app.use(logger);

app.use("/alunos", alunosRoutes);
app.use("/turmas", turmasRoutes);

export default app;
