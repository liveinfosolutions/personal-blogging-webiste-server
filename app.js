//------------------------------------------IMPORTS-------------------------------
const http = require('http');
const app = require('./src/config/server');
const { normalizedPort, onError, onListening } = require('./src/global/global.methods');
//--------------------------------------------------------------------------------
app.set('port', normalizedPort);
const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);

server.listen(normalizedPort, () => {
    console.log('Server running on -> http://localhost:' + normalizedPort);
});