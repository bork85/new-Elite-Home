import { FastifyInstance } from "fastify";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import propertyRoutes from "./property.routes";
import infoRoutes from "./info.routes";

export default async function routes(app: FastifyInstance) {
  app.register(infoRoutes);
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(propertyRoutes);
}
