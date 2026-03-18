import express from "express";
import dotenv from "dotenv";
import alunosRoutes from "./routes/alunos.routes.js";

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());

app.use("/alunos", alunosRoutes);

export default app;
