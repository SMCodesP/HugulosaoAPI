import { NextApiRequest, NextApiResponse } from 'next';

import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import prisma from '@/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error(`Usuário não encontrado ou senha inválida.`);

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid)
      throw new Error(`Usuário não encontrado ou senha inválida.`);

    delete (user as any).password;

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };

    const jwtToken = jwt.sign(payload, String(process.env.JWT_SECRET), {
      expiresIn: `7d`,
    });

    return res.json({
      access_token: jwtToken,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export default handler;
