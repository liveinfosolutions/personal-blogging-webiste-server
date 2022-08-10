//------------------------------------------IMPORTS-------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const useragent = require('express-useragent');
const compress = require('compression');
const { CONFIG } = require('./config');
const routes = require('../routes/index.routes');
//--------------------------------------------------------------------------------

const app = express();

// app.use(compress());

// Secure apps by setting various HTTP headers
// app.use(helmet());

// Express user agent details like : browser, version, os, platform, etc.
app.use(useragent.express());

///////////////////////////////////
// ** Using Mongoose to connect with Mongodb
///////////////////////////////////

mongoose.connect(CONFIG.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully');
});

///////////////////////////////////
/*
body-parser extracts the entire body portion of an 
incoming request stream and expose it on req.body
*/
///////////////////////////////////
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

///////////////////////////////////
// ! Handling CORS Error ( Cross-Origin Resource Sharing )
///////////////////////////////////
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    req.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    req.header('Allow', 'GET,POST, OPTIONS, PUT, DELETE');

    next();
});

app.use(cors());

///////////////////////////////////
// ** Routes
///////////////////////////////////
app.use('/api', routes);

module.exports = app;
