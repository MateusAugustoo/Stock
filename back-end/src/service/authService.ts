import { prisma } from "../prisma";
import { checkPassword, hasPassword } from "../utils/bcrypt/bcryptPassword";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { generateJWT } from "../utils/jwt/generatorJWT";

export async function registerUser(data: TUser) {
  const userByUsername = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (userByUsername)
    return {
      status: 400,
      message: {
        label: "username",
        message: "username ja existe",
      },
    };

  const userByEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (userByEmail)
    return {
      label: "email",
      status: 400,
      message: {
        label: "email",
        message: "email ja existe",
      },
    };

  const hashedPassword = await hasPassword(data.password);

  try {
    return await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
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
      if (e.code) {
      }
    }
  }
}

export async function loginUser(emailOrUsername: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: emailOrUsername }, { email: emailOrUsername }],
    },
  });

  if (!user)
    return {
      status: 400,
      message: {
        label: "property",
        message: "email ou username inválido",
      },
    };

  const isMatch = await checkPassword(password, user.password);

  if (!isMatch)
    return {
      status: 400,
      message: {
        label: "password",
        message: "password inválido",
      },
    };

  const payload = {
    userId: user.id,
    email: user.email,
  };

  const token = await generateJWT(payload);
  return {
    status: 200,
    data: {
      token,
      message: "Login realizado com sucesso",
    },
  };
}
