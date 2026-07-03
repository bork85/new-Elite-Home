import { FastifyInstance } from "fastify";
import LoginController from "../controllers/auth/Login.controller";
import CreateUserController from "../controllers/users/CreateUser.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { validateAuth } from "../middlewares/validateAuth";
import { createUserSchema } from "../schemas/users/createUser.schema";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/login", LoginController.handle.bind(LoginController));
  
  app.post("/register", { preHandler: validateSchema(createUserSchema) }, CreateUserController.handle.bind(CreateUserController));

  app.get("/me", { preHandler: validateAuth }, (_req, reply) => { 
    return reply.status(200).send();
  });
}
