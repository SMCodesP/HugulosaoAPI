import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (_req, res) => {
  try {
    const products = await prisma.category.findMany();

    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: (error as any).message,
    });
  }
});

export default handler;
