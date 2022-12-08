// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TApiRequestAuth } from '@/@types/TApiRequestAuth';
import isAuth from '@/middlewares/isAuth';
import { stripeClient } from '@/services/stripe';
import type { NextApiResponse } from 'next';

import nc from 'next-connect';

const handler = nc<TApiRequestAuth, NextApiResponse>()
  .use(isAuth)
  .post(async (req, res) => {
    try {
      const { cart } = req.body;

      const paymentLink = await stripeClient.checkout.sessions.create({
        line_items: cart,
        metadata: {
          user_id: req.user.sub,
        },
        cancel_url: `https://lestore-back.vercel.app/error`,
        success_url: `https://lestore-back.vercel.app/success`,
        shipping_address_collection: {
          allowed_countries: [`BR`],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: `fixed_amount`,
              fixed_amount: {
                amount: 15,
                currency: `brl`,
              },
              display_name: `Entrega motoboy`,
              delivery_estimate: {
                minimum: {
                  unit: `hour`,
                  value: 1,
                },
                maximum: {
                  unit: `hour`,
                  value: 1,
                },
              },
            },
          },
        ],
        payment_method_types: [`card`],
        mode: `payment`,
      });

      console.log(paymentLink);

      return res.status(200).json(paymentLink);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: (error as any).message,
      });
    }
  });

export default handler;
