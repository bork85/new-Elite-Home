import { FastifyInstance } from "fastify";
import CreateUserController from "../controllers/users/CreateUser.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { createUserSchema } from "../schemas/users/createUser.schema";
import { validateAuth } from "../middlewares/validateAuth";
import { validateRole } from "../middlewares/validateRole";
import { UserRole } from "../generated/prisma/enums";
import GetUserController from "../controllers/users/GetUser.controller";

export default async function userRoutes(app: FastifyInstance) {
  app.post("/user", { preHandler: [validateAuth, validateRole(UserRole.ADMIN), validateSchema(createUserSchema)] }, CreateUserController.handle.bind(CreateUserController));
  
  app.get("/user", { preHandler: [validateAuth, validateRole(UserRole.ADMIN)] }, GetUserController.handle.bind(GetUserController));
}
