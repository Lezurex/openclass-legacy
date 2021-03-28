/*
 * Copyright (c) 2021 Lenny Angst. All rights reserved.
 * For more information about the license read the LICENSE file at the root of this repo.
 * Written for Project: openclass
 * Last modified: 28.03.21, 21:09
 */

/**
 * Main express router for the API endpoint.
 * Distributes requests to its respective sub-router.
 * Keeps track of a user's session and checks login state for restricted resources.
 * @type {Router}
 */

let ignoreMe;

const routes = require('express').Router();
const auth = require("./auth");
const session = require('express-session');
const user = require("./user");
const express = require("express");
const config = require('./../../config/config.json');
const classRouter = require('./class');
const tasks = require('./tasks');

// Middleware for session with secret configured in the config.
routes.use(session({secret: config.session.secret, resave: false, saveUninitialized: false}));
// Parses the req.body data to json data.
routes.use(express.json());

routes.use(((req, res, next) => {
    let path = req.baseUrl + req.path;
    // Permit access to authentication related endpoints.
    if (path.startsWith("/api/auth/") || path.startsWith("/api/auth")) {
        next();
    } else {
        if (req.session.user) {
            next();
        } else {
            res.status(401).json({
                error: "You need to be logged in to access this resource!",
                code: 401
            });
        }
    }
}));

routes.use('/auth', auth);
routes.use("/user", user);
routes.use("/class", classRouter);

routes.get("/", (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

routes.get('/tasks', tasks);

module.exports = routes;