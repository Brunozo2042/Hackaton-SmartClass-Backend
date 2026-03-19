import { Request, Response } from "express";
const logger = (req: Request, res: Response, next: () => void) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);

  next(); // Passa para o próximo middleware ou rota
};

export default logger;
