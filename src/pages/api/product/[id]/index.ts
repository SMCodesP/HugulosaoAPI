import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import nc from 'next-connect';
import isAuth from '@/middlewares/isAuth';
import { TApiRequestAuth } from '@/@types/TApiRequestAuth';

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(isAuth)
  .delete<TApiRequestAuth, NextApiResponse>(async (req, res) => {
    try {
      const { id } = req.query;

      const product = await prisma.product.delete({
        where: {
          id: String(id),
        },
      });

      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: (error as any).message,
      });
    }
  });

export default handler;
