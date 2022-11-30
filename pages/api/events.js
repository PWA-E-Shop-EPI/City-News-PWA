
const PWAEventsAPI = require('../../backend/mysql');
const procedure = require('../../backend/procedures');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const events = await PWAEventsAPI.request('SELECT * FROM events ORDER BY date DESC')
        procedure.send(req, res, events);
    } else if (req.method === 'POST') {
        const { user, type, title, desc, lat, lng, expires } = req.body;
        if (user !== undefined && type !== undefined && title !== undefined && desc !== undefined && lat !== undefined && lng !== undefined && expires !== undefined) {
            await PWAEventsAPI.request('INSERT INTO `events`(`user`, `type`, `title`, `description`, `lat`, `lng`, `expires`) VALUES (? ,?, ?, ?, ?, ?, ?)', [user, type, title, desc, lat, lng, expires])
            return procedure.send(req, res, 'event-added');
        } else {
            console.log(user, type, title, desc, lat, lng, expires)
            return res.status(400).json({ msg: 'eventId is required' })
        }
    } else {
        return res.status(405).json({ msg: 'Method not allowed' })
    }
}

