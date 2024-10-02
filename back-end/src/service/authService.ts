import { prisma } from "../prisma";
import { checkPassword, hasPassword } from "./bcrypt/bcryptPassword";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { generateJWT } from "./jwt/generatorJWT";

export async function registerUser(data: TUser) {
  const hashedPassword = await hasPassword(data.password);

  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        nameEnterprise: data.nameEnterprise,
        password: hashedPassword,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { status: 400, message: "Email ja existe" };
      }
    }
  }
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return { status: 400, message: "Usuário não encontrado" };

  const isMatch = await checkPassword(password, user.password);

  if (!isMatch) return { status: 400, message: "Senha inválida" };

  const payload = {
    userId: user.id,
    email: user.email
  }

  const token = await generateJWT(payload)
  return { status: 200, token, message: 'Login realizado com sucesso' }
}
