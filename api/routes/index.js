const routes = require('express').Router();
const auth = require("./auth");
const session = require('express-session');
const user = require("./user");
const express = require("express");
const config = require('./../../config/config.json');
const classRouter = require('./class');

routes.use(session({secret: config.session.secret, resave: false, saveUninitialized: false}));
routes.use(express.json());

routes.use(((req, res, next) => {
    let path = req.baseUrl + req.path;
    if (path.startsWith("/api/auth/") || path.startsWith("/api/auth")) {
        next();
    } else {
        if (req.session.user) {
            next();
        } else {
            // next();
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

module.exports = routes;