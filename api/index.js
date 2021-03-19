const express = require("express");
const path = require("path");
const Database = require("./database/Database");
const routes = require('./routes');
const RateLimit = require('express-rate-limit');
const config = require('./../config/config.json');
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

Database.connect();

app.use(express.static(path.join(__dirname, '../webapp/dist')));
app.use(limiter);

// Bind all api routes to the endpoint
app.use('/api', routes);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../webapp/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});