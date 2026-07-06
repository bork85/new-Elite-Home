import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = fastify({ logger: false });

app.register(cors, { origin: "*" });
app.register(routes);

app.setErrorHandler(errorHandler);

export default app;
