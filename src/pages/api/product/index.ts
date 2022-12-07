import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import nc from 'next-connect';
import isAuth from '@/middlewares/isAuth';
import { TApiRequestAuth } from '@/@types/TApiRequestAuth';
import Joi from 'joi';
import { stripeClient } from '@/services/stripe';

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (_req, res) => {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
          ingredients: true,
        },
      });

      return res.json(products);
    } catch (error) {
      return res.status(400).json({
        message: (error as any).message,
      });
    }
  })
  .use(isAuth)
  .post<TApiRequestAuth, NextApiResponse>(async (req, res) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        ingredients: Joi.array().items({
          name: Joi.string(),
          isLocked: Joi.boolean(),
        }),
        thumbnail: Joi.string().required(),
        category: Joi.string().required(),
      });

      await schema.validateAsync(req.body);

      const { name, thumbnail, description, price, ingredients, category } =
        req.body;

      const product = await prisma.product.create({
        data: {
          name,
          thumbnail,
          description,
          price,
          ingredients: {
            createMany: {
              data: ingredients,
            },
          },
          category: {
            connectOrCreate: {
              create: {
                name: category,
              },
              where: {
                name: category,
              },
            },
          },
        },
      });

      const stripeProduct = await stripeClient.products.create({
        name,
        description,
        metadata: {
          product_id: product.id,
        },
        images: [thumbnail],
      });

      const stripePrice = await stripeClient.prices.create({
        unit_amount: price * 100,
        currency: `BRL`,
        product: stripeProduct.id,
        metadata: {
          product_id: product.id,
        },
      });

      const productRelated = await prisma.product.update({
        data: {
          stripe_price_id: stripePrice.id,
          stripe_prod_id: stripeProduct.id,
        },
        where: {
          id: product.id,
        },
      });

      return res.json(productRelated);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: (error as any).message,
      });
    }
  });

export default handler;
