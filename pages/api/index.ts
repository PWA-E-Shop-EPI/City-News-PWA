// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

const hello = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ code: 200, name: 'hello-world' })
  } else {
    res.status(502).json({ code: 502, error: 'invalid-method' })
  }
}

export default hello
