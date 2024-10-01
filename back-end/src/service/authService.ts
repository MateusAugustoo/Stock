import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { JwtPayload, SignOptions, sign } from 'jsonwebtoken';
import { prisma } from '../prisma';

export async function registerUser(name: string, email: string, password: string): Promise<{ status: number, message: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        return { status: 201, message: 'Usuário registrado com sucesso!' };
    } catch (error) {
        return { status: 400, message: 'Erro ao registrar o usuário!' };
    }
}

export async function loginUser(
    email: string,
    password: string,
    jwtSign: (payload: JwtPayload, options?: SignOptions) => string
): Promise<{ status: number, token?: string, message?: string }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return { status: 400, message: 'Usuário não encontrado' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { status: 400, message: 'Senha incorreta' };
    }

    const token = jwtSign({ userId: user.id }, { expiresIn: '1h' });
    return { status: 200, token, message: 'Login bem-sucedido' };
}