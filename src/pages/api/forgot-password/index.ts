// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import nc from 'next-connect';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import prisma from '@/lib/prisma';

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  try {
    console.log(`forgot-password`);
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    await schema.validateAsync(req.body);
    const { email } = req.body;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));
    const token = jwt.sign(
      {
        userId: user.id,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: `15m`,
      },
    );

    await prisma.forgotToken.create({
      data: {
        token,
        userId: user.id,
      },
    });

    const msg = {
      to: email,
      from: `smcodes000@gmail.com`,
      subject: `Redefinição de senha`,
      html: `<div style="width: 650px;margin: auto;background-color: #e1e1e6">
        <div style="background-color: #191622;border-top-left-radius: 20px;border-top-right-radius: 20px;padding: 15px;">
          <h1 style="font-size: 2.2rem;padding: 10px 0;margin: 0;text-align: center; color: #e1e1e6">Redefina sua senha</h1>
        </div>
        <div style="padding: 15px 20px">
          <h2 style="font-size: 2rem;padding: 5px 0;margin: 0;">Olá, ${user.name}!</h2>
          <p style="font-size: 16px;">
            Recebemos um pedido para alteração de senha em sua conta, caso queira redifinir sua senha clique no link abaixo, caso não foi o usuário que efetuou o pedido de alteração, por favor ignore esse e-mail.</p>
          <a style="font-size: 16px;text-align: center;" href="${process.env.DOMAIN_URL}/forgot-password/confirm?token=${token}">${process.env.DOMAIN_URL}/forgot-password/confirm?token=${token}</a>
        </div>
      </div>`,
    };

    await sgMail.send(msg);

    return res.status(201).end();
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default handler;
