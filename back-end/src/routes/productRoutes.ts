import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "../service/serviceProduct";
import { TData } from "../types/TData";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/register_products",
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

  fastify.get('/get_products', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const products = await getProducts()
      reply.status(200).send(products)
    } catch(error){}
  })
}
