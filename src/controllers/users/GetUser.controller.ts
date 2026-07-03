import { FastifyRequest, FastifyReply } from "fastify";
import GetUserService from "../../services/users/GetUser.service";

class GetUserController {
  async handle(_req: FastifyRequest, reply: FastifyReply) {
    const response = await GetUserService.execute();
    return reply.status(200).send(response);
  }
}

export default new GetUserController();
