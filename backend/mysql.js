const dayjs = require('dayjs');

const mysql = require('serverless-mysql')({
    config: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
})

function parseResults(results) {
    if (results?.length === 0) { return results; }

    let response = [];
    for (let i = 0; i < results.length; i++) {
        let item = results[i];
        item.expires = dayjs(dayjs(item.date).format('YYYY-MM-DD')).add(item.expires, 'days').diff(dayjs(), 'days')
        response.push(item)
    }

    return response;
}

// Main handler function
async function request(req, params = []) {
    // Run your query
    let results = await mysql.query(req, params)
    results = parseResults(results)
    // Run clean up function
    await mysql.end()

    // Return the results
    if (results?.length === 1 && req.includes('LIMIT 1')) return results[0];
    if (results?.length === 0) return null;
    return results
}


module.exports = { request }