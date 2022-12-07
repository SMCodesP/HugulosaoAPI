import { NextApiRequest, NextApiResponse } from 'next';

import nc from 'next-connect';
import Joi from 'joi';
import argon2 from 'argon2';

import prisma from '@/lib/prisma';

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(64).required(),
      name: Joi.string().required(),
    });

    await schema.validateAsync(req.body);

    const { email, name, password } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await argon2.hash(password),
        levelAccess: 1,
      },
    });

    delete (user as any).password;

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default handler;
