import fastify from "fastify";
import { productRoutes } from "./routes/productRoutes";
import cors from "@fastify/cors";

const app = fastify({logger: true});

app.register(cors, {
  origin: (origin, cb) => {
    if(!origin || origin.includes('localhost')){
      cb(null, true)
      return
    }
    cb(new Error('Not allowed'), false)
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})
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