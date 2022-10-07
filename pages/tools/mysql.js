/* eslint-disable no-param-reassign */
const mariadb = require('mysql2/promise');
require('dotenv').config();

const config = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 1
});

async function request(req, params = []) {
    //init
    var data = await config.getConnection()
        .then(conn => {
            const res = conn.execute(req, params);
            conn.release();
            return res;
        }).then(([rows]) => {
            if (req.includes('LIMIT 1'))
                return rows[0];
            return (rows);
        }).catch(err => {
            console.log(err);
        });
    return (data)
}
module.exports = { request };
