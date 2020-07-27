import { NowRequest, NowResponse } from '@vercel/node';
import { getContent, setContent } from '../../src/database';

async function getRequest(_req: NowRequest, res: NowResponse) {
  res.setHeader('content-type', 'text/plain');
  res.send(await getContent());
}

async function postRequest(req: NowRequest, res: NowResponse) {
  const { update } = req.body;
  await setContent(update);
  res.status(200).end();
}

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const { method } = req;
  switch (method) {
    case 'GET':
      return getRequest(req, res);
    case 'POST':
      return postRequest(req, res);
    default:
      res.status(400).end();
      return null;
  }
};
