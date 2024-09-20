import fastify from "fastify";
import { productRoutes } from "./routes/productRoutes";

const app = fastify({logger: true});

app.register(productRoutes)

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();