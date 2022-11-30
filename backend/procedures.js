/* eslint-disable no-param-reassign */
const log = require('./log');
require('dotenv').config();

async function send(req, res, data, code = 200, type = 'json') {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (code >= 200 && code < 300) {
    if (req.method === 'POST') { code = 201; }
    if (process.env.NODE_ENV === 'development') {
      log.log(`API (${ip}${req?.user ? (` - ${req.user.login}`) : ''}) send : ${req.originalUrl} : ${JSON.stringify(data)}`, req.method);
    } else {
      log.log(`API (${ip}${req?.user ? (` - ${req.user.login}`) : ''}) send : ${req.originalUrl}`, req.method);
    }
    if (type === 'file') {
      res.download(data);
    } else {

      res.status(code).json({ code, response: data });
    }
  } else {
    log.logError(`API (${ip}${req?.user ? (` - ${req.user.login}`) : ''}) ${req.originalUrl} : ${JSON.stringify(data)}`, req.method);
    res.status(code).json({ code, error: data });
  }
}

module.exports.send = send;
