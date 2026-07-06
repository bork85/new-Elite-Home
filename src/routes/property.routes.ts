import { FastifyInstance } from "fastify";
import { validateAuth } from "../middlewares/validateAuth";
import { validateRole } from "../middlewares/validateRole";
import { UserRole } from "../generated/prisma/enums";
import {
  createProperty,
  findProperty,
  searchProperties,
  updateProperty,
  createVisit,
  updateVisit,
  getAllVisits,
} from "../controllers/properties/property.controller";

export default async function propertyRoutes(app: FastifyInstance) {
  app.post("/properties", { preHandler: [validateAuth, validateRole(UserRole.ADMIN)] }, createProperty);
  app.get("/properties", searchProperties);
  app.get("/properties/:id", findProperty);
  app.patch("/properties/:id", { preHandler: [validateAuth, validateRole(UserRole.ADMIN)] }, updateProperty);
  app.post("/properties/:id/visit", createVisit);
  app.patch("/properties/:id/visit", { preHandler: [validateAuth, validateRole(UserRole.ADMIN)] }, updateVisit);
  app.get("/properties/:id/visit", { preHandler: [validateAuth, validateRole(UserRole.ADMIN)] }, getAllVisits);
}
