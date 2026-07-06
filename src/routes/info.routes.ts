import { FastifyInstance } from "fastify";
import InfoController from "../controllers/info/info.controller";

export default async function infoRoutes(app: FastifyInstance) {
  app.get("/", InfoController.handle.bind(InfoController));
}
