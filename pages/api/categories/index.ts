// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
const API = require('../../tools/mysql');
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const categories = await (await axios.get('https://fakestoreapi.com/products/categories')).data;
        const customCategories = await API.request("SELECT name FROM category WHERE 1");
        for (let i = 0; i < customCategories.length; i++) {
            categories.push(customCategories[i].name);
        }
        res.status(200).json({ code: 200, response: categories })
    } else {
        res.status(502).json({ code: 502, error: 'invalid-method' })
    }
}

export default handler
