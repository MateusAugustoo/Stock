import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { loginUser, registerUser } from "../service/authService";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/register_user",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const data = request.body as TUser;
      const result = await registerUser(data);

      if ("status" in result! && result?.status && result?.message) {
        reply.status(result.status).send({ message: result.message });
      } else {
        reply.status(201).send({ message: "Usuário cadastrado com sucesso" });
      }
    }
  );

  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
        const { email, password } = request.body as {
            email: string,
            password: string
        }

        const result = await loginUser(email, password)

        if("status" in result! && result?.status && result?.message){
            reply.status(result.status).send({ message: result.message })
        }else {
            reply.status(200).send(result)
        }
    }
  );
}
