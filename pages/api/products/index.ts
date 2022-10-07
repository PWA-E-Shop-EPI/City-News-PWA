// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
const API = require('../../tools/mysql');
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const categories = await (await axios.get('https://fakestoreapi.com/products/')).data;
        const customCategories = await API.request("SELECT * FROM products WHERE 1");
        for (let i = 0; i < customCategories.length; i++) {
            const tmp = {
                id: customCategories[i].id,
                title: customCategories[i].title,
                price: customCategories[i].price,
                description: customCategories[i].description,
                category: customCategories[i].category,
                image: customCategories[i].image,
                rating: {
                    rate: customCategories[i].rate,
                    count: customCategories[i].count,
                }
            }
            categories.push(tmp);
        }
        res.status(200).json({ code: 200, response: categories })
    } else {
        res.status(502).json({ code: 502, error: 'invalid-method' })
    }
}

export default handler
