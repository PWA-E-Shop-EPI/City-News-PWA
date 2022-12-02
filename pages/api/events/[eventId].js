const PWAEventsAPI = require('../../../backend/mysql');
const procedure = require('../../../backend/procedures');
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    if (req.method === 'GET') {
        if (req.query.eventId !== undefined) {
            const event = await PWAEventsAPI.request('SELECT * FROM events WHERE id = ? LIMIT 1', [req.query.eventId])
            procedure.send(req, res, event);
        } else {
            return res.status(400).json({ msg: 'eventId is required' })
        }
    } else if (req.method === 'DELETE') {
        if (req.query.eventId !== undefined) {
            const event = await PWAEventsAPI.request('DELETE FROM events WHERE id = ? LIMIT 1', [req.query.eventId])
            procedure.send(req, res, event);
        } else {
            return res.status(400).json({ msg: 'eventId is required' })
        }
    } {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
}

