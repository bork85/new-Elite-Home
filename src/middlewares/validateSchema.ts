import { FastifyRequest, FastifyReply } from "fastify";
import type { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => async (req: FastifyRequest, reply: FastifyReply) => {
  const body = req.params && (req.params as any).id
    ? { ...(req.body as object), id: (req.params as any).id }
    : req.body;

  const result = schema.safeParse(body);
  if (!result.success) {
    return reply.status(400).send({ message: result.error.format() });
  }
};
