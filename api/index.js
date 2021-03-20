const express = require("express");
const path = require("path");
const fs = require('fs');
const Database = require("./database/Database");
const routes = require('./routes');
const RateLimit = require('express-rate-limit');
const config = require('./../config/config.json');
const logger = require('morgan');
const app = express(),
    port = 3080;

const limiter = new RateLimit({
    windowMs: config.rateLimit.timeWindow * 60 * 1000,
    max: config.rateLimit.maxRequests,
    message: JSON.stringify({
        code: 429,
        error: "You sent too many requests! Limit is set to " + config.rateLimit.maxRequests + " requests in " + config.rateLimit.timeWindow + " minutes."
    })
})

Database.createTables();

const date = new Date();
app.use(logger({
    stream: fs.createWriteStream("../logs/access-log-" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "-" + date.getHours() + "-" + date.getMinutes() + ".log", {flags: 'w'})
}))
app.use(limiter);
app.use(express.static(path.join(__dirname, '../webapp/dist')));

// Bind all api routes to the endpoint
app.use('/api', routes);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../webapp/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});