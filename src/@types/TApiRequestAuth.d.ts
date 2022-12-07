import type { NextApiRequest } from 'next';

interface TApiRequestAuth extends NextApiRequest {
  user: TUserPayload;
}
