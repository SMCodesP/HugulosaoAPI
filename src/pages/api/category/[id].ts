import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import nc from 'next-connect';
import { TApiRequestAuth } from '@/@types/TApiRequestAuth';

const handler = nc<NextApiRequest, NextApiResponse>().get<
  TApiRequestAuth,
  NextApiResponse
>(async (req, res) => {
  try {
    const { id } = req.query;

    const category = await prisma.product.findMany({
      where: {
        categoryId: String(id),
      },
    });

    return res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: (error as any).message,
    });
  }
});

export default handler;
