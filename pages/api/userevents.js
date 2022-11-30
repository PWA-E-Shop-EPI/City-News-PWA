
const PWAEventsAPI = require('../../backend/mysql');
const procedure = require('../../backend/procedures');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { user } = req.query;
        if (user !== undefined) {
            const events = await PWAEventsAPI.request('SELECT * FROM events WHERE user = ? ORDER BY date DESC', [user])
            procedure.send(req, res, events);
        } else {
            return procedure.send(req, res, 'invalid-user');
        }
    } else if (req.method === 'DELETE') {
        const { user } = req.query;
        const { id } = req.body;
        if (user !== undefined) {
            if (id === undefined) {
                return procedure.send(req, res, 'missing-id');
            }
            const events = await PWAEventsAPI.request('DELETE FROM events WHERE user = ? AND id = ? ORDER BY date DESC', [user, id])
            procedure.send(req, res, events);
        } else {
            return procedure.send(req, res, 'invalid-user');
        }
    } else {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
}

