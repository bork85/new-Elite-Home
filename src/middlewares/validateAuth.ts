import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { UserPayload } from "../@types/user";
import { AppError } from "../utils/errors";

export const validateAuth = async (req: FastifyRequest, _reply: FastifyReply) => {
  const header = req.headers.authorization;
  if (!header) throw new AppError("Token não enviado", 401);

  const token = header.split(" ")[1];
  if (!token) throw new AppError("Token não configurado", 401);

  const secret = process.env.JWT_SECRET_KEY as string;
  if (!secret) throw new AppError("JWT não configurado", 500);

  try {
    const decoded = jwt.verify(token, secret) as UserPayload;
    req.user = { id: decoded.id, role: decoded.role };
  } catch {
    throw new AppError("Token inválido", 401);
  }
};
