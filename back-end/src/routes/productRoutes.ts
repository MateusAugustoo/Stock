import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createProduct } from "../service/serviceProduct";
import { TData } from "../types/TData";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/products",
    async (request: FastifyRequest, replay: FastifyReply) => {
      const data = request.body as TData
      const product = await createProduct(data)
      return product
    }
  );
}
