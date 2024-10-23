import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts,updateProduct,deleteProduct} from "../service/serviceProduct";
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
//Rota para atualizar produto por ID
  fastify.put('/update_product/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const data = request.body as TData;               
      const updatedProduct = await updateProduct(id, data);
      reply.status(200).send(updatedProduct);           
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send("Erro Interno do Servidor"); 
    }
  });

  // Rota para deletar produto por ID
  fastify.delete('/delete_product/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }; 
      await deleteProduct(id);
      reply.status(204).send();                         
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send("Erro Interno do Servidor");
    }
  });