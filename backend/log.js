function getTime() {
    let n = new Date();
    let date = ("0" + (n.getDate())).slice(-2) + "/" + ("0" + (n.getMonth() + 1)).slice(-2) + "/" + ("0" + (n.getFullYear())).slice(-2)
    let time = ("0" + (n.getHours() + 1)).slice(-2) + ":" + ("0" + (n.getMinutes() + 1)).slice(-2) + ":" + ("0" + (n.getSeconds())).slice(-2)
    return `${date} ${time}`
}

function log(msg, method) {
    if (method)
        console.log(`[${getTime()}] ${method} ${msg}`.trim());
    else
        console.log(`[${getTime()}] ${msg}`.trim());
}

function logError(msg, method) {
    if (method)
        console.log(`[${getTime()}] ${method} error :  ${msg}`.trim());
    else
        console.log(`[${getTime()}] error : ${msg}`.trim());
}

module.exports.log = log;
module.exports.logError = logError;