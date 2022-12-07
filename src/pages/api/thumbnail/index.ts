import type { NextApiRequest, NextApiResponse } from 'next';

import nc from 'next-connect';
import isAuth from '@/middlewares/isAuth';
import { TApiRequestAuth } from '@/@types/TApiRequestAuth';
import formidable, { Fields, File, Files } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

interface TThumbnailApiRequest extends TApiRequestAuth {
  fields: Fields;
  files: Files;
}

cloudinary.config({
  cloud_name: `animetempest`,
  api_key: `467232963254753`,
  api_secret: `Og-d3WqBKneJFemMfQl4OEtj6CQ`,
});

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(isAuth)
  .use(async (req: TThumbnailApiRequest, _, next: any) => {
    const form = formidable();

    form.parse(req, async (_err, fields, files) => {
      req.fields = fields;
      req.files = files;
      next();
    });
  })
  .post<TThumbnailApiRequest, NextApiResponse>(async (req, res) => {
    try {
      const {
        thumbnail,
      }: {
        thumbnail: File;
      } = req.files as any;

      const uploadThumbnail = await cloudinary.uploader.upload(
        thumbnail.filepath,
        {
          folder: `hugulosao`,
        },
      );

      return res.status(200).json(uploadThumbnail);
    } catch (error) {
      return res.status(400).json({
        message: (error as any).message,
      });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
