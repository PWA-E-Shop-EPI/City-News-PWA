// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import internal from 'stream';
const API = require('../../tools/mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const packageJson = require('../../../package.json');

type UserInformations = {
  id: number;
  login: string;
  email: string;
  accountType: string;
};



const getOneUser = async (req: NextApiRequest, res: NextApiResponse, user: UserInformations) => {
  if (req.method === 'GET') {
    res.status(200).json({ code: 200, response: user })
  } else {
    res.status(502).json({ code: 502, error: 'invalid-method' })
  }
}

function containsRequiredKeys(keys: string[], mustBeIn: string[]) {
  for (let i = 0; i < mustBeIn.length; i++) {
    if (!keys.includes((mustBeIn[i])))
      return false;
  }
  return true;
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const authHeader = req.headers.authorization;
    const bearer = 'Bearer ';

    if (!authHeader || !authHeader.startsWith(bearer)) {
      res.status(401).json({ code: 401, error: 'access-denied' })
      return;
    }
    const token = authHeader.replace(bearer, '');
    const secretKey = process.env.TOKEN_KEY || '';
    const decoded = jwt.verify(token, secretKey);
    if (!containsRequiredKeys(Object.keys(decoded), ['id', 'login', 'version'])) {
      res.status(401).json({ code: 401, error: 'invalid-header' })
      return;
    }
    if (decoded.version !== packageJson.version) {
      res.status(401).json({ code: 401, error: 'mismatch-api-version' })
      return;
    }
    let user;
    if (req.query?.id && (req.query.id === 'me' || decoded.login.toLowerCase() === req.query?.id?.toLowerCase())) {
      user = await API.request('SELECT id, login, email, accountType FROM users WHERE id = ? LIMIT 1', [decoded.id])
    } else {
      const account = await API.request('SELECT accountType FROM users WHERE id = ? LIMIT 1', [decoded.id])
      if (!account) {
        res.status(401).json({ code: 401, error: 'authentication-failed-1' })
        return;
      }
      if (account.accountType === 'ADMIN') {
        user = await API.request('SELECT id, login, email, accountType FROM users WHERE login = ? LIMIT 1', [req.query?.id])
      } else {
        res.status(404).json({ code: 404, error: 'account-not-found' })
        return;
      }
    }
    if (!user) {
      res.status(404).json({ code: 404, error: 'account-not-found' })
      return;
    }
    await getOneUser(req, res, user);
  } catch (e: any) {
    res.status(401).json({ code: 401, error: e.message.replace(' ', '-').toLowerCase() })
  }
}

export default handler

