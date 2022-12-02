const PWAEventsAPI = require('../../../backend/mysql');
const procedure = require('../../../backend/procedures');

export default async function handler(req, res) {
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

