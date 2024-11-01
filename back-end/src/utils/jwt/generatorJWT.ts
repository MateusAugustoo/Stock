import jwt, { SignOptions } from 'jsonwebtoken'
const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export async function generateJWT(payload: object, signOptions: SignOptions = {}){
  return jwt.sign(payload, JWT_SECRET!, {
    ...signOptions
  })
}