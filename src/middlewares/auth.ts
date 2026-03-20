import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserPayload } from "../types/express";

export function autenticarToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    // 🔒 Verifica formato do header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não definido");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔒 Narrowing + validação forte
    if (
      typeof decoded !== "object" ||
      !decoded ||
      typeof decoded.id !== "string" ||
      typeof decoded.email !== "string"
    ) {
      return res.status(403).json({ erro: "Token inválido" });
    }

    // ✔ Agora está 100% seguro
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}
