import { FastifyRequest, FastifyReply } from "fastify";
import { UserRole } from "../generated/prisma/enums";
import { AppError } from "../utils/errors";

export const validateRole = (requiredRole: UserRole) => async (req: FastifyRequest, _reply: FastifyReply) => {
  if (!req.user) throw new AppError("User not found", 403);
  if (req.user.role !== requiredRole) throw new AppError("Unauthorized", 403);
};
