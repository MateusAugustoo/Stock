import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createProduct } from "../service/serviceProduct";
import { TData } from "../types/TData";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/products",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = request.body as TData;
        const product = await createProduct(data);
        reply.code(201).send(product);
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send("Internal Server Error");
      }
    }
  );
}
