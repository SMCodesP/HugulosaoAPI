// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import nc from 'next-connect';
import isAuth from '@/middlewares/isAuth';
import { TApiRequestAuth } from '@/@types/TApiRequestAuth';

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(isAuth)
  .get<TApiRequestAuth, NextApiResponse>(async (req, res) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: String(req.user.sub),
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          levelAccess: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: (error as any).message,
      });
    }
  });

export default handler;
