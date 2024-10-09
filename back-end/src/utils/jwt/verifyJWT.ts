import  jwt  from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";
const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET!)
    request.user = decoded
  } catch (error) {
    return reply.status(401).send({ message: 'Token inválido' })
  }
}