import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "../service/serviceProduct";
import { TData } from "../types/TData";
import { verifyJWT } from "../utils/jwt/verifyJWT";
import { JwtPayload } from "jsonwebtoken";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/register_products",
    { preHandler: [verifyJWT] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = request.body as TData;

        if (typeof request.user === "object" && "userId" in request.user) {
          const userId = request.user.userId

          const product = await createProduct(data, userId);
          reply.code(201).send(product);
        } else {
          reply.status(400).send({ message: "Usuário não autenticado" });
        }
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send("Internal Server Error");
      }
    }
  );

  fastify.get(
    "/get_products",
    { preHandler: [verifyJWT] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const products = await getProducts();
        reply.status(200).send(products);
      } catch (error) {}
    }
  );
}
