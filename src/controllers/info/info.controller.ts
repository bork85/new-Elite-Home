import { FastifyRequest, FastifyReply } from "fastify";
import GetInfoService from "../../services/info/GetInfo.service";

class InfoController {
  handle(_req: FastifyRequest, reply: FastifyReply) {
    const response = GetInfoService.execute();
    return reply.status(200).send({ message: "✅ App is Running!", response });
  }
}

export default new InfoController();
