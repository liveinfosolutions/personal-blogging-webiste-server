//------------------------------------------IMPORTS-------------------------------
const { CONFIG } = require('../config/config');
const { REPLACE_BY_TEXT } = require('../shared/shared.message');
const debug = require('debug')('node-angular');
//--------------------------------------------------------------------------------

const normalizedPort = normalizePort(CONFIG.PORT);
const bind = typeof normalizedPort === 'string' ? 'pipe ' + normalizedPort : 'port ' + normalizedPort;


function normalizePort(val) {
    const port = parseInt(val, 10); // remove values after decimal.
    if (isNaN(port)) return val; // val : String
    if (port >= 0) return port; // val : number
    return false;
}

function onListening() { debug('Listening on ' + bind); }

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCESS': // If Access is denied
            console.error('bind' + ' requires elevated privilages');
            process.exit(1);
            break;
        case 'EADDRINUSE': // If Address is already in use
            console.error('bind' + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

function replaceByLabel(message, labelName) {
    return message.replaceAll(REPLACE_BY_TEXT, labelName)
}

module.exports = {
    normalizedPort,
    onListening,
    onError,
    replaceByLabel
};