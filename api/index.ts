/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 8/7/21, 12:59 AM
 */

import {Request, Response} from "express";

import express from "express";
import path from "path";
import fs from 'fs';
import Database from "./database/Database";
import routes from './routes';
import RateLimit from 'express-rate-limit';
import config from './../config/config.json';
import logger from 'morgan';
const app = express(),
    port = 3080;

declare module NodeJS{
    interface Global {
        db: Database
    }
}

// Configures the rate limiter as set in the config
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
// Write an access log to the logs directory
app.use(logger({
    stream: fs.createWriteStream("../logs/access-log-" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "-" + date.getHours() + "-" + date.getMinutes() + ".log", {flags: 'w'})
}))
app.use(limiter);
app.use(express.static(path.join(__dirname, '../webapp/dist')));

// Bind all api routes to the endpoint
app.use('/api', routes);

app.get('/*', (req : Request, res : Response) => {
    res.sendFile(path.join(__dirname, '../webapp/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});