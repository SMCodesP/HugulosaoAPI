import { NextApiResponse } from 'next';

import { Middleware } from 'next-connect';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';
import { TApiRequestAuth } from '@/@types/TApiRequestAuth';

const isAuth: Middleware<TApiRequestAuth, NextApiResponse> = async (
  req,
  res,
  next,
) => {
  try {
    const token = req.headers[`authorization`]
      ? req.headers[`authorization`].split(` `)[1] ||
        getCookie(`access_token`, { req, res })
      : getCookie(`access_token`, { req, res });

    if (!token) throw new Error(`Nenhum token de autenticação foi informado.`);

    const jwtDecoded = jwt.verify(
      String(token),
      String(process.env.JWT_SECRET),
    );

    req.user = jwtDecoded as any;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: (error as any).message,
    });
  }
};

export default isAuth;
