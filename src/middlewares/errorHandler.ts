import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/errors";

export function errorHandler(err: FastifyError | AppError | unknown, _req: FastifyRequest, reply: FastifyReply) {
  if (err instanceof AppError) {
    return reply.status(err.statusCode).send({ error: err.message });
  }
  return reply.status(500).send({ error: "Internal server error" });
}
