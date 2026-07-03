import { FastifyRequest, FastifyReply } from "fastify";
import CreateUserService from "../../services/users/CreateUser.service";

class CreateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    await CreateUserService.execute(req.body as any);
    return reply.status(201).send("SUCCESS: User created!");
  }
}

export default new CreateUserController();
