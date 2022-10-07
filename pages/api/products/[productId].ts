// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
const API = require('../../tools/mysql');
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { productId } = req.query;
    if (req.method === 'GET') {
        let product = await (await axios.get('https://fakestoreapi.com/products/' + productId)).data;
        if (product === '') {
            product = await API.request("SELECT * FROM products WHERE id = ? LIMIT 1", [productId]);
            if (product === undefined) {
                res.status(404).json({ code: 404, error: 'product-not-found' })
                return;
            }
            product = {
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: {
                    rate: product.rate,
                    count: product.count,
                }
            }
        }
        res.status(200).json({ code: 200, response: product })
    } else {
        res.status(502).json({ code: 502, error: 'invalid-method' })
    }
}

export default handler
