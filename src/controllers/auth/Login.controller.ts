import { FastifyRequest, FastifyReply } from "fastify";
import LoginService from "../../services/auth/Login.service";

class LoginController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const input = req.body;
    const service = new LoginService();
    const response = await service.execute(input as any);
    return reply.status(200).send(response);
  }
}

export default new LoginController();
