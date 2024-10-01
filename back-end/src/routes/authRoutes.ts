import { FastifyInstance } from "fastify";
import { loginUser, registerUser } from "../service/authService";
import { FastifyJwtSignOptions } from '@fastify/jwt'

export async function authRoutes(fastify: FastifyInstance) {
   // const prisma = fastify.Prisma;

    fastify.post('/register', async (request, reply) => {
        const { name, email, password } = request.body as { name: string, email: string, password: string };
        const result = await registerUser(name,email,password)
        reply.status(result.status).send({ message: result.message });
    });

    fastify.post('/login', async (request, reply) => {
        const { email, password } = request.body as { email: string, password: string };
        const result = await loginUser(email, password, fastify.jwt.sign)
        reply.status(result.status).send(result.token ? { token: result.token } : { message: result.message });
    });

   /*fastify.get('/protected', { preValidation: [fastify.jwt] }, (request, reply) => {
        reply.send({ message: 'Você acessou uma rota protegida' });
    });*/
}


